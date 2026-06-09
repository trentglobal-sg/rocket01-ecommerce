import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useLocation } from 'wouter'
import { useFlashMessage } from "./FlashMessageStore";

// import everything from yup
import * as Yup from "yup";

// create a validation schema
const validationSchema = Yup.object({
    "name": Yup.string().required("Name is required"),
    "email": Yup.string().email().required(),
    "password": Yup.string().min(8).required(),
    "confirmPassword": Yup.string().oneOf([Yup.ref("password"), null]).required("Please re-enter your password again"),
    "salutation": Yup.string().required(),
    "country": Yup.string().required()

})

export default function RegisterPage() {

    const [, setLocation] = useLocation();

    // import the functions from flashMessageStore
    const { showMessage } = useFlashMessage();

    // handles the form submission
    // have to specify it as the submission handler Formik
    // the second argument of handleSubmit is a formikHelper
    const handleSubmit = (values, formikHelper) => {
        console.log(values);
        // todo: axios call to register the user
        setTimeout(() => {
            // after 3 seconds, set the form as finished submitting
            // to simulate as if we had finished processing the form
            formikHelper.setSubmitting(false);
            showMessage("Your account has been created successful", "success");
            setLocation("/");
        }, 3000)
    }

    const initialValues = {
        "name": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
        "salutation": "",
        "marketingPreferences": [],
        "country": ""
    }

    return <>
        <div className="container mt-5">

            <h1>Register</h1>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
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
                                <label>Password:</label>
                                <Field
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Confirm Password:</label>
                                <Field
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
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


                            <button type="submit" disabled={formik.isSubmitting}>
                                Register
                            </button>
                        </Form>
                    )
                }
            </Formik>

        </div>
    </>
}