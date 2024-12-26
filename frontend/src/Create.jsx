import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
  // Managing form values as a single object
  const [values, setValues] = useState({
    name: '',
    email: '',
  });

 
  const  navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the values object to send the form data
    axios
      .post('http://localhost:8000/student', values)
      .then(res => {
        console.log('Response:', res.data);
        // setMessage('Student added successfully!');
        // Reset form after submission
        // setValues({ ...values, name: res.data[0].name, email:res.data[0].email});
        navigate('/');
      })
        // Optional: Reset form after submission
      
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={values.name} // Accessing name from values
              onChange={(e) =>
                setValues({ ...values, name: e.target.value }) // Updating name in values
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={values.email} // Accessing email from values
              onChange={(e) =>
                setValues({ ...values, email: e.target.value }) // Updating email in values
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
