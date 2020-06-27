import React, { useEffect, Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getClaimedEmp } from '../../actions/items';
import './Claimedemp.css';

const ClaimedEmployee = ({ getClaimedEmp, items: { lostFound, loading } }) => {
  const [formDate, setDate] = useState({
    dateto: '',
    datefrom: '',
  });
  useEffect(() => {
    getClaimedEmp();
  }, [getClaimedEmp]);

  const { datefrom, dateto } = formDate;

  const onChange = (e) => {
    setDate({ ...formDate, [e.target.name]: e.target.value });
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>ITEMS CLAIMED</h1>
      <p className='lead'>
        <i className='fas fa-id-card'></i> List of all lost and found items
        claimed by employee or finder
      </p>

      <div className='claimedemp-preview'>
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
        </div>

        <table className='claimedemp'>
          <thead>
            <tr>
              <th>Items Claimed Details</th>
            </tr>
          </thead>
          <tbody>
            {lostFound.length > 0 && datefrom && dateto
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
                        {item.status === 'claimed by employee'
                          ? item.packageno && 'Package No: ' + item.packageno
                          : null}{' '}
                        {item.status === 'claimed by employee'
                          ? item.dateclaimed &&
                            '-- Claimed On: ' + item.dateclaimed
                          : null}{' '}
                        {item.status === 'claimed by employee'
                          ? item.valuable && '-- Valuable: ' + item.valuable
                          : null}{' '}
                        {item.status === 'claimed by employee'
                          ? item.claimedby && '-- Claimed by: ' + item.claimedby
                          : null}{' '}
                        {item.status === 'claimed by employee'
                          ? item.remarks && '-- Remarks:' + item.remarks
                          : null}{' '}
                        {/** Non Valuable */}
                        {item.status1 === 'claimed by employee'
                          ? item.packageno && 'Package No: ' + item.packageno
                          : null}{' '}
                        {item.status1 === 'claimed by employee'
                          ? item.dateclaimed1 &&
                            '-- Claimed On: ' + item.dateclaimed1
                          : null}{' '}
                        {item.status1 === 'claimed by employee'
                          ? item.nonvaluable &&
                            '-- Non-valuable: ' + item.nonvaluable
                          : null}{' '}
                        {item.status1 === 'claimed by employee'
                          ? item.claimedby1 &&
                            '-- Claimed By: ' + item.claimedby1
                          : null}{' '}
                        {item.status1 === 'claimed by employee'
                          ? item.remarks1 && '-- Remarks:' + item.remarks1
                          : null}{' '}
                        {/** Perishable*/}
                        {item.status2 === 'claimed by employee'
                          ? item.packageno && 'Package No: ' + item.packageno
                          : null}{' '}
                        {item.status2 === 'claimed by employee'
                          ? item.dateclaimed2 &&
                            '-- Claimed On: ' + item.dateclaimed2
                          : null}{' '}
                        {item.status2 === 'claimed by employee'
                          ? item.perishable &&
                            '-- Perishable: ' + item.perishable
                          : null}{' '}
                        {item.status2 === 'claimed by employee'
                          ? item.claimedby2 &&
                            '-- Claimed By: ' + item.claimedby2
                          : null}{' '}
                        {item.status2 === 'claimed by employee'
                          ? item.remarks2 && '-- Remarks:' + item.remarks2 + ' '
                          : null}{' '}
                      </td>
                    </tr>
                  ))
              : lostFound.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {/** Valuable */}
                      {item.status === 'claimed by employee'
                        ? item.packageno && 'Package No: ' + item.packageno
                        : null}{' '}
                      {item.status === 'claimed by employee'
                        ? item.dateclaimed &&
                          '-- Claimed On: ' + item.dateclaimed
                        : null}{' '}
                      {item.status === 'claimed by employee'
                        ? item.valuable && '-- Valuable: ' + item.valuable
                        : null}{' '}
                      {item.status === 'claimed by employee'
                        ? item.claimedby && '-- Claimed by: ' + item.claimedby
                        : null}{' '}
                      {item.status === 'claimed by employee'
                        ? item.remarks && '-- Remarks:' + item.remarks
                        : null}{' '}
                      {/** Non Valuable */}
                      {item.status1 === 'claimed by employee'
                        ? item.packageno && 'Package No: ' + item.packageno
                        : null}{' '}
                      {item.status1 === 'claimed by employee'
                        ? item.dateclaimed1 &&
                          '-- Claimed On: ' + item.dateclaimed1
                        : null}{' '}
                      {item.status1 === 'claimed by employee'
                        ? item.nonvaluable &&
                          '-- Non-valuable: ' + item.nonvaluable
                        : null}{' '}
                      {item.status1 === 'claimed by employee'
                        ? item.claimedby1 && '-- Claimed By: ' + item.claimedby1
                        : null}{' '}
                      {item.status1 === 'claimed by employee'
                        ? item.remarks1 && '-- Remarks:' + item.remarks1
                        : null}{' '}
                      {/** Perishable*/}
                      {item.status2 === 'claimed by employee'
                        ? item.packageno && 'Package No: ' + item.packageno
                        : null}{' '}
                      {item.status2 === 'claimed by employee'
                        ? item.dateclaimed2 &&
                          '-- Claimed On: ' + item.dateclaimed2
                        : null}{' '}
                      {item.status2 === 'claimed by employee'
                        ? item.perishable && '-- Perishable: ' + item.perishable
                        : null}{' '}
                      {item.status2 === 'claimed by employee'
                        ? item.claimedby2 && '-- Claimed By: ' + item.claimedby2
                        : null}{' '}
                      {item.status2 === 'claimed by employee'
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

ClaimedEmployee.propTypes = {
  getClaimedEmp: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { getClaimedEmp })(ClaimedEmployee);
