import React, { useState } from 'react';
import '../../assets/styles/style.css';

function SubjectStep(props) {
  const { nextStep, prevStep } = props;

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);

  const handleSubjectChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSubjects((prev) =>
      checked ? [...prev, name] : prev.filter((subject) => subject !== name)
    );
  };

  const handleSemesterChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSemesters((prev) =>
      checked ? [...prev, name] : prev.filter((semester) => semester !== name)
    );
  };

  const handleBranchChange = (e) => {
    const { value, checked } = e.target;
    setSelectedBranches((prev) =>
      checked ? [...prev, value] : prev.filter((branch) => branch !== value)
    );
  };

  return (
    <div className='ml-8'>
      <h1 className='personal_details_title'>Subject Details</h1>
      <h1 className='mt-4 font-medium'>Select Subject:</h1>
      {['maths', 'english', 'science', 'physics', 'chemistry', 'biology', 'marathi', 'sanskrit', 'other', 'all'].map((subject) => (
        <div key={subject}>
          <input
            type="checkbox"
            name={subject}
            id={subject}
            checked={selectedSubjects.includes(subject)}
            onChange={handleSubjectChange}
          />
          <label htmlFor={subject}> {subject.charAt(0).toUpperCase() + subject.slice(1)}</label> <br />
        </div>
      ))}

      <h1 className='mt-4 font-medium'>Select Engineering Semester:</h1>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
        <div key={semester}>
          <input
            type="checkbox"
            name={semester.toString()}
            id={semester.toString()}
            checked={selectedSemesters.includes(semester.toString())}
            onChange={handleSemesterChange}
          />
          <label htmlFor={semester.toString()}> Semester {semester}</label> <br />
        </div>
      ))}

      <h1 className='mt-4 font-medium'>Select Engineering Branch:</h1>
      {[
        { id: 'mechanical', value: 'Mechanical Engineering' },
        { id: 'civil', value: 'Civil Engineering' },
        { id: 'production', value: 'Production Engineering' },
        { id: 'automobile', value: 'Automobile Engineering' },
        { id: 'electronics_telecommunication', value: 'Electronics & Telecommunication Engineering' },
        { id: 'electronics', value: 'Electronics Engineering' },
        { id: 'electrical', value: 'Electrical Engineering' },
        { id: 'computer', value: 'Computer Engineering' },
        { id: 'information_technology', value: 'Information Technology Engineering' },
      ].map((branch) => (
        <div key={branch.id}>
          <input
            type="checkbox"
            id={branch.id}
            name="engineering"
            value={branch.value}
            checked={selectedBranches.includes(branch.value)}
            onChange={handleBranchChange}
          />
          <label htmlFor={branch.id}>{branch.value}</label><br />
        </div>
      ))}
      
      <br />
      <div className='home_buttons'>
        <button onClick={prevStep} className='prev_button'>Back</button>
        <button onClick={nextStep} className='next_button_two'>Next</button>
      </div>
    </div>
  );
}

export default SubjectStep;
