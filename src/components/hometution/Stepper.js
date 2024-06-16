import React, { useEffect, useState, useRef } from 'react';
import '../../assets/styles/style.css'; 

const Stepper = ({ currentStep, steps }) => {
  const [newStep, setNewStep] = useState([]);

  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];

    let count = 0;

    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = new Array(steps).fill('').map((_, index) =>
      Object.assign(
        {},
        {
          description: `Step ${index + 1}`,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepRef.current = stepsState;

    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [currentStep, steps]); 

  const displaySteps = newStep.map((step, index) => {
    return (
      <div key={index} className="flex flex-col items-center md:flex-row mr-10">
        <div className="relative flex flex-col items-center text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
              step.selected ? 'circle_stepper text-white font-bold border' : ''
            }`}
          >
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
        </div>
        {index !== newStep.length - 1 && (
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out mx-4 w-full md:w-auto" style={{ minWidth: '30px' }}>
            <div className={`h-1 ${step.completed ? 'circle_stepper' : 'bg-gray-300'}`}></div>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="mx-4 p-4 flex flex-col md:flex-row justify-between items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;
