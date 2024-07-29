import React, { useState } from 'react';
import axios from 'axios';
import SurveyList from './components/SurveyList';
import Modal from './components/Modal';
import './assets/css/main.css';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [currentSurvey, setCurrentSurvey] = useState(null);

  const openModal = (survey = null) => {
    setCurrentSurvey(survey);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSurvey(null); // Clear current survey
  };

  const handleSave = (formData) => {
    const url = currentSurvey ? `/v1/surveys/${currentSurvey.id}` : '/v1/surveys';
    const method = currentSurvey ? axios.put : axios.post;

    method(url, formData)
      .then(response => {
        console.log('Data saved:', response.data);
        if (response.data.flash) {
          setFlashMessage(response.data.flash.message);
        }
        closeModal(); // Close modal after save
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };

  return (
    <div className="App">
      <h1>Surveys List</h1>
      <button onClick={() => openModal()}>Create Survey</button>
      <SurveyList onEdit={openModal} />
      {flashMessage && <div className="flash-message">{flashMessage}</div>}
      <Modal isOpen={isModalOpen} closeModal={closeModal} onSave={handleSave} survey={currentSurvey} />
    </div>
  );
};

export default App;