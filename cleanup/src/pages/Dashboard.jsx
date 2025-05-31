import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await axios.get('http://localhost:5000/api/report/get-reports');
      const assigned = data.find((r) => r.assignedTeam === teamId && r.status.includes('Assigned'));
      setTask(assigned || null);
    };
    fetchTask();
  }, [teamId]);

  const handleComplete = async () => {
    await axios.post('http://localhost:5000/api/report/complete', {
      reportId: task._id,
      teamId
    });
    alert('Marked as completed');
    setTask(null);
  };

  const handleGuide = () => {
    if (!task) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${task.latitude},${task.longitude}`,
            '_blank'
          );
        },
        () => {
          window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${task.latitude},${task.longitude}`,
            '_blank'
          );
        }
      );
    } else {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${task.latitude},${task.longitude}`,
        '_blank'
      );
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#2c3e50" }}>
        <div className="container-fluid px-4">
          <span style={{color:'#f8c471'}} className="navbar-brand fw-bold">Cleanup Team </span>
          <div className="d-flex align-items-center ms-auto">
            <span style={{color:'#f8c471'}} className=" me-3 fw-medium">Team ID: {teamId}</span>
            <button style={{color:'#f8c471'}} className="btn btn-outline-dark btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container-fluid" style={{ backgroundColor: "#f0f7f4", minHeight: "100vh", paddingTop: "100px" }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            {task ? (
              <div className="card shadow-sm rounded p-4 bg-white">
                <h5 className="mb-3 text-primary">Assigned Cleanup Task</h5>
                <p><strong>Location:</strong> {task.location}</p>
                <p><strong>Waste Type:</strong> {task.wasteType}</p>
                <p><strong>Description:</strong> {task.description}</p>

                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-outline-primary w-50 me-3" onClick={handleGuide}>
                    Get Directions
                  </button>
                  <button className="btn btn-success w-50" onClick={handleComplete}>
                    Mark Completed
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center mt-5">
                <h5 className="text-secondary">No active task assigned.</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

