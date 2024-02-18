import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Location from '../components/Location';

function Homescreen() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchkey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/locations/getalllocations');
        setLocations(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterBySearch() {
    const tempLocations = locations.filter(location =>
      location.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setLocations(tempLocations);
  }

  function filterByType(e) {
    if (e !== 'all') {
      const tempLocations = locations.filter(
        location => location.type.toLowerCase() === e.toLowerCase()
      );
      setLocations(tempLocations);
    } else {
      setLocations(locations);
    }
  }

  return (
    <div className="container">
      <div className='row mt-5'>
        <div className='col-md-5'>
          <input
            type="text"
            className='form-control'
            placeholder='search locations'
            value={searchkey}
            onChange={(e) => { setSearchKey(e.target.value) }}
            onKeyUp={filterBySearch}
          />
          <div className='col-md-5'>
            <select
              className='form-control'
              value={type}
              onChange={(e) => { setType(e.target.value); filterByType(e.target.value) }}
            >
              <option value="all">All</option>
              <option value="free">Free</option>
              <option value="not-free">Not-Free</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : locations.length > 0 ? (
          locations.map((location) => (
            <div key={location._id} className="col-md-9 mt-3">
              <Location location={location} />
            </div>
          ))
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
