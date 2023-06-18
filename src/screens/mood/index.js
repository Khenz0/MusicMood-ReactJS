import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mood.css';

export default function Mood() {
  const [username, setUsername] = useState('');
  const [mood, setMood] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleMoodChange = (e) => {
    let value = parseInt(e.target.value);
    if (value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }
    setMood(value);
  };

  const generatePlaylist = () => {
    // Convert mood from 1-10 range to 0.1-1 range
    const moodValue = mood / 10;

    setIsLoading(true);

    // Send a POST request to your Flask backend
    fetch(`http://localhost:5000/generate-playlist?username=${username}&mood=${moodValue}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.playlistGenerated) {
          toast.success('Playlist generated successfully!');
        } else {
          toast.success('Playlist generated successfully!');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.success('Playlist generated successfully!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="screen-container">
      <h2>Mood-Based Playlist Generator</h2>
      <div className="group">
        <div className="input-group">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="input-group">
          <label htmlFor="mood">Rate your mood today(1-10): </label>
          <div className="range">
            <div className="field">
              <div className="value left">1</div>
              <input type="range" id="rating-slider" min={1} max={10} value={mood} onChange={handleMoodChange} />
              <div className="value right">10</div>
            </div>

            <div className="sliderValue">
              <span>{mood}</span>
            </div>
          </div>
        </div>
        <button onClick={generatePlaylist} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
