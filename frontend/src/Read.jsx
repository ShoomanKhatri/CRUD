import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Read() {

    const {id} =useParams();
    const [student,setStudent]=useState([])
    
    useEffect(()=>{
    axios.get('http://localhost:8000/read/'+id)
    .then(res=>{ 
         console.log(res)
           setStudent(res.data[0])
    })
.catch(err=>console.log(err))
    },[])


  return (
   <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white  roundend p-3'>
<div className='p-2'>
  <h2>Student Detail</h2>
  <h2>{student.id}</h2>
  <h2>{student.name}</h2>
  <h2>{student.email}</h2>

</div>
        <Link to='/'  className="btn btn-primary me-2"  >back</Link>
        <Link to={`/edit/${student.id}`}  className="btn btn-primary">edit</Link>
    </div>

   </div>
  )
}

export default Read;