import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useJwt } from './UserStore';
import { useFlashMessage } from './FlashMessageStore';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

// create a validation schema
const validationSchema = Yup.object({
    "name": Yup.string().required("Name is required"),
    "email": Yup.string().email().required(),
    "salutation": Yup.string().required(),
    "country": Yup.string().required()

})

export default function Profile() {

    const { getJwt } = useJwt();
    const [initialValues, setInitialValues] = useState({});
    const { showMessage } = useFlashMessage();
    const [, setLocation] = useLocation();

    useEffect(() => {

        // 1. get the JWT
        const token = getJwt();

        if (token) {
            // 2. get the user's profile 
            const fetchUser = async () => {
                const response = await axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                setInitialValues(response.data.user);
            }
            fetchUser();

        } else {
            showMessage("You need to log in", "danger");
            setLocation("/login");
        }

    }, [])

    const handleSubmit = async (values, formikHelper) => {
        console.log(values);
        try {
            const token = getJwt();
            if (!token) {
                showMessage("You must be logged in to update your profile", "danger");
                formikHelper.setSubmitting(false);
                return;
            }

            await axios.put(import.meta.env.VITE_API_URL+"/api/users/me", values, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            showMessage("Profile updated successfully", "success");

        } catch (e) {
            console.error(e);
            showMessage("Error: " + e.message, "danger");
        }
    }

    return <>
        <div className="container mt-5">

            <h1>Update Profile</h1>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {
                    (formik) => (
                        <Form>
                            <div className="mb-3">
                                <label>Name</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Email:</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                          

                            <div className="mb-3">
                                <label className="form-label">Salutation</label>

                                <div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            className="form-check-input"
                                            type="radio"
                                            name="salutation"
                                            id="mr"
                                            value="Mr"
                                        />
                                        <label className="form-check-label">Mr.</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            className="form-check-input"
                                            type="radio"
                                            name="salutation"
                                            id="mrs"
                                            value="Mrs"
                                        />
                                        <label className="form-check-label">Mrs.</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            className="form-check-input"
                                            type="radio"
                                            name="salutation"
                                            id="ms"
                                            value="Ms"
                                        />
                                        <label className="form-check-label">Ms.</label>
                                    </div>
                                    <ErrorMessage
                                        name="salutation"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Marketing Preferences</label>

                                <div className="form-check">
                                    <Field
                                        type="checkbox"
                                        name="marketingPreferences"
                                        value="1"
                                        className="form-check-input"
                                        id="marketing-1"
                                    />
                                    <label className="form-check-label">Email Marketing</label>
                                </div>
                                <div className="form-check">
                                    <Field
                                        type="checkbox"
                                        name="marketingPreferences"
                                        value="2"
                                        className="form-check-input"
                                        id="marketing-2"
                                    />
                                    <label className="form-check-label">SMS Marketing</label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Country</label>
                                <Field
                                    as="select"
                                    className="form-select"
                                    id="country"
                                    name="country"
                                >
                                    <option value="">Select Country</option>
                                    <option value="sg">Singapore</option>
                                    <option value="my">Malaysia</option>
                                    <option value="id">Indonesia</option>
                                    <option value="th">Thailand</option>


                                </Field>
                                <ErrorMessage
                                    name="country"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <button type="submit">
                                Update
                            </button>
                        </Form>
                    )
                }
            </Formik>

        </div>
    </>
}