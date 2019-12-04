import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is required'),
  password: Yup.string()
    .min(6)
    .required('Password is required'),
});

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is required'),
  password: Yup.string()
    .min(6)
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Confirm Password is required'),
});

const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is required'),
});

export {LoginSchema, RegisterSchema, ForgotSchema};
