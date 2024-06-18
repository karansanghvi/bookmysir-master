import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import modal_tick from '../../assets/images/tick.png';
import '../../assets/styles/style.css';

const SubmissionModal = ({ closeModal }) => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
      navigate('/'); 
    }, 7000);
    return () => clearTimeout(timer);
  }, [closeModal, navigate]);

  return (
    <div className='modal'>
      <div className='modal_content'>
        <img src={modal_tick} alt="" className='w-24 h-22 modal_image' />
        <h2 className='text-2xl font-bold'>Form Submitted</h2>
        <p>We will contact you soon</p>
      </div>
    </div>
  );
};

export default SubmissionModal;
