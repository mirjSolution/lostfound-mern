import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/contact';

const Contact = ({ createMessage, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
  });

  const { name, email, contact, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createMessage(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Contact Us</h1>
      <p className='lead'>
        <i className='fas fa-envelope'></i> Send Your Message or Inquiry
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Contact Number'
            name='contact'
            value={contact}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            type='message'
            placeholder='Message'
            name='message'
            row='5'
            value={message}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Send' />
        <Link className='btn btn-light my-1' to='/'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

Contact.propTypes = {
  createMessage: PropTypes.func.isRequired,
};

export default connect(null, { createMessage })(withRouter(Contact));
