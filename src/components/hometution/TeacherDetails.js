import React, { useState } from 'react';
import '../../assets/styles/style.css';

function TeacherDetails() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedEnggTypes, setSelectedEnggTypes] = useState([]);

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
    <div className='ml-8'>
      <h1 className='personal_details_title'>Teacher Details</h1>

      <div>
        <h1 className='font-medium'>Choose Class:</h1>
        <input
          type="checkbox"
          name="class1"
          id="class1"
          onChange={handleClassChange}
        />
        <label htmlFor="class1"> Class 1</label> <br />
        <input
          type="checkbox"
          name="class2"
          id="class2"
          onChange={handleClassChange}
        />
        <label htmlFor="class2"> Class 2</label> <br />
        <input
          type="checkbox"
          name="class3"
          id="class3"
          onChange={handleClassChange}
        />
        <label htmlFor="class3"> Class 3</label> <br />
        <input
          type="checkbox"
          name="class4"
          id="class4"
          onChange={handleClassChange}
        />
        <label htmlFor="class4"> Class 4</label> <br />
        <input
          type="checkbox"
          name="class5"
          id="class5"
          onChange={handleClassChange}
        />
        <label htmlFor="class5"> Class 5</label> <br />
        <input
          type="checkbox"
          name="class6"
          id="class6"
          onChange={handleClassChange}
        />
        <label htmlFor="class6"> Class 6</label> <br />
        <input
          type="checkbox"
          name="class7"
          id="class7"
          onChange={handleClassChange}
        />
        <label htmlFor="class7"> Class 7</label> <br />
        <input
          type="checkbox"
          name="class8"
          id="class8"
          onChange={handleClassChange}
        />
        <label htmlFor="class8"> Class 8</label> <br />
        <input
          type="checkbox"
          name="class9"
          id="class9"
          onChange={handleClassChange}
        />
        <label htmlFor="class9"> Class 9</label> <br />
        <input
          type="checkbox"
          name="class10"
          id="class10"
          onChange={handleClassChange}
        />
        <label htmlFor="class10"> Class 10</label> <br />
        <input
          type="checkbox"
          name="class11"
          id="class11"
          onChange={handleClassChange}
        />
        <label htmlFor="class11"> Class 11</label> <br />
        <input
          type="checkbox"
          name="class12"
          id="class12"
          onChange={handleClassChange}
        />
        <label htmlFor="class12"> Class 12</label> <br />
      </div>

      <div>
        <h1 className='font-medium'>Choose Engineering:</h1>
        <input
          type="checkbox"
          name="diploma"
          id="diploma"
          onChange={handleEnggChange}
        />
        <label htmlFor="diploma"> Engineering Diploma</label> <br />
        <input
          type="checkbox"
          name="degree"
          id="degree"
          onChange={handleEnggChange}
        />
        <label htmlFor="degree"> Engineering Degree</label> <br />
      </div>
    </div>
  );
}

export default TeacherDetails;
