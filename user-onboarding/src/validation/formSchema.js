import * as yup from "yup";

const formSchema = yup.object().shape({
    userName: yup.string()
        .trim()
        .min(4, "The username must be at least four characters long.")
        .required("The username is a required field."),
    userPassword: yup.string()
        .trim()
        .min(6, "Your password must be at least 6 characers long.")
        .required("The password is a required field."),
    userEmail: yup.string()
        .trim()
        .email("The email must be a valid email.")
        .required("The email is a required field."),
    tos: yup.string()
        .required("You must agree to the Terms of Service."),
})

export default formSchema