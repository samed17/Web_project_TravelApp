import React, { useState } from "react";
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';


function Registerscreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword
      };

      try {
        setLoading(true);
        await axios.post('/api/users/register', user);
        setLoading(false);
        

        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error.response?.data?.message || 'Something went wrong');
      }
    } else {
      alert('Passwords not matched');
    }
  }

  return (
    <div>
      {loading && (<Loader />)}
      {error && (<Error message={error} />)}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
         
          <div className="bs">
            <h2>Register</h2>
            <input type="text" className="form-control" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} />
            <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" className="form-control" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <input type="password" className="form-control" placeholder="confirm password" value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} />

            <button className="btn btn-primary" onClick={register}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
