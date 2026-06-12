import { Formik, Form, Field, ErrorMessage, yupToFormErrors, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { useJwt } from './UserStore';

import { useLocation } from 'wouter';
import { useFlashMessage } from "./FlashMessageStore";


export default function UserLogin() {

    const { setJwt} = useJwt();

    const [, setLocation] = useLocation();
    const {showMessage} = useFlashMessage();

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required('required'),
        password: Yup.string().required()
    })

    const handleSubmit = async (values, formikHelper) => {

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", values);
            formikHelper.setSubmitting(false); 

            // store the JWT in the store
            setJwt(response.data.token);
            showMessage("Login successful", "success");
            setLocation("/");

        } catch (e) {
            console.error("Login error:", e);
            formikHelper.seterrors({
                "submit": error.response.data.message
            });
            formikHelper.setSubmitting(false); // re-enable the submit button
        }
    }

    return <div className="container mt-5">
        <h2>Login</h2>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {function (formik) {
                return (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field type="email" id="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field type="password" id="password" name="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>

                        {formik.errors.submit && <div className="alert alert-danger">{formik.errors.submit}</div>}

                        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </Form>
                );
            }}
        </Formik>
    </div>
}