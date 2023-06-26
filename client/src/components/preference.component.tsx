import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Preferences = () => {
  const [preferences, setPreferences] = useState({ sources: [], categories: [], authors: [] });

  useEffect(() => {
    axios.get('http://localhost:8000/api/preferences') 
      .then(response => setPreferences(response.data));
  }, []);

  const handleSave = () => {
    axios.put('/api/preferences', preferences) 
      .then(response => console.log(response));
  };

  return (
    <div>
      <button onClick={handleSave}>Save Preferences</button>
    </div>
  );
};

export default Preferences;
