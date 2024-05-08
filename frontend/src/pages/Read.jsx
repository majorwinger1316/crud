import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/Read.css";

function Read() {
  const [animalNames, setAnimalNames] = useState([]);
  const [error, setError] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/read');
      if (!response.ok) {
        throw new Error('Failed to fetch animal names: ' + response.statusText);
      }
      const data = await response.json();
      setAnimalNames(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching animal names:', error);
      setError('Failed to fetch animal names. Please try again later.');
    }
  };

  const handleUpdate = async (animalName) => {
    // Implement the update logic here
    console.log('Update clicked for animal:', animalName);
    try {
      const response = await fetch(`http://localhost:8081/update/${animalName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedName }),
      });
      if (!response.ok) {
        throw new Error('Failed to update animal: ' + response.statusText);
      }
      // If update is successful, fetch updated data
      fetchData();
    } catch (error) {
      console.error('Error updating animal:', error);
      setError('Failed to update animal. Please try again later.');
    }
  };

  const handleDelete = async (animalName) => {
    // Implement the delete logic here
    console.log('Delete clicked for animal:', animalName);
    try {
      const response = await fetch(`http://localhost:8081/delete/${animalName}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal: ' + response.statusText);
      }
      // If deletion is successful, fetch updated data
      fetchData();
    } catch (error) {
      console.error('Error deleting animal:', error);
      setError('Failed to delete animal. Please try again later.');
    }
  };

  return (
    <div className='read'>
      <div className='first'>
        <h2>Read, Update, Delete</h2>
        <form onSubmit={fetchData}>
          {/* <button type="submit" className='submit_butt'><SearchIcon/></button> */}
        </form>
      </div>
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : animalNames.length > 0 ? (
          <table className="animal-table">
            <thead>
              <tr>
                <th>Animal Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                {animalNames.map((animal, index) => (
                    <tr key={index}>
                      <td>{animal.animal_names}</td>
                      <td>
                          <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                          />
                          <button onClick={() => handleUpdate(animal.animal_names)}><SyncAltIcon /></button>
                          <button onClick={() => handleDelete(animal.animal_names)}><DeleteIcon /></button>
                      </td>
                    </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No animal names available</p>
        )}
      </div>
    </div>
  );
}

export default Read;
