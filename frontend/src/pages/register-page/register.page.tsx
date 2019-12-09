import React from 'react';
import {Row, Col, Icon} from 'antd';
import {Formik, FormikHelpers} from 'formik';
import {Form, Input, SubmitButton, FormItem} from 'formik-antd';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';

import './register.css';
import {schemas, constants} from '../../utils';
import {authenticationServices} from '../../services';
import {PopupModal} from '../../components';

interface FormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = (props: RouteComponentProps) => {
  async function handleSubmit(
    values: FormValues,
    {setStatus}: FormikHelpers<FormValues>,
  ) {
    setStatus(null);
    try {
      const {confirmPassword, ...valuesWithoutConfirmPassword} = values;
      await authenticationServices.register(valuesWithoutConfirmPassword);
      setStatus({success: constants.REGISTRATION_SUCCESS_MESSAGE});
      PopupModal({
        titleText: constants.REGISTRATION_SUCCESS_TITLE,
        text: constants.REGISTRATION_SUCCESS_MESSAGE,
        icon: constants.POPUP_TYPE.SUCCESS,
        timer: constants.POPUP_CLOSE_TIME,
      });
      props.history.push('/login');
    } catch (error) {
      setStatus({error: error});
      PopupModal({
        titleText: constants.REGISTRATION_FAILURE_TITLE,
        text: constants.REGISTRATION_FAILURE_MESSAGE,
        icon: constants.POPUP_TYPE.ERROR,
        timer: constants.POPUP_CLOSE_TIME,
      });
    }
  }

  return (
    <Row align="middle" justify="space-around" type="flex">
      <Col span={16}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
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
              <FormItem name="username">
                <Input
                  name="username"
                  prefix={
                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="username"
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

export default withRouter(Register);
