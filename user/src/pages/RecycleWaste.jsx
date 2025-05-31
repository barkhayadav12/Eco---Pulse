import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FaPhoneAlt, FaMapMarkerAlt, FaRecycle } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const AGENCIES = [
  {
    id: 1,
    name: "Green Cycle Co.",
    description:
      "Specializing in household and electronic waste recycling with prompt doorstep pickup services.",
    address: "Eco Street 101, Greenfield City",
  },
  {
    id: 2,
    name: "Clean Earth Initiative",
    description:
      "Committed to sustainable recycling of plastics, metals, and paper waste. Fast and reliable service.",
    address: "Planet Way 202, Renew Town",
  },
];

export default function RequestRecycle({ loggedInUserEmail }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [form, setForm] = useState({ items: '', address: '', phone: '' });
  const [status, setStatus] = useState(null);

  const openModalForAgency = (agency) => {
    setSelectedAgency(agency);
    setForm({ items: '', address: '', phone: '' });
    setStatus(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/recycle/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          agencyName: selectedAgency.name,
          items: form.items,
          address: form.address,
          phone: form.phone,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setForm({ items: '', address: '', phone: '' });
        setShowModal(false);
        setStatus('Recycling request sent successfully.');
      } else {
        toast.error(result.message);
        setStatus('Failed to send recycling request.');
      }
    } catch (error) {
      toast.error('Something went wrong.');
      setStatus('Something went wrong.');
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
      <style>{`
        .agency-section {
          padding: 2rem 1rem;
          background: #f0f7f4;
        }

        .agency-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .agency-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #27ae60;
        }

        .cards-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .card-custom {
          background: white;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          max-width: 500px;
          width: 100%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-title-custom {
          font-size: 1.75rem;
          font-weight: 700;
          color: #2c3e50;
        }

        .card-text-custom {
          color: #555;
          margin: 1rem 0;
          font-size: 1.05rem;
        }

        .address-text {
          font-size: 0.95rem;
          color: #34495e;
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .btn-request {
          background: #27ae60;
          color: white;
          font-weight: 600;
          padding: 0.6rem 1.5rem;
          border-radius: 30px;
          border: none;
          align-self: flex-start;
          transition: background 0.3s ease;
        }

        .btn-request:hover {
          background: #1e8449;
        }

        .modal-content-custom {
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          padding: 2rem;
        }

        .modal-header-custom {
          border-bottom: none;
          font-weight: 700;
          font-size: 1.5rem;
          color: #27ae60;
        }

        .form-control {
          font-size: 1rem;
          border-radius: 8px;
        }

        .modal-footer {
          border-top: none;
        }
      `}</style>

      <div className="agency-section">
        <div className="agency-header">
          <h1>Recycling Agencies</h1>
          <p className="text-secondary">Request eco-friendly recycling services near you.</p>
        </div>

        <div className="cards-container">
          {AGENCIES.map((agency) => (
            <div key={agency.id} className="card card-custom">
              <div>
                <h2 className="card-title-custom">{agency.name}</h2>
                <p className="card-text-custom">{agency.description}</p>
                <p className="address-text">
                  <FaMapMarkerAlt className="me-2 text-success" />
                  {agency.address}
                </p>
              </div>
              <button
                className="btn-request"
                onClick={() => openModalForAgency(agency)}
              >
                Request Recycling
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedAgency && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content modal-content-custom">
              <div className="modal-header modal-header-custom">
                <h5 className="modal-title">Request Recycling from {selectedAgency.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="items" className="form-label">
                      <FaRecycle className="me-2 text-success" />
                      Items to Recycle
                    </label>
                    <textarea
                      className="form-control"
                      id="items"
                      rows="3"
                      required
                      placeholder="e.g. plastic bottles, old electronics..."
                      value={form.items}
                      onChange={(e) =>
                        setForm({ ...form, items: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      <FaMapMarkerAlt className="me-2 text-success" />
                      Your Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      required
                      placeholder="Enter your pickup address"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      <FaPhoneAlt className="me-2 text-success" />
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      required
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </div>
                  {status && <div className="alert alert-info">{status}</div>}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
