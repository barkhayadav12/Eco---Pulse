import React, { useState } from 'react';
import axios from 'axios';

const AddTeam = ({ setTeams }) => {
    const [teamName, setTeamName] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newTeam = { teamName, location, phoneNumber };

        try {
            const response = await axios.post('http://localhost:5000/api/teams', newTeam);
            setTeams(prevTeams => [...prevTeams, response.data]);
            alert('Team added successfully!');
            setTeamName('');
            setLocation('');
            setPhoneNumber('');
        } catch (error) {
            console.error('Error creating team:', error);
            alert('Failed to create team.');
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            <h5 className="text-center mb-4">Add New Team</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Team Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Team</button>
            </form>
        </div>
    );
};

export default AddTeam;
