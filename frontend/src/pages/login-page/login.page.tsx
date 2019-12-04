import React from 'react';
import {Row, Col, Icon} from 'antd';
import {Formik} from 'formik';
import {Form, Input, SubmitButton, FormItem} from 'formik-antd';
import {Link} from 'react-router-dom';

import './login.css';
import {schemas} from '../../utils';

interface FormValues {
  email: string;
  password: string;
}

function handleSubmit(values: FormValues) {
  console.log(values);
}

const Login: React.FC = props => {
  return (
    <Row align="middle" justify="space-around" type="flex">
      <Col span={16}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={schemas.LoginSchema}
          render={() => (
            <Form className="login-form">
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
              <FormItem name="buttons">
                <Link to="/forgot" className="login-form-forgot">
                  Forgot Password
                </Link>
                <SubmitButton type="primary" className="login-form-button">
                  Login
                </SubmitButton>
                {'Or '}
                <Link to="/register">register now</Link>
              </FormItem>
            </Form>
          )}
          onSubmit={handleSubmit}
        />
      </Col>
    </Row>
  );
};

export default Login;
