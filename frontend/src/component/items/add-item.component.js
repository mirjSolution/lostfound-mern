import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createItem } from '../../actions/items';

const AddItem = ({ createItem, history }) => {
  const [formData, setFormData] = useState({
    valuable: '',
    nonvaluable: '',
    perishable: '',
    area: '',
    finder: '',
    guest: '',
    department: '',
  });

  const {
    valuable,
    nonvaluable,
    perishable,
    area,
    finder,
    guest,
    department,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createItem(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Lost and Found</h1>
      <p className='lead'>
        <i className='fas fa-plus'></i> Add any valuable, non-valuable and
        perishable items
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <h4>Area/Location</h4>
          <input
            type='text'
            placeholder='Area/Location'
            name='area'
            value={area}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>Guest/Owner Name</h4>
          <input
            type='text'
            placeholder='Guest/Owner Name'
            name='guest'
            value={guest}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>Valuable</h4>
          <input
            type='text'
            placeholder='Valuable'
            name='valuable'
            value={valuable}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>Non-valuable</h4>
          <input
            type='text'
            placeholder='Non-valuable'
            name='nonvaluable'
            value={nonvaluable}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>Perishable</h4>
          <input
            type='text'
            placeholder='Perishable'
            name='perishable'
            value={perishable}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>Finder</h4>
          <input
            type='text'
            placeholder='Finder'
            name='finder'
            value={finder}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>Division</h4>
          <select
            name='department'
            value={department}
            onChange={(e) => onChange(e)}
          >
            <option value=''>Select Division</option>
            <option value='Accounting'>Accounting</option>
            <option value='Engineering'>Engineering</option>
            <option value='Food and Beverages'>Food and Beverages</option>
            <option value='Human Resources'>Human Resources</option>
            <option value='Rooms'>Rooms</option>
            <option value='Sales and Marketing'>Sales and Marketing</option>
            <option value='Visitor'>Visitor</option>
          </select>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/items'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddItem.propTypes = {
  createItem: PropTypes.func.isRequired,
};

export default connect(null, { createItem })(withRouter(AddItem));
