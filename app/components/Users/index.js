import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Paper,
  TableContainer,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { usersRequest } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { getUsers } from './selectors';
import { getToken } from '../../services/_helpers';
import { tokenNotRelevant, logout } from '../Login/actions';
import { authTokenDelay, refreshTokenDelay } from '../../constants/delays';

const UserList = props => {
  const { users, handleUsers, handleTokenNotRelevant, handleLogout } = props;
  useInjectReducer({ key: 'users', reducer });
  useInjectSaga({ key: 'users', saga });

  const refreshUserList = () => {
    const authToken = getToken('access_token', authTokenDelay);
    const refreshToken = getToken('refresh_token', refreshTokenDelay);

    if (authToken) {
      handleUsers();
    }
    if (!authToken && refreshToken) {
      handleTokenNotRelevant();
    }
    if (!authToken && !refreshToken) {
      handleLogout();
    }
  };

  if (users.length === 0) {
    return <CircularProgress color="secondary" />;
  }

  const keys = Object.keys(users[0]);

  return (
    <TableContainer component={Paper}>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: 5 }}
        onClick={() => refreshUserList()}
      >
        Refresh List
      </Button>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {keys.map(title => (
              <TableCell align="right" key={title}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(row => (
            <TableRow key={`${row.name}-${row.id}`}>
              {keys.map(title => (
                <TableCell align="right" key={`${title}-${row.id}`}>
                  {row[title]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

UserList.propTypes = {
  handleUsers: PropTypes.func,
  handleTokenNotRelevant: PropTypes.func,
  handleLogout: PropTypes.func,
  users: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  users: getUsers(),
});

function mapDispatchToProps(dispatch) {
  const handleUsers = () => dispatch(usersRequest());
  const handleTokenNotRelevant = () => dispatch(tokenNotRelevant());
  const handleLogout = () => dispatch(logout());

  return {
    handleUsers,
    handleTokenNotRelevant,
    handleLogout,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserList);
