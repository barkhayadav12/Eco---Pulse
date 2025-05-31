import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ReportTable = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterWasteType, setFilterWasteType] = useState('');
  const [filterTeam, setFilterTeam] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/report/get-reports');
        setReports(res.data);
        setFilteredReports(res.data);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
        toast.error('Failed to fetch reports');
      }
    };
    fetchReports();
  }, []);

  const uniqueStatuses = [...new Set(reports.map(r => r.status).filter(Boolean))];
  const uniqueLocations = [...new Set(reports.map(r => r.location).filter(Boolean))];
  const uniqueWasteTypes = [...new Set(reports.map(r => r.wasteType).filter(Boolean))];
  const uniqueTeams = [...new Set(reports.map(r => r.team || '').filter(Boolean))];

  useEffect(() => {
    let filtered = reports;

    if (filterStatus) {
      filtered = filtered.filter(r => r.status === filterStatus);
    }
    if (filterLocation) {
      filtered = filtered.filter(r => r.location === filterLocation);
    }
    if (filterWasteType) {
      filtered = filtered.filter(r => r.wasteType === filterWasteType);
    }
    if (filterTeam) {
      filtered = filtered.filter(r => (r.team || '') === filterTeam);
    }

    setFilteredReports(filtered);
  }, [filterStatus, filterLocation, filterWasteType, filterTeam, reports]);

  const handleAssignTeam = async (reportId) => {
    const teamId = window.prompt('Enter team ID to assign:');
    if (teamId) {
      try {
        await axios.post('http://localhost:5000/api/report/assign', { reportId, teamId });
        toast.success('Team assigned successfully');
        const res = await axios.get('http://localhost:5000/api/report/get-reports');
        setReports(res.data);
      } catch (error) {
        toast.error('Failed to assign team');
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="row mb-3 g-3">
        <div className="col-sm-6 col-md-3">
          <label htmlFor="filterStatus" className="form-label">Filter by Status</label>
          <select
            id="filterStatus"
            className="form-select"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="col-sm-6 col-md-3">
          <label htmlFor="filterLocation" className="form-label">Filter by Location</label>
          <select
            id="filterLocation"
            className="form-select"
            value={filterLocation}
            onChange={e => setFilterLocation(e.target.value)}
          >
            <option value="">All</option>
            {uniqueLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="col-sm-6 col-md-3">
          <label htmlFor="filterWasteType" className="form-label">Filter by Waste Type</label>
          <select
            id="filterWasteType"
            className="form-select"
            value={filterWasteType}
            onChange={e => setFilterWasteType(e.target.value)}
          >
            <option value="">All</option>
            {uniqueWasteTypes.map(wt => (
              <option key={wt} value={wt}>{wt}</option>
            ))}
          </select>
        </div>

        <div className="col-sm-6 col-md-3">
          <label htmlFor="filterTeam" className="form-label">Filter by Team</label>
          <select
            id="filterTeam"
            className="form-select"
            value={filterTeam}
            onChange={e => setFilterTeam(e.target.value)}
          >
            <option value="">All</option>
            {uniqueTeams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col" style={{ width: '100px' }}>Image</th>
              <th scope="col">Location</th>
              <th scope="col">Waste Type</th>
              <th scope="col">Status</th>
              <th scope="col">Team</th>
              <th scope="col">Assign Team</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No reports available.</td>
              </tr>
            ) : (
              filteredReports.map(report => (
                <tr key={report._id}>
                  <td>
                    {report.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${report.image}`}
                        alt="Report"
                        style={{ maxWidth: '80px', maxHeight: '80px', objectFit: 'cover', borderRadius: '5px' }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>{report.location}</td>
                  <td>{report.wasteType}</td>
                  <td>{report.status}</td>
                  <td>{report.assignedTeam}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAssignTeam(report._id)}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ReportTable;
