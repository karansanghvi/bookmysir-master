import React from 'react'

function LocationStep({nextStep}) {
  return (
    <div>
       <h1 className='personal_details_title ml-8'>Location</h1>
       <br />
      <button onClick={nextStep} className='next_button ml-8 mt-4'>Submit</button>
    </div>
  )
}

export default LocationStep
