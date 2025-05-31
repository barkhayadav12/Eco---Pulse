import { useEffect, useState } from 'react';
import axios from 'axios';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/teams')
      .then(res => {
        setTeams(res.data);
        setFilteredTeams(res.data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  useEffect(() => {
    const filtered = teams.filter(team =>
      team.teamName.toLowerCase().includes(searchName.toLowerCase()) &&
      team.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchName, searchLocation, teams]);

  const handleAddTeam = async (e) => {
    e.preventDefault();
    const newTeam = { teamName, location, phoneNumber };

    try {
      const response = await axios.post('http://localhost:5000/api/teams', newTeam);
      const updatedTeams = [...teams, response.data];
      setTeams(updatedTeams);
      setFilteredTeams(updatedTeams);
      setShowModal(false);
      setTeamName('');
      setLocation('');
      setPhoneNumber('');
      alert('Team added successfully!');
    } catch (error) {
      console.error('Error adding team:', error);
      alert('Failed to add team.');
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2 className="fw-semibold mb-0">Teams</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          style={{ minWidth: '140px' }}
        >
          + Add Team
        </button>
      </div>
      <div className="row g-4 mb-3">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by team name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by location"
            value={searchLocation}
            onChange={e => setSearchLocation(e.target.value)}
          />
        </div>
      </div>
      <div className="table-responsive border rounded shadow-sm">
        <table className="table table-hover mb-0 align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>Team Name</th>
              <th>Location</th>
              <th>Team ID</th>
              <th>Phone Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-muted py-4">
                  No teams match the filters.
                </td>
              </tr>
            ) : (
              filteredTeams.map(team => (
                <tr key={team._id}>
                  <td className="text-start">{team.teamName}</td>
                  <td>{team.location}</td>
                  <td>{team._id}</td>
                  <td>{team.phoneNumber}</td>
                  <td>
                    <span className={`badge ${team.status === 'Inactive' ? 'bg-secondary' : 'bg-success'}`}>
                      {team.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleAddTeam}>
                <div className="modal-header">
                  <h5 className="modal-title">Add New Team</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Team Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={teamName}
                      onChange={e => setTeamName(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      required
                      pattern="[0-9+ -]{7,15}"
                      title="Enter a valid phone number"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary px-5">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-5"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
