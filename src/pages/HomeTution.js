import React, { useState } from 'react';
import Stepper from '../components/hometution/Stepper';
import PersonalDetailsStep from '../components/hometution/PersonalDetailsStep';
import RoleStep from '../components/hometution/RoleStep';
import SubjectStep from '../components/hometution/SubjectStep';
import TypeStep from '../components/hometution/TypeStep';
import LocationStep from '../components/hometution/LocationStep';
import StudentParentDetails from '../components/hometution/StudentParentDetails';
import TeacherDetails from '../components/hometution/TeacherDetails';
import '../assets/styles/style.css';

export default function HomeTution() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
  });

  const nextStep = () => {
    switch (currentStep) {
      case 1:
        setCurrentStep(2);
        break;
      case 2:
        if (formData.role === 'SP') {
          setCurrentStep(3);
        } else if (formData.role === 'Teacher') {
          setCurrentStep(4);
        }
        break;
      case 3:
        setCurrentStep(5);
        break;
      case 4:
        setCurrentStep(5);
        break;
      case 5:
        setCurrentStep(6);
        break;
      case 6:
        setCurrentStep(7);
        break;
      default:
        break;
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 2:
        return (
          <RoleStep
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 3:
        return (
          <StudentParentDetails
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 4:
        return (
          <TeacherDetails
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 5:
        return (
          <SubjectStep
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 6:
        return (
          <TypeStep
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 7:
        return (
          <LocationStep
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='mt-32'>
        <h1 className='home_tution_title md:text-center'>
          Book Your <span className='home_text'>Home</span> Tutions
        </h1>
        <div className='md:w-120 mx-auto shadow-xl rounded-2xl bg-white md:ml-32 ml-4 md:mr-32 p-8'>
          <Stepper currentStep={currentStep} steps={7} /> 
          {renderStep()}
        </div>
      </div>
    </>
  );
}
