import React from 'react';
import '../../assets/styles/style.css';

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="flex justify-between mt-4 p-8">
      {/* back button */}
      <button
        className={`bg-white text-black uppercase py-2 px-4 rounded-xl font-semibold 
      cursor-pointer border-2 border-slate-300
        transition-all duration-200 ease-in-out ml-8 ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => handleClick("back")}
        disabled={currentStep === 1}
      >
        Back
      </button>

      {/* next button */}
      <button
        className="circle_stepper text-white uppercase py-2 px-4 rounded-xl font-semibold 
      cursor-pointer  hover:text-white
        transition-all duration-200 ease-in-out mr-8"
        onClick={() => handleClick("next")}
      >
        {currentStep === steps.length ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
