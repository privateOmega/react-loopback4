import React from 'react';
import {Row, Col, Icon} from 'antd';
import {Formik} from 'formik';
import {Form, Input, SubmitButton, FormItem} from 'formik-antd';
import {Link} from 'react-router-dom';

import './forgot.css';
import {schemas} from '../../utils';

interface FormValues {
  email: string;
}

const Forgot: React.FC = props => {
  function handleSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Row align="middle" justify="space-around" type="flex">
      <Col span={16}>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={schemas.ForgotSchema}
          render={() => (
            <Form layout="inline" className="forgot-form">
              <FormItem name="email">
                <Input
                  name="email"
                  prefix={
                    <Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="email"
                />
              </FormItem>
              <FormItem name="buttons">
                <SubmitButton type="primary" className="forgot-form-button">
                  Recover Account
                </SubmitButton>
                {' Or '}
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

export default Forgot;
