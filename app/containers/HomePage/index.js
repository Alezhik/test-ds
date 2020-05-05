/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import Login from '../../components/Login';
import { getIsAuth } from '../../components/Login/selectors';
import { getUsers } from '../../components/Users/selectors';
import { getToken } from '../../services/_helpers';
import { usersRequest } from '../../components/Users/actions';
import { refreshRequest } from '../../components/Login/actions';
import Users from '../../components/Users';
import { authTokenDelay, refreshTokenDelay } from '../../constants/delays';

function HomePage(props) {
  const { isAuth, users, handleUsers, handleRefresh } = props;
  const authToken = getToken('access_token', authTokenDelay);
  const refreshToken = getToken('refresh_token', refreshTokenDelay);

  useEffect(() => {
    if (authToken && users.length === 0) {
      handleUsers();
    }
    if (!authToken && refreshToken) {
      handleRefresh();
    }
  }, [isAuth]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      {isAuth ? <Users /> : <Login />}
    </div>
  );
}

HomePage.propTypes = {
  handleUsers: PropTypes.func,
  handleRefresh: PropTypes.func,
  isAuth: PropTypes.bool,
  users: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  isAuth: getIsAuth(),
  users: getUsers(),
});

function mapDispatchToProps(dispatch) {
  const handleUsers = () => dispatch(usersRequest());
  const handleRefresh = () => dispatch(refreshRequest(() => {}));

  return {
    handleUsers,
    handleRefresh,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
