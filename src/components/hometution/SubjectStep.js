import React, { useState, useEffect } from 'react'

export default function SubjectStep({ nextStep, prevStep, handleChange, values }) {

  const [selectedSubjects, setSelectedSubject] = useState(values.selectedSubject || []);
  const [selectedSemester, setSelectedSemester] = useState(values.selectedSemester || []);
  const [selectedBranch, setSelectedBranch] = useState(values.selectedBranch || []);

  useEffect(() => {
    handleChange('selectedSubjects')({ target: { value: selectedSubjects } });
  }, [handleChange, selectedSubjects]);

  useEffect(() => {
    handleChange('selectedSemester')({ target: { value: selectedSemester } });
  }, [handleChange, selectedSemester]);

  useEffect(() => {
    handleChange('selectedBranch')({ target: { value: selectedBranch } });
  }, [handleChange, selectedBranch]);

  const handleSemesterChange = (e) => {
    const semesterName = e.target.name;
    if (e.target.checked) {
      setSelectedSemester([...selectedSemester, semesterName]);
    } else {
      setSelectedSemester(selectedSemester.filter(c => c !== semesterName));
    }
  };

  const handleSubjectChange = (e) => {
    const subjectName = e.target.name;
    if (e.target.checked) {
      setSelectedSubject([...selectedSubjects, subjectName]);
    } else {
      setSelectedSubject(selectedSubjects.filter(c => c !== subjectName));
    }
  };

  const handleBranchChange = (e) => {
    const branchName = e.target.name;
    if (e.target.checked) {
      setSelectedBranch([...selectedBranch, branchName]);
    } else {
      setSelectedBranch(selectedBranch.filter(c => c !== branchName));
    }
  };
  
  return (
    <>
     <div className='ml-8'>
      <h1 className='personal_details_title'>Subject Details</h1>
      <h1 className='mt-4 font-medium'>Select Subject:</h1>
      {['Maths', 'English', 'Science', 'Physics', 'Chemistry', 'Biology', 'Marathi', 'Sanskrit', 'Other', 'All Subjects'].map(subjectNum => (
          <React.Fragment key={`subject${subjectNum}`}>
            <input
              type="checkbox"
              name={`subject${subjectNum}`}
              id={`subject${subjectNum}`}
              checked={selectedSubjects.includes(`subject${subjectNum}`)}
              onChange={handleSubjectChange}
            />
            <label htmlFor={`subject${subjectNum}`}>{subjectNum}</label> <br />
          </React.Fragment>
        ))}

      <h1 className='mt-4 font-medium'>Select Engineering Semester:</h1>
      {['1', '2', '3', '4', '5', '6', '7', '8'].map(semesterNum => (
          <React.Fragment key={`semester${semesterNum}`}>
            <input
              type="checkbox"
              name={`semester${semesterNum}`}
              id={`semester${semesterNum}`}
              checked={selectedSemester.includes(`semester${semesterNum}`)}
              onChange={handleSemesterChange}
            />
            <label htmlFor={`semester${semesterNum}`}> Semester {semesterNum}</label> <br />
          </React.Fragment>
        ))}

      <h1 className='mt-4 font-medium'>Select Engineering Branch:</h1>
      {['Mechanical', 'Civil', 'Production', 'Automobile', 'Electronics & Telecommunications', 'Electronics', 'Electrical', 'Computer', 'Information Technology'].map(branchNum => (
        <React.Fragment key={`branch${branchNum}`}>
          <input
            type="checkbox"
            name={`branch${branchNum}`}
            id={`branch${branchNum}`}
            checked={selectedBranch.includes(`branch${branchNum}`)}
            onChange={handleBranchChange}
          />
          <label htmlFor={`branch${branchNum}`}>{branchNum} Engineering</label> <br />
        </React.Fragment>
      ))}

      <br />
      <div className='home_buttons'>
        <button onClick={prevStep} className='prev_button'>Back</button>
        <button onClick={nextStep} className='next_button_two'>Next</button>
      </div>
     </div> 
    </>
  )
}
