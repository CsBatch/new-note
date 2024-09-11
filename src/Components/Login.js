import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {

    const { showAlert } = props;
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (!json.error) {
                localStorage.setItem('token', json)
                navigate('/');
                showAlert('success', 'Logged In successfully!');
            }
            else {
                setCredentials({ email: '', password: '' })
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
                        <h2>Login</h2>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input type="text" id='email' name='email' value={credentials.email} onChange={onChange} required /> <i>Email</i>
                            </div>
                            <div className="inputBox">
                                <input type="password" id='password' name='password' value={credentials.password} onChange={onChange} required /> <i>Password</i>
                            </div>
                            <div className="links"> Don't have an account? <Link to='/Signup' role='button' >Signup</Link></div>
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

export default Login
