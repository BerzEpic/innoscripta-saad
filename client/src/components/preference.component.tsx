import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Preferences = () => {
  const [preferences, setPreferences] = useState({ sources: [], categories: [], authors: [] });

  useEffect(() => {
    axios.get('http://localhost:8000/api/preferences') // replace with your backend endpoint
      .then(response => setPreferences(response.data));
  }, []);

  const handleSave = () => {
    axios.put('/api/preferences', preferences) // replace with your backend endpoint
      .then(response => console.log(response));
  };

  return (
    <div>
      {/* create form fields for sources, categories, authors */}
      <button onClick={handleSave}>Save Preferences</button>
    </div>
  );
};

export default Preferences;
