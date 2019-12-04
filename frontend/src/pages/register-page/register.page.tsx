import React from 'react';
import {Row, Col, Icon} from 'antd';
import {Formik} from 'formik';
import {Form, Input, SubmitButton, FormItem} from 'formik-antd';
import {Link} from 'react-router-dom';

import './register.css';
import {schemas} from '../../utils';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function handleSubmit(values: FormValues) {
  console.log(values);
}

const Register: React.FC = props => {
  return (
    <Row align="middle" justify="space-around" type="flex">
      <Col span={16}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={schemas.RegisterSchema}
          render={() => (
            <Form className="register-form">
              <FormItem name="firstName">
                <Input
                  name="firstName"
                  prefix={
                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="first name"
                />
              </FormItem>

              <FormItem name="lastName">
                <Input
                  name="lastName"
                  prefix={
                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="last name"
                />
              </FormItem>

              <FormItem name="email">
                <Input
                  name="email"
                  prefix={
                    <Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="email"
                />
              </FormItem>
              <FormItem name="password">
                <Input.Password
                  name="password"
                  prefix={
                    <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="password"
                />
              </FormItem>
              <FormItem name="confirmPassword">
                <Input.Password
                  name="confirmPassword"
                  prefix={
                    <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="confirm password"
                />
              </FormItem>
              <FormItem name="buttons">
                <SubmitButton type="primary" className="register-form-button">
                  Register
                </SubmitButton>
                {'Or '}
                <Link to="/login">login now</Link>
              </FormItem>
            </Form>
          )}
          onSubmit={handleSubmit}
        />
      </Col>
    </Row>
  );
};

export default Register;
