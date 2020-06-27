import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import { ReactComponent as Logo } from '../../img/Logo.svg';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/items'>L&F</Link>
      </li>
      {/* <li>
        <Link to='/contact'>Contact</Link>
     </li>*/}
      <li>
        <Link to='/reports'>Reports</Link>
      </li>
      {user && user.role === 'admin' ? (
        <li>
          <Link to='/register'>Register</Link>
        </li>
      ) : (
        <Redirect to='/' />
      )}
      <li>
        <Link onClick={logout} to='/'>
          Logout
        </Link>
      </li>
    </ul>
  );

  // const guestLinks = (
  //   <ul>
  //     <li>
  //       <Link to='/items'>L&F</Link>
  //     </li>

  //     <li>
  //       <Link to='/contact'>Contact</Link>
  //     </li>
  //     <li>
  //       <Link to='/login'>Login</Link>
  //     </li>
  //   </ul>
  // );

  return (
    <Fragment>
      <nav className='navbar bg-dark'>
        <h1>
          {isAuthenticated ? (
            <Fragment>
              <i className='fas fa-user'></i> {user.name}
            </Fragment>
          ) : (
            <Link to='/'>
              <Logo className='logo-img' /> {''} LostFound
            </Link>
          )}
        </h1>
        {!loading && (
          <Fragment>
            {isAuthenticated ? authLinks : <Redirect to='/' />}
          </Fragment>
        )}
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
