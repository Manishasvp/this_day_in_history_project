import React, { useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [date, setDate] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHistory = () => {
    if (!date) {
      setError('Please select a valid date.');
      return;
    }

    setLoading(true);
    setError('');
    setYearFilter('');

    const [year, month, day] = date.split('-');
    fetch(`https://history.muffinlabs.com/date/${month}/${day}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch data.');
        return response.json();
      })
      .then((data) => {
        const reversedEvents = [...data.data.Events].reverse();
        setEvents(reversedEvents);
        setFilteredEvents(reversedEvents);
      })
      .catch((err) => {
        setError('Something went wrong. Try again.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleYearSearch = () => {
    if (!yearFilter.trim()) {
      setFilteredEvents(events);
      return;
    }
    const filtered = events.filter((event) => event.year.includes(yearFilter.trim()));
    setFilteredEvents(filtered);
  };

  const clearFilter = () => {
    setYearFilter('');
    setFilteredEvents(events);
  };

  return (
    <div
      style={{
        backgroundImage: `url("/image2.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontFamily: 'Georgia, serif',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '95%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#5a3e1b' }}>
          🕰️ This Day in History
        </h2>

        <div className="row align-items-center mb-4">
          <label className="col-sm-3 col-form-label fw-bold ">
            📅 Select a Date to search:
          </label>
          <div className="col-sm-6">
            <input
              type="date"
              className="form-control"
              style={{
                backgroundColor: '#fdf6e3',
                border: '1px solid #b8860b',
                color: '#3e2f14',
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-sm-3">
            <button
              className="btn w-100"
              style={{
                backgroundColor: '#c19a6b',
                color: 'white',
                fontWeight: 'bold',
              }}
              onClick={fetchHistory}
            >
              🔍 Fetch History
            </button>
          </div>
        </div>

        {events.length > 0 && (
          <div className="row align-items-center mb-3">
            <label className="col-sm-3 col-form-label fw-bold">🔎 Filter by Year:</label>
            <div className="col-sm-4">
              <input
                type="text"
                placeholder="Enter year like 1990"
                className="form-control"
                style={{
                  backgroundColor: '#fdf6e3',
                  border: '1px solid #b8860b',
                  color: '#3e2f14',
                }}
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              />
            </div>
            <div className="col-sm-2">
              <button
                className="btn w-100"
                style={{
                  backgroundColor: '#8f6d4e',
                  color: 'white',
                  fontWeight: 'bold',
                }}
                onClick={handleYearSearch}
              >
                🔍 Search
              </button>
            </div>
            <div className="col-sm-3">
              <button
                className="btn w-100"
                style={{
                  backgroundColor: '#999',
                  color: 'white',
                  fontWeight: 'bold',
                }}
                onClick={clearFilter}
              >
                ❌ Clear Filter
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center text-secondary">⏳ Loading events...</div>
        )}

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {filteredEvents.length > 0 && (
          <>
            <h5 className="mb-3" style={{ color: '#4b2e0c' }}>
              🗓️ Historical Events:
            </h5>
            <div className="row">
              {filteredEvents.map((event, index) => (
                <div className="col-12 col-sm-6 col-lg-3 mb-4" key={index}>
                  <div
                    className="card h-100"
                    style={{
                      backgroundColor: '#fffaf0',
                      border: '1px solid #deb887',
                      borderRadius: '10px',
                      boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div className="card-body d-flex flex-column">
                      <h6
                        className="card-title mb-2"
                        style={{ color: '#6b4226' }}
                      >
                        📌 {event.year}
                      </h6>
                      <p
                        className="card-text"
                        style={{
                          textAlign: 'justify',
                          color: '#3e2f14',
                          fontSize: '14px',
                        }}
                      >
                        {event.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
