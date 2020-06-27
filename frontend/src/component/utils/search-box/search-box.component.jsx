import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './search-box.styles.css';

const SearchBox = ({ placeholder, handleChange, auth, linkAdd }) => (
  <div className='search'>
    <input
      className='search-input'
      type='search'
      placeholder={placeholder}
      onChange={handleChange}
    />
    {(linkAdd && auth && auth.user && auth.user.role === 'admin') ||
    (linkAdd && auth && auth.user && auth.user.role === 'user') ? (
      <Link className='add-item' to='/additem'>
        ADD LOST AND FOUND ITEM
      </Link>
    ) : null}
  </div>
);

SearchBox.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SearchBox);
