import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

function Bookingscreen({ match }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const locationid = match.params.locationid;
  const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY');
  const todate = moment(match.params.todate, 'DD-MM-YYYY');
  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get(`/api/locations/getalllocationbyid/${locationid}`)).data;
        setLocation(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, [locationid]);

  async function onToken(token) {
    console.log(token);

    const bookingDetails = {
      locationid,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totaldays,
    };

    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/booklocation", bookingDetails);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  return (
    <div className='m-5'>
      {loading ? (
        <h1><Loader /></h1>
      ) : location ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{location.name}</h1>
              <img src={location.imageurls[0]} className='bigimg' alt={location.name} />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name : </p>
                  <p>From Date : {match.params.fromdate}</p>
                  <p>To Date : {match.params.todate}</p>
                </b>
              </div>

              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : {totaldays}</p>
                  <p>Reservation : </p>
                </b>
              </div>

              <div style={{ float: 'right' }}>
                <button className='btn btn-primary' onClick={onToken}>Pay now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
