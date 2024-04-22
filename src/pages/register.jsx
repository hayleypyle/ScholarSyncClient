import React, { useState, } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import './css/login.css'



export default function Register() {
    const [values, setValues]= useState({
        fname: '',
        lname: '',
        email: '',
        uname: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('');


    const navigate = useNavigate();

    function validatePassword(password) {
        // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
        const passwordReqs = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordReqs.test(password);
    }
    

    const handleSubmit =(event) =>{
            event.preventDefault();
            if (values.password !== values.confirmPassword) {
                setError("Passwords don't match");
                return;
            }
            if (!validatePassword(values.password)) {
                setError("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character");
                return;
            }
            axios.post("https://ss-heroku-525fdd4cee69.herokuapp.com/register", values)
            .then(res =>{
                navigate('/')
                
            })
            .catch(err => {
                if (err.response && err.response.data){
                    setError(err.response.data.error);
                } else{
                    setError("An error occurred. Please try again later.")
                }
})};
        
            
    

    return (
        <div className="register-container">
        <h3>Sign Up for Scholar Sync!</h3>
        
        <form action="" onSubmit={handleSubmit}>
        <div className="form-container" id="register">
            <div className="form-input" id="register">
            <label>First Name</label>
            <input type="text" onChange = {e=>setValues({...values, fname: e.target.value})} required></input>
            </div>

            <div className="form-input" id="register">
            <label>Last Name</label>
            <input type="text" onChange = {e=>setValues({...values, lname: e.target.value})} required></input>
            </div>

            <div className="form-input" id="register">
            <label>Email</label>
            <input type="email" onChange = {e=>setValues({...values, email: e.target.value})} required></input>
            </div>

            <div className="form-input" id="register">
            <label>Username</label>
            <input type="text" onChange = {e=>setValues({...values, uname: e.target.value})} required></input>
            </div>

            <div className="form-input" id="register">
            <label>Password</label>
            <input type="password" onChange= {e => setValues({...values, password: e.target.value})} required></input>
    
            </div>
        
            <div className="form-input" id="register">
            <label>Confirm Password</label>
            <input type="password" onChange={ e => setValues({...values, confirmPassword: e.target.value})} required></input>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="signUp">
            <div id="tandc">
            By clicking sign up, you agree to our terms and conditions.
            </div>
            <button className="signUp-btn">Sign Up</button>
            </div>
        
        </div>
        </form>
        
        
        <div className="no-register">
        <p>Already have an account?</p>
        <Link to ="/" className="reg-button">Login</Link>
        </div>
        </div>
    )
}
