import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItemById, createItem } from '../../actions/items';
import { setAlert } from '../../actions/alert';

const EditItem = ({
  items: { lostFound, loading },
  getItemById,
  createItem,
  match,
  history,
}) => {
  const [formData, setFormData] = useState({
    area: '',
    guest: '',
    valuable: '',
    status: '',
    claimedby: '',
    dateclaimed: '',
    remarks: '',
    nonvaluable: '',
    status1: '',
    claimedby1: '',
    dateclaimed1: '',
    remarks1: '',
    perishable: '',
    status2: '',
    claimedby2: '',
    dateclaimed2: '',
    remarks2: '',
    finder: '',
    department: '',
  });

  useEffect(() => {
    getItemById(match.params.id);

    setFormData({
      area: loading || !lostFound.area ? '' : lostFound.area,
      guest: loading || !lostFound.guest ? '' : lostFound.guest,
      valuable: loading || !lostFound.valuable ? '' : lostFound.valuable,
      status: loading || !lostFound.status ? '' : lostFound.status,
      claimedby: loading || !lostFound.claimedby ? '' : lostFound.claimedby,
      dateclaimed:
        loading || !lostFound.dateclaimed ? '' : lostFound.dateclaimed,
      remarks: loading || !lostFound.remarks ? '' : lostFound.remarks,
      nonvaluable:
        loading || !lostFound.nonvaluable ? '' : lostFound.nonvaluable,
      status1: loading || !lostFound.status1 ? '' : lostFound.status1,
      claimedby1: loading || !lostFound.claimedby1 ? '' : lostFound.claimedby1,
      dateclaimed1:
        loading || !lostFound.dateclaimed1 ? '' : lostFound.dateclaimed1,
      remarks1: loading || !lostFound.remarks1 ? '' : lostFound.remarks1,
      perishable: loading || !lostFound.perishable ? '' : lostFound.perishable,
      status2: loading || !lostFound.status2 ? '' : lostFound.status2,
      claimedby2: loading || !lostFound.claimedby2 ? '' : lostFound.claimedby2,
      dateclaimed2:
        loading || !lostFound.dateclaimed2 ? '' : lostFound.dateclaimed2,
      remarks2: loading || !lostFound.remarks2 ? '' : lostFound.remarks2,
      finder: loading || !lostFound.finder ? '' : lostFound.finder,
      department: loading || !lostFound.department ? '' : lostFound.department,
    });
  }, [
    loading,
    getItemById,
    match.params.id,
    lostFound.area,
    lostFound.guest,
    lostFound.valuable,
    lostFound.nonvaluable,
    lostFound.perishable,
    lostFound.finder,
    lostFound.status,
    lostFound.dateclaimed,
    lostFound.claimedby,
    lostFound.remarks,
    lostFound.status1,
    lostFound.dateclaimed1,
    lostFound.claimedby1,
    lostFound.remarks1,
    lostFound.status2,
    lostFound.dateclaimed2,
    lostFound.claimedby2,
    lostFound.remarks2,
    lostFound.department,
  ]);

  const {
    valuable,
    nonvaluable,
    perishable,
    area,
    finder,
    guest,
    status,
    dateclaimed,
    claimedby,
    remarks,
    status1,
    dateclaimed1,
    claimedby1,
    remarks1,
    status2,
    dateclaimed2,
    claimedby2,
    remarks2,
    department,
  } = formData;

  const onChange = (e) => {
    if (formData.status === 'unclaimed' || formData.status === '') {
      formData.dateclaimed = '';
      formData.claimedby = '';
      formData.remarks = '';
    }
    if (formData.status1 === 'unclaimed' || formData.status1 === '') {
      formData.dateclaimed1 = '';
      formData.claimedby1 = '';
      formData.remarks1 = '';
    }
    if (formData.status2 === 'unclaimed' || formData.status2 === '') {
      formData.dateclaimed2 = '';
      formData.claimedby2 = '';
      formData.remarks2 = '';
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    createItem(formData, history, true, match.params.id);
  };

  const displayClaimedInputs = formData.status;
  const displayClaimedInputs1 = formData.status1;
  const displayClaimedInputs2 = formData.status2;

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Edit Lost and Found</h1>
          <p className='lead'>
            <i className='far fa-edit'></i>Edit valuable, non-valuable and
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
            {valuable && (
              <div className='form-group'>
                <h4>Valuable Status</h4>
                <select
                  name='status'
                  value={status}
                  onChange={(e) => onChange(e)}
                >
                  <option>Select Valuable Status</option>
                  <option value='unclaimed'>unclaimed</option>
                  <option value='to be claim'>to be claim</option>
                  <option value='claimed by guest'>claimed by guest</option>
                  <option value='claimed by employee'>
                    claimed by employee
                  </option>
                </select>
              </div>
            )}
            {displayClaimedInputs === 'claimed by guest' ||
            displayClaimedInputs === 'claimed by employee' ||
            displayClaimedInputs === 'to be claim' ? (
              <Fragment>
                <div className='form-group'>
                  <h4>
                    {displayClaimedInputs === 'to be claim'
                      ? 'Date To Be Claim'
                      : 'Date Claimed'}
                  </h4>
                  <input
                    type='date'
                    placeholder='Date Claimed'
                    name='dateclaimed'
                    value={dateclaimed}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder={
                      displayClaimedInputs === 'to be claim'
                        ? 'To Be Claim By'
                        : 'Claimed By'
                    }
                    name='claimedby'
                    value={claimedby}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <h4>Remarks</h4>
                  <input
                    type='text'
                    placeholder='Remarks'
                    name='remarks'
                    value={remarks}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </Fragment>
            ) : null}
            <div className='form-group'>
              <h4>Non-Valuable</h4>
              <input
                type='text'
                placeholder='Non-valuable'
                name='nonvaluable'
                value={nonvaluable}
                onChange={(e) => onChange(e)}
              />
            </div>
            {nonvaluable && (
              <div className='form-group'>
                <h4>Non-valuable Status</h4>
                <select
                  name='status1'
                  value={status1}
                  onChange={(e) => onChange(e)}
                >
                  <option>Select Non-valuable Status</option>
                  <option value='unclaimed'>unclaimed</option>
                  <option value='to be claim'>to be claim</option>
                  <option value='claimed by guest'>claimed by guest</option>
                  <option value='claimed by employee'>
                    claimed by employee
                  </option>
                </select>
              </div>
            )}
            {displayClaimedInputs1 === 'claimed by guest' ||
            displayClaimedInputs1 === 'claimed by employee' ||
            displayClaimedInputs1 === 'to be claim' ? (
              <Fragment>
                <div className='form-group'>
                  <h4>
                    {displayClaimedInputs1 === 'to be claim'
                      ? 'Date To Be Claim'
                      : 'Date Claimed'}
                  </h4>
                  <input
                    type='date'
                    placeholder='Date Claimed'
                    name='dateclaimed1'
                    value={dateclaimed1}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder={
                      displayClaimedInputs1 === 'to be claim'
                        ? 'To Be Claim By'
                        : 'Claimed By'
                    }
                    name='claimedby1'
                    value={claimedby1}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <h4>Remarks</h4>
                  <input
                    type='text'
                    placeholder='Remarks'
                    name='remarks1'
                    value={remarks1}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </Fragment>
            ) : null}
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
            {perishable && (
              <div className='form-group'>
                <h4>Perishable Status</h4>
                <select
                  name='status2'
                  value={status2}
                  onChange={(e) => onChange(e)}
                >
                  <option>Select Valuable Status</option>
                  <option value='unclaimed'>unclaimed</option>
                  <option value='to be claim'>to be claim</option>
                  <option value='claimed by guest'>claimed by guest</option>
                  <option value='claimed by employee'>
                    claimed by employee
                  </option>
                </select>
              </div>
            )}
            {displayClaimedInputs2 === 'claimed by guest' ||
            displayClaimedInputs2 === 'claimed by employee' ||
            displayClaimedInputs2 === 'to be claim' ? (
              <Fragment>
                <div className='form-group'>
                  <h4>
                    {displayClaimedInputs2 === 'to be claim'
                      ? 'Date To Be Claim'
                      : 'Date Claimed'}
                  </h4>
                  <input
                    type='date'
                    placeholder='Date Claimed'
                    name='dateclaimed2'
                    value={dateclaimed2}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder={
                      displayClaimedInputs === 'to be claim'
                        ? 'To Be Claim By'
                        : 'Claimed By'
                    }
                    name='claimedby2'
                    value={claimedby2}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <h4>Remarks</h4>
                  <input
                    type='text'
                    placeholder='Remarks'
                    name='remarks2'
                    value={remarks2}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </Fragment>
            ) : null}
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
              <h4>Department</h4>
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
      )}
    </Fragment>
  );
};

EditItem.propTypes = {
  createItem: PropTypes.func.isRequired,
  getItemById: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { getItemById, createItem, setAlert })(
  withRouter(EditItem)
);
