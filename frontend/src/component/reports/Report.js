import React, { Fragment } from 'react';

import './Report.css';
import { Link } from 'react-router-dom';

const Report = (props) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Reports</h1>
      <p className='lead'>
        <i className='fas fa-list-ol'></i> Select Reports to View
      </p>

      <div className='reports'>
        <Link className='message' to='/valuable'>
          <div className='report bg-dark'>
            <i className='fas fa-dollar-sign fa-3x'></i>
            <p className='contacts-p'>
              Items to be Released Valuables - List of all lost and found
              valuables item to be released
            </p>
          </div>
        </Link>
        <Link className='message' to='/nonvaluable'>
          <div className='report bg-dark'>
            <i className='fas fa-tshirt fa-3x'></i>
            <p className='contacts-p'>
              Items to be Released Non-Valuables - List of all lost and found
              non-valuables item to be released
            </p>
          </div>
        </Link>
        <Link className='message' to='/perishables'>
          <div className='report bg-dark'>
            <i className='fas fa-pizza-slice fa-3x'></i>
            <p className='contacts-p'>
              Items to be Released Perishable - List of all lost and found
              perishable item to be released
            </p>
          </div>
        </Link>

        <Link className='message' to='/tobeclaimed'>
          <div className='report bg-dark'>
            <i className='fas fa-handshake fa-3x'></i>
            <p className='contacts-p'>
              Items to be claim - List of all lost and found items to be claim
            </p>
          </div>
        </Link>
        <Link className='message' to='/claimedguest'>
          <div className='report bg-dark'>
            <i className='fas fa-user-tie fa-3x'></i>
            <p className='contacts-p'>
              Items claimed - List of all lost and found items claimed by guest
              or known owner
            </p>
          </div>
        </Link>
        <Link className='message' to='/claimedemp'>
          <div className='report bg-dark'>
            <i className='fas fa-id-card fa-3x'></i>
            <p className='contacts-p'>
              Items claimed - List of all lost and found items claimed by
              employee or finder
            </p>
          </div>
        </Link>
        {/* <div className='report bg-dark'>
          <i className='fas fa-user-secret fa-3x'></i>
          <p className='contacts-p'>
            Audit Trail- List of all lost and found items added, edited or
            deleted by the user
          </p>
  </div>*/}
        {/*  <Link className='message' to='/message'>
          <div className='report bg-dark '>
            <i className='fas fa-envelope-open fa-3x'></i>
            <p className='contacts-p'>
              Messages- List of all messages created and sent through contact us
            </p>
          </div>
</Link>*/}
      </div>
    </Fragment>
  );
};

Report.propTypes = {};

export default Report;
