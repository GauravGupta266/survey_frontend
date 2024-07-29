import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, closeModal, onSave, survey }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });

  // Update form data when survey prop changes
  useEffect(() => {
    if (survey) {
      setFormData({ name: survey.name, description: survey.description });
    }
  }, [survey]);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);  // Trigger the save function passed as a prop
    closeModal();      // Optionally close the modal after saving
  };

  // Render nothing if modal is not open
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{survey ? 'Edit Survey' : 'Create Survey'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;