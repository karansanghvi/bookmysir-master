import React, { useEffect, useState } from 'react';
import '../../assets/styles/style.css';

const TeacherDetails = ({ nextStep, prevStep, handleChange, values }) => {
  const [selectedClasses, setSelectedClasses] = useState(values.selectedClasses || []);
  const [selectedEnggTypes, setSelectedEnggTypes] = useState(values.selectedEnggTypes || []);

  useEffect(() => {
    handleChange('selectedClasses')({ target: { value: selectedClasses } });
  }, [handleChange, selectedClasses]);

  useEffect(() => {
    handleChange('selectedEnggTypes')({ target: { value: selectedEnggTypes } });
  }, [handleChange, selectedEnggTypes]);

  const handleClassChange = (e) => {
    const className = e.target.name;
    if (e.target.checked) {
      setSelectedClasses([...selectedClasses, className]);
    } else {
      setSelectedClasses(selectedClasses.filter(c => c !== className));
    }
  };

  const handleEnggChange = (e) => {
    const enggType = e.target.name;
    if (e.target.checked) {
      setSelectedEnggTypes([...selectedEnggTypes, enggType]);
    } else {
      setSelectedEnggTypes(selectedEnggTypes.filter(e => e !== enggType));
    }
  };

  return (
    <div className=''>
      <h1 className='personal_details_title'>Teacher Details</h1>

      <div>
        <h1 className='font-medium'>Choose Class:</h1>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(classNum => (
          <React.Fragment key={`class${classNum}`}>
            <input
              type="checkbox"
              name={`class${classNum}`}
              id={`class${classNum}`}
              checked={selectedClasses.includes(`class${classNum}`)}
              onChange={handleClassChange}
            />
            <label htmlFor={`class${classNum}`}> Class {classNum}</label> <br />
          </React.Fragment>
        ))}
      </div>

      <div>
        <h1 className='font-medium'>Choose Engineering:</h1>
        <input
          type="checkbox"
          name="diploma"
          id="diploma"
          checked={selectedEnggTypes.includes('diploma')}
          onChange={handleEnggChange}
        />
        <label htmlFor="diploma"> Engineering Diploma</label> <br />
        <input
          type="checkbox"
          name="degree"
          id="degree"
          checked={selectedEnggTypes.includes('degree')}
          onChange={handleEnggChange}
        />
        <label htmlFor="degree"> Engineering Degree</label> <br />
      </div>
      <br />
      <div className='home_buttons'>
        <button onClick={prevStep} className='prev_button'>Back</button>
        <button onClick={nextStep} className='next_button_two'>Next</button>
      </div>
    </div>
  );
};

export default TeacherDetails;
