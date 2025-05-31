import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


function ReportDump() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: "",
    latitude: "",
    longitude: "",
    wasteType: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:5000/api/report", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Report submitted!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Submission failed!");
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          maxWidth: "500px",
          marginTop: "1rem",
          padding: "1rem",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div className="card shadow-sm rounded-4">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="location" className="form-label fw-semibold">
                  Location (Manual)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="mb-3 d-flex gap-2 align-items-end">
                <div className="flex-grow-1">
                  <label htmlFor="latitude" className="form-label fw-semibold">
                    Latitude
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>
                <div className="flex-grow-1">
                  <label htmlFor="longitude" className="form-label fw-semibold">
                    Longitude
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGetLocation}
                  style={{ height: "38px", minWidth: "70px" }}
                  title="Get Current Location"
                >
                  Get
                </button>
              </div>

              <div className="mb-3">
                <label htmlFor="wasteType" className="form-label fw-semibold">
                  Type of Waste
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="wasteType"
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleChange}
                  placeholder="Enter waste type"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-semibold">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the issue"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label fw-semibold">
                  Upload Image (optional)
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <button type="submit" className="btn btn-dark w-100 fw-semibold fs-5">
                Submit Report
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default ReportDump;
