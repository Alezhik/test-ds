import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Paper, TextField, Button, CircularProgress } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { loginRequest } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getLoading } from './selectors';

import reducer from './reducer';
import saga from './saga';

const Login = props => {
  const { handleLogin, loading } = props;
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const formikProps = {
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => handleLogin(values),
  };

  if (loading) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <Formik {...formikProps}>
      {formProps => (
        <Form>
          <Paper
            style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
          >
            <TextField
              id="username"
              label="Username"
              type="email"
              onChange={formProps.handleChange}
              value={formProps.values.Username}
              style={{ margin: 5 }}
            />
            <TextField
              id="password"
              label="Password"
              name="password"
              onChange={formProps.handleChange}
              value={formProps.values.password}
              style={{ margin: 5 }}
              type="password"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ margin: 5 }}
            >
              Login
            </Button>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: getLoading(),
});

function mapDispatchToProps(dispatch) {
  const handleLogin = data => dispatch(loginRequest(data));

  return {
    handleLogin,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
