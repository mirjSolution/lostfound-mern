import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItemById } from '../../actions/items';
import { setAlert } from '../../actions/alert';

import './gst-claim-stub.css';

const GstClaimStub = ({
  items: { lostFound },
  getItemById,
  match,
  history,
  setAlert,
}) => {
  useEffect(() => {
    getItemById(match.params.id);
  }, [getItemById, match.params.id]);

  const {
    datefound,
    packageno,
    valuable,
    nonvaluable,
    perishable,
    area,
    finder,
    status,
    status1,
    status2,
  } = lostFound;

  if (
    status === 'claimed by guest' ||
    status1 === 'claimed by guest' ||
    status2 === 'claimed by guest' ||
    status === 'claimed by employee' ||
    status1 === 'claimed by employee' ||
    status2 === 'claimed by employee'
  ) {
    setAlert('Items already claimed', 'danger');
    history.push('/');
  }

  return (
    <Fragment>
      <div className='title'>
        {/*<h2>THE PENINSULA MANILA</h2> <h2>Guest Claiming Stub</h2>*/}
        {/*<h2>MANILA DOCTORS HOSPITAL</h2> <h3>Guest Claiming Stub</h3>*/}
        {/*<h2>Four Seasons Hotel Toronto</h2> <h2>Guest Claiming Stub</h2>*/}
        {/* <h2>LOST AND FOUND</h2> <h3>Guest Claiming Stub</h3> */}
        <h2>HOTEL OKURA - MANILA</h2> <h3>Guest Claiming Stub</h3>
        <p>{datefound}</p>
      </div>
      <div className='print'>
        <i className='fas fa-print' onClick={() => window.print()}></i>
      </div>
      <div className='article'>
        Article: {valuable ? valuable + ', ' : null}
        {nonvaluable ? nonvaluable + ', ' : null}
        {perishable ? perishable : ''}
      </div>
      <div className='container-1'>
        <div className='area'>Area: {area}</div>
        <div className='package'>Package No: {packageno}</div>
        <div className='date'>Date Found: {datefound}</div>
      </div>
      <div className='container-2'>
        <div className='finder'>Finder: {finder}</div>
        <div className='received'>Received by:</div>
        <div className='signature'>Signature:</div>
      </div>
    </Fragment>
  );
};

GstClaimStub.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getItemById: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { getItemById, setAlert })(
  withRouter(GstClaimStub)
);
