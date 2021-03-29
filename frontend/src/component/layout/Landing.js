import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './Footer';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/items' />;
  }
  return (
    <Fragment>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            {/*<h1 className='x-large'>Four Seasons Hotel - Toronto</h1>*/}
            {/* <h1 className='x-large'>LOST AND FOUND APPLICATION</h1> */}
            <h1 className='x-large'>HOTEL OKURA - MANILA</h1>
            {/*<h1 className='x-large'>The Anndore House</h1>*/}
            {/*<h1 className='x-large'>Manila Doctors Hospital</h1>*/}
            <p className='lead'>Collection of Lost and Found Items</p>
            <div className='buttons'>
              <Link to='/login' className='btn btn-primary'>
                <i className='fas fa-chevron-right'> </i> LOGIN
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
