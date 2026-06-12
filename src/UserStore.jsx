import {atom, useAtom} from 'jotai';

const jwtAtom = atom(null);

export function useJwt() {
    const [jwt, setJwtAtom] = useAtom(jwtAtom);

    const setJwt = (newJwt) => {
        localStorage.setItem('jwt', newJwt);
        setJwtAtom(newJwt);
    }

    const getJwt = () => {
        // read the stored JWT from the localstorage
        const storedJwt = localStorage.getItem("jwt");

        // if the jotai atom does not have the token, we save it to the atom
        if (storedJwt && !jwt) {
            setJwtAtom(jwt);
        }

        return jwt || storedJwt;
    }

    const clearJwt = () => {
        localStorage.removeItem('jwt');
        setJwtAtom(null);
    }

   
    return { jwt, setJwt, getJwt, clearJwt};
}