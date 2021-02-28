import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import UserContext from '../helpers/UserContext';
import './Profile.css';

const validate = (values) => {
  const errors = {};

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
  }

  return errors;
};

const Profile = ({ update }) => {
  const { user } = useContext(UserContext);

  const formik = useFormik({
    initialValues : {
      username  : user.username,
      firstName : user.firstName,
      lastName  : user.lastName,
      email     : user.email,
      password  : ''
    },
    validate,
    onSubmit      : async (values, actions) => {
      try {
        await update(values);
        actions.setStatus({ message: 'Profile Updated' });
      } catch (err) {
        formik.errors.password = err;
      }
    }
  });
  return (
    <div className="Profile">
      <Card>
        <Card.Body>
          <Card.Title>Update Profile</Card.Title>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              plaintext
              readOnly
              className="text-secondary"
              id="username"
              name="username"
              type="text"
              defaultValue={formik.values.username}
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

            <Form.Label htmlFor="password">Confirm password to make changes</Form.Label>
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

            <div className="Profile-message">
              {formik.status && formik.status.message ? formik.status.message : ' '}
            </div>

            <Button type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
