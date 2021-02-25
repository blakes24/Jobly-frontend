import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be at least 8 characters';
  }

  return errors;
};

const SignupForm = ({ register }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues : {
      username  : '',
      firstName : '',
      lastName  : '',
      email     : '',
      password  : ''
    },
    validate,
    onSubmit      : async (values) => {
      await register(values);
      history.push('/');
    }
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <Form.Text className="text-danger">{formik.errors.username}</Form.Text>
      ) : null}

      <Form.Label htmlFor="firstName">First Name</Form.Label>
      <Form.Control
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <Form.Text className="text-danger">{formik.errors.firstName}</Form.Text>
      ) : null}

      <Form.Label htmlFor="lastName">Last Name</Form.Label>
      <Form.Control
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <Form.Text className="text-danger">{formik.errors.lastName}</Form.Text>
      ) : null}

      <Form.Label htmlFor="email">Email Address</Form.Label>
      <Form.Control
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
      ) : null}

      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <Form.Text className="text-danger">{formik.errors.password}</Form.Text>
      ) : null}

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default SignupForm;
