import React, { useState } from 'react';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Location({ location, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        {location.urls && location.urls.length > 0 && (
          <img src={location.urls[0]} alt="Location Image" className="smallimg" />
        )}
      </div>
      <div className="col-md-7">
        <h1>{location.name}</h1>
        <h1>{location.country}</h1>
        <h1>{location.price}</h1>
        <p>{location.type}</p>

        <div style={{ float: 'right' }}>
          {(fromdate && todate) && (
            <Link to={`/book/${location._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary">Book now</button>
            </Link>
          )}

          <button className="btn btn-primary" onClick={handleShow}>View Details</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{location.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel='' nextLabel=''>
            {location.imageurls.map(url => (
              <Carousel.Item key={url}>
                <img className='d-block w-100 bigimage' src={url} alt={`Location ${location.name}`} />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{location.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Location;
