import React from 'react';
import '../../assets/styles/style.css';

const LocationStep = ({ prevStep, nextStep, handleChange, values }) => {
  return (
    <div>
      <h1 className='personal_details_title '>Location</h1>
      <form>
        <div className='grid md:grid-cols-2 grid-cols-1'>
          <div>
            <h1 className='mt-4 '>Enter Flat Number:</h1>
            <input 
              type="number" 
              name="flat"
              value={values.flat}
              onChange={handleChange('flat')}
              className=" styledInput"
              placeholder='Flat Number'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 '>Enter Building Name:</h1>
            <input 
              type="text" 
              name="building"
              value={values.building}
              onChange={handleChange('building')}
              className=" styledInput"
              placeholder='Building Name'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 '>Enter Street Name:</h1>
            <input 
              type="text" 
              name="street"
              value={values.street}
              onChange={handleChange('street')}
              className=" styledInput"
              placeholder='Street Name'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 '>Enter Area Of Locality:</h1>
            <input 
              type="text" 
              name="locality"
              value={values.locality}
              onChange={handleChange('locality')}
              className=" styledInput"
              placeholder='Area Of Locality'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 '>Enter Pin Code:</h1>
            <input 
              type="number" 
              name="pin"
              value={values.pin}
              onChange={handleChange('pin')}
              className=" styledInput"
              placeholder='Pin Code'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 '>Enter Landmark:</h1>
            <input 
              type="text" 
              name="landmark"
              value={values.landmark}
              onChange={handleChange('landmark')}
              className=" styledInput"
              placeholder='Landmark'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 '>Enter City:</h1>
            <input 
              type="text" 
              name="city"
              value={values.city}
              onChange={handleChange('city')}
              className=" styledInput"
              placeholder='City'
              required
            />
          </div>
          <div>
            <h1 className='mt-4 '>Enter State:</h1>
            <input 
              type="text" 
              name="state"
              value={values.state}
              onChange={handleChange('state')}
              className=" styledInput"
              placeholder='State'
              required
            />
          </div>
        </div>
      </form>
      <br />
      <div className='home_buttons'>
        <button onClick={prevStep} className='prev_button'>Back</button>
        <button onClick={nextStep} className='next_button_two'>Submit</button>
      </div>
    </div>
  );
};

export default LocationStep;
