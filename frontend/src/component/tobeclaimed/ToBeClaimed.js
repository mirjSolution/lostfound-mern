import React, { useEffect, Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getToBeClaimed } from '../../actions/items';
import './ToBeClaimed.css';

const ToBeClaimed = ({ getToBeClaimed, items: { lostFound, loading } }) => {
  const [formDate, setDate] = useState({
    dateto: '',
    datefrom: '',
  });
  useEffect(() => {
    getToBeClaimed();
  }, [getToBeClaimed]);

  const { datefrom, dateto } = formDate;

  const onChange = (e) => {
    setDate({ ...formDate, [e.target.name]: e.target.value });
  };
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>ITEMS TO BE CLAIM</h1>
      <p className='lead'>
        <i className='fas fa-handshake'></i> List of all lost and found items to
        be claimed
      </p>

      <div className='tobeclaimed-preview'>
        <div className='date-search'>
          <div className='date-from'>
            <h4>Date From</h4>
            <input
              type='date'
              name='datefrom'
              onChange={(e) => onChange(e)}
              value={datefrom}
            />
          </div>
          <div className='date-to'>
            <h4>Date To</h4>
            <input
              type='date'
              placeholder='Date Claimed'
              name='dateto'
              onChange={(e) => onChange(e)}
              value={dateto}
            />
          </div>
          {/* <div className='dt-submit'>
<h4 className='hidden'>Test</h4>
<button onClick={() => onClick()}>Print Preview</button>
</div> */}
          <div className='dt-print'>
            <h4 className='hidden'>Test</h4>
            <i className='fas fa-print' onClick={() => window.print()}></i>
          </div>
        </div>

        <table className='tobeclaimed'>
          <thead>
            <tr>
              <th>To Be Claim Items</th>
            </tr>
          </thead>
          <tbody>
            {lostFound.length > 0
              ? lostFound
                  .filter(
                    (item) =>
                      (item.dateclaimed >= datefrom &&
                        item.dateclaimed <= dateto) ||
                      (item.dateclaimed1 >= datefrom &&
                        item.dateclaimed1 <= dateto) ||
                      (item.dateclaimed2 >= datefrom &&
                        item.dateclaimed2 <= dateto)
                  )
                  .map((item) => (
                    <tr key={item._id}>
                      <td>
                        {/** Valuable */}
                        {item.status === 'to be claim'
                          ? item.packageno && 'Package No: ' + item.packageno
                          : null}{' '}
                        {item.status === 'to be claim'
                          ? item.dateclaimed &&
                            '-- To be Claim: ' + item.dateclaimed
                          : null}{' '}
                        {item.status === 'to be claim'
                          ? item.valuable && '-- Valuable: ' + item.valuable
                          : null}{' '}
                        {item.status === 'to be claim'
                          ? item.claimedby &&
                            '-- To be claimed by: ' + item.claimedby
                          : null}{' '}
                        {item.status === 'to be claim'
                          ? item.remarks && '-- Remarks:' + item.remarks
                          : null}{' '}
                        {/** Non Valuable */}
                        {item.status1 === 'to be claim'
                          ? item.packageno && 'Package No: ' + item.packageno
                          : null}{' '}
                        {item.status1 === 'to be claim'
                          ? item.dateclaimed1 &&
                            '-- To be Claim: ' + item.dateclaimed1
                          : null}{' '}
                        {item.status1 === 'to be claim'
                          ? item.nonvaluable &&
                            '-- Non-valuable: ' + item.nonvaluable
                          : null}{' '}
                        {item.status1 === 'to be claim'
                          ? item.claimedby1 &&
                            '-- To be claimed by: ' + item.claimedby1
                          : null}{' '}
                        {item.status1 === 'to be claim'
                          ? item.remarks1 && '-- Remarks:' + item.remarks1
                          : null}{' '}
                        {/** Perishable*/}
                        {item.status2 === 'to be claim'
                          ? item.packageno && 'Package No: ' + item.packageno
                          : null}{' '}
                        {item.status2 === 'to be claim'
                          ? item.dateclaimed2 &&
                            '-- To be Claim: ' + item.dateclaimed2
                          : null}{' '}
                        {item.status2 === 'to be claim'
                          ? item.perishable &&
                            '-- Perishable: ' + item.perishable
                          : null}{' '}
                        {item.status2 === 'to be claim'
                          ? item.claimedby2 &&
                            '-- To be claimed by: ' + item.claimedby2
                          : null}{' '}
                        {item.status2 === 'to be claim'
                          ? item.remarks2 && '-- Remarks:' + item.remarks2 + ' '
                          : null}{' '}
                      </td>
                    </tr>
                  ))
              : lostFound.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {/** Valuable */}
                      {item.status === 'to be claim'
                        ? item.packageno && 'Package No: ' + item.packageno
                        : null}{' '}
                      {item.status === 'to be claim'
                        ? item.dateclaimed &&
                          '-- To be Claim: ' + item.dateclaimed
                        : null}{' '}
                      {item.status === 'to be claim'
                        ? item.valuable && '-- Valuable: ' + item.valuable
                        : null}{' '}
                      {item.status === 'to be claim'
                        ? item.claimedby &&
                          '-- To be claimed by: ' + item.claimedby
                        : null}{' '}
                      {item.status === 'to be claim'
                        ? item.remarks && '-- Remarks:' + item.remarks
                        : null}{' '}
                      {/** Non Valuable */}
                      {item.status1 === 'to be claim'
                        ? item.packageno && 'Package No: ' + item.packageno
                        : null}{' '}
                      {item.status1 === 'to be claim'
                        ? item.dateclaimed1 &&
                          '-- To be Claim: ' + item.dateclaimed1
                        : null}{' '}
                      {item.status1 === 'to be claim'
                        ? item.nonvaluable &&
                          '-- Non-valuable: ' + item.nonvaluable
                        : null}{' '}
                      {item.status1 === 'to be claim'
                        ? item.claimedby1 &&
                          '-- To be claimed by: ' + item.claimedby1
                        : null}{' '}
                      {item.status1 === 'to be claim'
                        ? item.remarks1 && '-- Remarks:' + item.remarks1
                        : null}{' '}
                      {/** Perishable*/}
                      {item.status2 === 'to be claim'
                        ? item.packageno && 'Package No: ' + item.packageno
                        : null}{' '}
                      {item.status2 === 'to be claim'
                        ? item.dateclaimed2 &&
                          '-- To be Claim: ' + item.dateclaimed2
                        : null}{' '}
                      {item.status2 === 'to be claim'
                        ? item.perishable && '-- Perishable: ' + item.perishable
                        : null}{' '}
                      {item.status2 === 'to be claim'
                        ? item.claimedby2 &&
                          '-- To be claimed by: ' + item.claimedby2
                        : null}{' '}
                      {item.status2 === 'to be claim'
                        ? item.remarks2 && '-- Remarks:' + item.remarks2 + ' '
                        : null}{' '}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

ToBeClaimed.propTypes = {
  getToBeClaimed: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { getToBeClaimed })(ToBeClaimed);
