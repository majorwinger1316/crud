import React, { useState } from 'react';
import "../styles/Create.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';

function Create() {
    const [values, setValues] = useState({
        animal_names: ''
    });
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:8081/create', { animal_names: values.animal_names })
            .then(() => {
                // Show alert when the animal name is successfully inserted
                alert('Animal name inserted successfully!');
            })
            .catch(err => console.error("Error:", err));
    };
    

  return (
    <div className='create'>
      <h2>Write an Animal's name to store:-</h2>
      <form onSubmit={handleSubmit}>
        <div className='searchBar'>
          <button type='submit' className="btn-search">
            <AddCircleIcon />  
          </button>
          <input type="text" className='input-search' name='animal_names' onChange={handleInput}/>
        </div>
      </form>
    </div>
  );
}

export default Create;
