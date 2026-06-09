import { atom, useAtom } from 'jotai'
export const flashMessageAtom = atom({
    'message': '',
    'type': 'info'
});

// create a hook
// a hook is to share variables and functions across components
export const useFlashMessage = () => {

    const [flashMessage, setFlashMessage] = useAtom(flashMessageAtom)

    // allow other components to set the flash message content
    // and its type
    const showMessage = (message, type="info") => {
        setFlashMessage({
            "message": message,
            "type": type
        })

        setTimeout(()=>{
            clearMessage()
        }, 5000);

    }

    // clear the current flash message
    const clearMessage = () => {
        setFlashMessage({
            "message": "",
            "type":"info"
        })
    }

    // share flashMessage, showMessage and clearMessage
    // with other components
    return {
        flashMessage, showMessage, clearMessage
    }

}