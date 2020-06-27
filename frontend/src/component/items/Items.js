import React, { useEffect, Fragment, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import Spinner from '../layout/Spinner';
import { getItems, deleteItem } from '../../actions/items';

import './Items.css';

import SearchBox from '../../component/utils/search-box/search-box.component.jsx';

const Items = ({
  getItems,
  deleteItem,
  auth: { user },
  items: { lostFound, loading },
}) => {
  const [formSearch, setFormSearch] = useState({
    searchField: '',
  });

  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleChange = (event) => {
    setFormSearch({ searchField: event.target.value });
  };

  const fetchRequest = useCallback(() => {
    getItems();
  }, [getItems]);

  const DeleteItem = (itemId) => {
    deleteItem(itemId);
    fetchRequest();
  };

  const { searchField } = formSearch;

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='collection-preview'>
        <SearchBox
          placeholder='Search Lost and Found Item'
          handleChange={handleChange}
          linkAdd={true}
        />

        <table className='items'>
          <thead>
            <tr>
              <th>Package No</th>
              <th>Date Found</th>
              <th>Area/Location</th>
              <th>Guest/Owner</th>
              <th>Valuables</th>
              <th>Non-Valuables</th>
              <th>Perishable</th>
              <th>Finder</th>
              <th>Division</th>
              <th>Actions</th>

              {/*(user && user.role === 'admin') ||
              (user && user.role === 'user') ? (
                <Fragment>
                  <th className='actions'>Actions</th>
                </Fragment>
              ) : null*/}
            </tr>
          </thead>
          <tbody>
            {lostFound.length > 0
              ? lostFound
                  .filter(
                    (item) =>
                      item.valuable
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.packageno
                        .toString()
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.guest
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.nonvaluable
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.perishable
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.datefound
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.area
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.finder
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.status
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.status1
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.department
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.status2
                        .toLowerCase()
                        .includes(searchField.toLowerCase())
                  )
                  .map((item) => (
                    // (item.status === 'claimed by guest' && !user) ||
                    // (item.status1 === 'claimed by guest' && !user) ||
                    // (item.status2 === 'claimed by guest' && !user) ||
                    // (item.status === 'claimed by employee' && !user) ||
                    // (item.status1 === 'claimed by employee' && !user) ||
                    // (item.status2 === 'claimed by employee' && !user) ? null : ()
                    <tr key={item._id}>
                      <td className={item.packageno ? 'package' : 's-padding'}>
                        {item.packageno}
                      </td>
                      <td className={item.datefound ? '' : 's-padding'}>
                        <Moment format='MM/DD/YYYY'>
                          {moment(item.datefound, ['MM-DD-YYYY', 'YYYY-MM-DD'])}
                        </Moment>
                      </td>
                      <td className={item.area ? '' : 's-padding'}>
                        {item.area}
                      </td>
                      <td className={item.guest ? '' : 's-padding'}>
                        {item.guest}
                      </td>
                      <td className={item.valuable ? '' : 's-padding'}>
                        {item.valuable}
                        {item.valuable &&
                          item.status !== 'unclaimed' &&
                          ', ' + item.status}
                      </td>
                      <td className={item.nonvaluable ? '' : 's-padding'}>
                        {item.nonvaluable}
                        {item.nonvaluable &&
                          item.status1 !== 'unclaimed' &&
                          ', ' + item.status1}
                      </td>
                      <td className={item.perishable ? '' : 's-padding'}>
                        {item.perishable}
                        {item.perishable &&
                          item.status2 !== 'unclaimed' &&
                          ', ' + item.status2}
                      </td>
                      <td className={item.finder ? '' : 's-padding'}>
                        {item.finder}
                      </td>
                      <td className={item.department ? '' : 's-padding'}>
                        {item.department}
                      </td>

                      {/*(user && user.role === 'admin') ||
                      (user && user.role === 'user') ? (
                        <Fragment>
                          <td className='actions'>
                            {(user && user.role === 'admin') ||
                            (user && user.role === 'user') ? (
                              <Link
                                className='edit'
                                to={`/edititem/${item._id}`}
                              >
                                Edit
                              </Link>
                            ) : null}
                            {user && user.role === 'admin' ? (
                              <Link
                                to='/'
                                onClick={() => DeleteItem(item._id)}
                                className='delete'
                              >
                                Delete
                              </Link>
                            ) : null}
                          </td>
                        </Fragment>
                            ) : null*/}
                      <td>
                        <div className='actions'>
                          <Link to={`/gstclaimstub/${item._id}`}>
                            <i className='fas fa-clipboard-list'></i>
                          </Link>
                          {(user && user.role === 'admin') ||
                          (user && user.role === 'user') ? (
                            <Fragment>
                              <Link to={`/edititem/${item._id}`}>
                                <i className='fas fa-edit'></i>
                              </Link>
                            </Fragment>
                          ) : null}
                          {user && user.role === 'admin' ? (
                            <Link to='/' onClick={() => DeleteItem(item._id)}>
                              <i className='fas fa-trash-alt'></i>
                            </Link>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  items: state.items,
});

export default connect(mapStateToProps, { getItems, deleteItem })(Items);
