import React from 'react';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const LoginForm = ({ login }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues : {
      username : '',
      password : ''
    },
    validate,
    onSubmit      : async (values) => {
      try {
        await login(values);
        history.push('/');
      } catch (err) {
        formik.errors.password = err;
      }
    }
  });

  return (
    <div className="LoginForm">
      <Card className="LoginForm-card">
        <Card.Body>
          <Card.Title>Log In</Card.Title>
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

            <Button type="submit">Log In</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForm;
