import React, { useState } from 'react';
import axios from 'axios';

const CreateSurvey = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/surveys', {
        name,
        description,
      });
      console.log('Survey created:', response.data);
      // Handle success, redirect or show a success message
    } catch (error) {
      console.error('Error creating survey:', error);
      // Handle error, show error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Survey</button>
    </form>
  );
};

export default CreateSurvey;