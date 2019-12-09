import React from 'react';
import {Row, Col, Icon} from 'antd';
import {Formik, FormikHelpers} from 'formik';
import {Form, Input, SubmitButton, FormItem} from 'formik-antd';
import {Link} from 'react-router-dom';

import './login.css';
import {schemas, constants} from '../../utils';
import {authenticationServices} from '../../services';
import {PopupModal} from '../../components';

interface FormValues {
  email: string;
  password: string;
}

async function handleSubmit(
  {email, password}: FormValues,
  {setStatus}: FormikHelpers<FormValues>,
) {
  setStatus(null);
  try {
    await authenticationServices.login(email, password);
    setStatus({success: constants.LOGIN_SUCCESS_MESSAGE});
  } catch (error) {
    setStatus({error: error});
    PopupModal({
      titleText: constants.LOGIN_FAILURE_TITLE,
      text: constants.LOGIN_FAILURE_MESSAGE,
      icon: constants.POPUP_TYPE.ERROR,
      timer: constants.POPUP_CLOSE_TIME,
    });
  }
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
          enableReinitialize={true}
          validationSchema={schemas.LoginSchema}
          onSubmit={handleSubmit}
        >
          {({isSubmitting}) => (
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
                <SubmitButton
                  type="primary"
                  className="login-form-button"
                  disabled={isSubmitting}
                >
                  Login
                </SubmitButton>
                {'Or '}
                <Link to="/register">register now</Link>
              </FormItem>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default Login;
