/* eslint-disable default-case */
import React, { useState } from 'react';
import { StepperContext } from '../components/contexts/StepperContext';
import Stepper from '../components/hometution/Stepper';
import StepperControl from '../components/hometution/StepperControl';
import '../assets/styles/style.css';
import PersonalDetails from '../components/hometution/PersonalDetails';
import ContactDetails from '../components/hometution/ContactDetails';
import EducationDetails from '../components/hometution/EducationDetails';
import HomeTutionDetails from '../components/hometution/HomeTutionDetails';
import Summary from '../components/hometution/Summary';

const HomeTution = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState('');
  const [finalData, setFinalData] = useState([]);

  const steps = [
    'Personal Details',
    'Contact Details',
    'Education Details',
    'Home Tution Details',
    'Summary',
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <PersonalDetails/>;
      case 2:
        return <ContactDetails/>;
      case 3:
        return <EducationDetails/>;
      case 4:
        return <HomeTutionDetails/>;
      case 5:
        return <Summary/>;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === 'next' ? newStep++ : newStep--;
    //check if steps are within bounds\
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <>
      <div className='mt-32'>
        <h1 className='home_tution_title md:text-center'>Book Your <span className='home_text'>Home</span> Tutions</h1>
        <div className="md:w-120 mx-auto shadow-xl rounded-2xl bg-white md:ml-32 ml-4 md:mr-32">
          <div className="container horizontal mt-5">
            <Stepper currentStep={currentStep} steps={steps} />
          </div>
          <div>
            <StepperContext.Provider
              value={{ userData, setUserData, finalData, setFinalData }}
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
