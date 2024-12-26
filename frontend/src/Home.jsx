import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from the backend
  useEffect(() => {
    axios
      .get('http://localhost:8000/')
      .then((res) => {
        setData(res.data); // Set the student data in state
        setLoading(false); // Stop the loading state
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to load student data'); // Set error message in case of failure
        setLoading(false); // Stop the loading state even if there's an error
      });
  }, []);

  // Handle deleting a student
  const handleDelete = (id) => {
    
    axios.delete(`http://localhost:8000/delete/`+id)
    .then(res=>{
      location.reload();
    })
    .catch(err=>console.log(err))

  };

  // Show loading, error, or the data
  if (loading) {
    return <div className="d-flex vh-100 justify-content-center align-items-center">Loading...</div>;
  }

  if (error) {
    return <div className="d-flex vh-100 justify-content-center align-items-center">{error}</div>;
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Student List</h2>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/create" className="btn btn-success">
            Create +
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <Link to={`/read/${student.id}`} className="btn btn-sm btn-info">Read</Link>
                  <Link to={`/edit/${student.id}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
                  <button  className="btn btn-sm btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
