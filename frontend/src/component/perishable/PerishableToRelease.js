import React, { useEffect, Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPerishables } from '../../actions/items';
import Moment from 'react-moment';
import moment from 'moment';
import './PerishableToRelease.css';

const PerishableToRelease = ({
  getPerishables,
  items: { lostFound, loading },
}) => {
  const [formDate, setDate] = useState({
    dateto: '',
    datefrom: '',
  });
  useEffect(() => {
    getPerishables();
  }, [getPerishables]);
  const { datefrom, dateto } = formDate;

  const onChange = (e) => {
    setDate({ ...formDate, [e.target.name]: e.target.value });
  };
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>ITEMS TO BE RELEASED</h1>
      <p className='lead'>
        <i className='fas fa-pizza-slice'></i> List of all lost and found
        perishables to released
      </p>

      <div className='perishable-preview'>
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

        <table className='perishable'>
          <thead>
            <tr>
              <th>Package No</th>
              <th>Date Found</th>
              <th>Area/Location</th>
              <th>Perishable</th>
              <th>Finder</th>
            </tr>
          </thead>
          <tbody>
            {lostFound.length > 0 && datefrom && dateto
              ? lostFound
                  .filter(
                    (item) =>
                      item.datefound >= datefrom && item.datefound <= dateto
                  )
                  .map((item) => (
                    <Fragment key={item._id}>
                      {item.status2 === 'claimed by guest' ||
                      item.status2 === 'claimed by employee' ||
                      item.status2 === 'to be claim' ? null : item.perishable &&
                        item.status2 === 'unclaimed' ? (
                        <tr key={item._id}>
                          <td className={item.packageno ? '' : 's-padding'}>
                            {item.packageno}
                          </td>
                          <td className={item.datefound ? '' : 's-padding'}>
                            <Moment format='MM/DD/YYYY'>
                              {moment(item.datefound, [
                                'MM-DD-YYYY',
                                'YYYY-MM-DD',
                              ])}
                            </Moment>
                          </td>
                          <td className={item.area ? '' : 's-padding'}>
                            {item.area}
                          </td>
                          <td className={item.perishable ? '' : 's-padding'}>
                            {item.perishable}
                          </td>
                          <td className={item.finder ? '' : 's-padding'}>
                            {item.finder}
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  ))
              : lostFound.map((item) => (
                  <Fragment key={item._id}>
                    {item.status === 'claimed by guest' ||
                    item.status === 'claimed by employee' ||
                    item.status === 'to be claim' ? null : item.perishable &&
                      item.status === 'unclaimed' ? (
                      <tr key={item._id}>
                        <td className={item.packageno ? '' : 's-padding'}>
                          {item.packageno}
                        </td>
                        <td className={item.datefound ? '' : 's-padding'}>
                          <Moment format='MM/DD/YYYY'>
                            {moment(item.datefound, [
                              'MM-DD-YYYY',
                              'YYYY-MM-DD',
                            ])}
                          </Moment>
                        </td>
                        <td className={item.area ? '' : 's-padding'}>
                          {item.area}
                        </td>
                        <td className={item.perishable ? '' : 's-padding'}>
                          {item.perishable}
                        </td>
                        <td className={item.finder ? '' : 's-padding'}>
                          {item.finder}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

PerishableToRelease.propTypes = {
  getPerishables: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { getPerishables })(
  PerishableToRelease
);
