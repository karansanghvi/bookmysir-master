import React from 'react';
import '../../assets/styles/style.css';

const LocationStep = ({ nextStep, handleChange, values }) => {
  return (
    <div>
      <h1 className='personal_details_title ml-8'>Location</h1>
      <form>
        {/* <h1 className='mt-4 ml-8'>Enter Address:</h1>
        <textarea 
          id="styledInputTextArea" 
          className='ml-8' 
          placeholder='Your Address'
          value={values.address || ''} 
          onChange={handleChange('address')}
        /> */}
        <div className='grid md:grid-cols-2 grid-cols-1'>
          <div>
            <h1 className='mt-4 ml-8'>Enter Flat Number:</h1>
            <input 
              type="number" 
              name="flat"
              value={values.flat}
              onChange={handleChange('flat')}
              className="ml-8 styledInput"
              placeholder='Flat Number'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 ml-8'>Enter Building Name:</h1>
            <input 
              type="text" 
              name="building"
              value={values.building}
              onChange={handleChange('building')}
              className="ml-8 styledInput"
              placeholder='Building Name'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 ml-8'>Enter Street Name:</h1>
            <input 
              type="text" 
              name="street"
              value={values.street}
              onChange={handleChange('street')}
              className="ml-8 styledInput"
              placeholder='Street Name'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 ml-8'>Enter Area Of Locality:</h1>
            <input 
              type="text" 
              name="locality"
              value={values.locality}
              onChange={handleChange('locality')}
              className="ml-8 styledInput"
              placeholder='Area Of Locality'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 ml-8'>Enter Pin Code:</h1>
            <input 
              type="number" 
              name="pin"
              value={values.pin}
              onChange={handleChange('pin')}
              className="ml-8 styledInput"
              placeholder='Pin Code'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 ml-8'>Enter Landmark:</h1>
            <input 
              type="text" 
              name="landmark"
              value={values.landmark}
              onChange={handleChange('landmark')}
              className="ml-8 styledInput"
              placeholder='Landmark'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 ml-8'>Enter City:</h1>
            <input 
              type="text" 
              name="city"
              value={values.city}
              onChange={handleChange('city')}
              className="ml-8 styledInput"
              placeholder='City'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 ml-8'>Enter State:</h1>
            <input 
              type="text" 
              name="state"
              value={values.state}
              onChange={handleChange('state')}
              className="ml-8 styledInput"
              placeholder='State'
              required
            />
          </div>
        </div>
      </form>
      <br />
      {/* Call nextStep to move to next step */}
      <button onClick={nextStep} className='next_button ml-8 mt-4'>Submit</button>
    </div>
  );
};

export default LocationStep;
