import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const { showAlert } = props;

  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
      const json = await response.json()

      if (!json.error) {
        localStorage.setItem('token', json)
        navigate('/');
        showAlert('success', 'Logged In successfully!');
      }
      else {
        showAlert('danger', json.error);
      }

    } catch (error) {
      <div>Some Error Occured</div>
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <div className='loginBody' >
        <div className="login">
          <div className="content">
            <h2>Signup</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="inputBox">
                <input type="text" id='name' name='name' value={credentials.name} onChange={onChange} required /> <i>Username</i>
              </div>
              <div className="inputBox">
                <input type="email" id='email' name='email' value={credentials.email} onChange={onChange} required /> <i>Email</i>
              </div>
              <div className="inputBox">
                <input type="password" id='password' name='password' value={credentials.password} onChange={onChange} required /> <i>Password</i>
              </div>
              <div className="links"> Already have an account? <Link to='/Login' role='button' >Signup</Link></div>
              <div className="inputBox">
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signup
