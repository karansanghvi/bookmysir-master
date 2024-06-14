import React, { useState } from 'react';
import { StepperContext } from '../components/contexts/StepperContext';
import Stepper from '../components/hometution/Stepper';
import StepperControl from '../components/hometution/StepperControl';
import '../assets/styles/style.css';
import PersonalDetails from '../components/hometution/PersonalDetails';
import Role from '../components/hometution/Role';
import TypeOfTution from '../components/hometution/TypeOfTution';
import Location from '../components/hometution/Location';
import TeacherDetails from '../components/hometution/TeacherDetails';
import StudentParentDetails from '../components/hometution/StudentParentDetails';
import Subject from '../components/hometution/Subject';

const HomeTution = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [finalData, setFinalData] = useState([]);
  const [classType, setClassType] = useState('');

  const steps = [
    'Personal Details',
    'Role',
    'Subject',
    'Type Of Tution',
    'Location',
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <PersonalDetails />;
      case 2:
        return <Role />;
      case 3:
        return userData.role === 'Teacher' ? (
          <TeacherDetails />
        ) : (
          <StudentParentDetails setClassType={setClassType} />
        );
      case 4:
        return <Subject/>;
      case 5:
        return <TypeOfTution />;
      case 6:
        return <Location />;
      default:
        return null; 
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === 'next' ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <>
      <div className='mt-32'>
        <h1 className='home_tution_title md:text-center'>
          Book Your <span className='home_text'>Home</span> Tutions
        </h1>
        <div className="md:w-120 mx-auto shadow-xl rounded-2xl bg-white md:ml-32 ml-4 md:mr-32">
          <div className="container horizontal mt-5">
            <Stepper currentStep={currentStep} steps={steps} />
          </div>
          <div>
            <StepperContext.Provider
              value={{ userData, setUserData, finalData, setFinalData, classType, setClassType }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </div>
          {currentStep !== steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomeTution;
