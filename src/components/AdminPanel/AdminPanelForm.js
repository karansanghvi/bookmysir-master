// AdminPanelForm.jsx

import React, { useState } from 'react';

const AdminPanelForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>Content:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Accordion Item</button>
    </form>
  );
};

export default AdminPanelForm;
