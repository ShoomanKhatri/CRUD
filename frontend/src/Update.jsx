import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  // Managing form values as a single object
 

  const navigate = useNavigate();
 
 const[student, setStudent]=useState([])
  const {id} = useParams();
  
  useEffect(()=>{
    axios.get('http://localhost:8000/read/' +id)
      .then(res => {
        // console.log('Response:', res.data);
        setStudent(res.data[0]);
        // console.log(res.data[0])
        // Reset form after submission
        setValues({
          name: res.data[0]?.name || '',
          email: res.data[0]?.email || '',
        });
      })
        // Optional: Reset form after submission
      
      .catch((err) => console.error('Error:', err));

    },[])

    const [values, setValues] = useState({
      name: student.name,
      email: student.email,
    });

    const handleUpdate = (event) =>{
      event.preventDefault();
      axios.put('http://localhost:8000/update/'+id, values)
      .then(res=>{
        console.log(res);
        navigate('/');
      }).catch((err) => console.error('Error:', err));
    }
  

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Update Student</h2>
        <form onSubmit={handleUpdate}>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
