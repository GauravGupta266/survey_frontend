import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance'; // Import the updated axiosInstance
import Modal from './Modal';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axiosInstance.get('/v1/surveys');
      setSurveys(response.data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    }
  };

  const openModal = (survey) => {
    setSelectedSurvey(survey);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSurvey(null);
    setIsModalOpen(false);
  };

  const handleSave = (formData) => {
    axiosInstance.put(`/v1/surveys/${selectedSurvey.id}`, formData)
      .then(response => {
        console.log('Survey updated:', response.data);
        fetchSurveys(); // Refresh survey list after update
        closeModal(); // Close modal after successful update
      })
      .catch(error => {
        console.error('Error updating survey:', error);
      });
  };

  return (
    <div className="middle-container">
      <div className="overview-table px-2 pt-10 mt-7">
        <table className="table table-hover bg-white thead-12">
          <thead className="text-dark border-bottom border-light border-bottom-2">
            <tr>
              <th scope="col">Logs #</th>
              <th scope="col" className="text-nowrap">Name</th>
              <th scope="col" className="text-nowrap">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
              <tr key={survey.id}>
                <td>{index + 1}</td>
                <td>{survey.name}</td>
                <td>{survey.description}</td>
                <td>
                  <button className="btn btn-link" onClick={() => openModal(survey)}>
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal} onSave={handleSave} survey={selectedSurvey} />
    </div>
  );
};

export default SurveyList;