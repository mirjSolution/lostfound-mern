import React, { useEffect, Fragment, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMessages, deleteMessage } from '../../actions/contact';

import './Message.css';
import SearchBox from '../utils/search-box/search-box.component.jsx';

const Messsage = ({
  getMessages,
  deleteMessage,
  auth: { user },
  contact: { loading, messages },
}) => {
  const [formSearch, setFormSearch] = useState({
    searchField: '',
  });
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const handleChange = (event) => {
    setFormSearch({ searchField: event.target.value });
  };

  const fetchRequest = useCallback(() => {
    getMessages();
  }, [getMessages]);

  const DeleteMessage = (itemId) => {
    deleteMessage(itemId);
    fetchRequest();
  };

  const { searchField } = formSearch;
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>MESSAGES</h1>
      <p className='lead'>
        <i className='fas fa-envelope-open'></i> Messages created in contact us
        page
      </p>

      <div className='message-preview'>
        <SearchBox
          placeholder='Search Messages'
          handleChange={handleChange}
          linkAdd={false}
        />

        <table className='message'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Messages</th>
              {user && user.role === 'admin' ? (
                <th className='actions'>Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {messages.length > 0
              ? messages
                  .filter(
                    (item) =>
                      item.createdAt
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.name
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.email
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.message
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      item.contact
                        .toLowerCase()
                        .includes(searchField.toLowerCase())
                  )
                  .map((item) => (
                    <tr key={item._id}>
                      <td className={item.name ? '' : 's-padding'}>
                        {item.createdAt}
                      </td>
                      <td className={item.name ? '' : 's-padding'}>
                        {item.name}
                      </td>
                      <td className={item.email ? '' : 's-padding'}>
                        {item.email}
                      </td>
                      <td className={item.contact ? '' : 's-padding'}>
                        {item.contact}
                      </td>
                      <td className={item.message ? '' : 's-padding'}>
                        {item.message}
                      </td>
                      {user && user.role === 'admin' ? (
                        <td className='actions'>
                          <Link
                            to='/message'
                            onClick={() => DeleteMessage(item._id)}
                            className='delete'
                          >
                            Delete
                          </Link>
                        </td>
                      ) : null}
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

Messsage.propTypes = {
  getMessages: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  contact: state.contact,
});

export default connect(mapStateToProps, { getMessages, deleteMessage })(
  Messsage
);
