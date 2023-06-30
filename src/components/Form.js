import React, { useState } from 'react';
import regbg from '../Assets/regbg.jpg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Dashboard from './dashboard';

export default function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // new state variable
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    console.log(data);

    axios.post('https://dispensary-appbackend-loonslab-95328c0b6899.herokuapp.com/api/', data)
      .then(response => {
        console.log('Response status code:', response.status);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then(data => {
        console.log('Registration successful:', data);
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  };

  const onLoginSubmit = (data) => {
    console.log(JSON.stringify(data));
    console.log(data);

    // handle login form submission here
    axios.post('https://dispensary-appbackend-loonslab-95328c0b6899.herokuapp.com/api/login', data)
    .then(response => {
      console.log('Response status code:', response.status);
      if (response.data.success == 1) {
        setIsLoggedIn(true); // set isLoggedIn to true if login is successful
        console.log('login successful:', data);
      }else{
        console.log('Invalid login credentials');
      }
      
    })
    
    .catch(error => {
      console.error('Error login user:', error);
    });
  };

  // render the dashboard component if isLoggedIn is true, otherwise render the login/registration form
  return (
    <section>
      {isLoggedIn ? (
        <Dashboard/>
      ) : (
        <div className='register'>
          <div className='col-1'>
            <h2>{showLoginForm ? 'Sign In' : 'Sign Up'}</h2>
            {showLoginForm ? (
              <span>Enter your login details below.</span>
            ) : (
              <span>Register now to book appointments and manage your medical needs at our dispensary.</span>
            )}

            {showLoginForm ? (
              <form id='form' className='flex flex-col' onSubmit={handleSubmit(onLoginSubmit)}>
                {/* login form fields here */}
                <input type='text' {...register("email", { required: true })} placeholder='Email' />
                {errors.email && <span style={{ color: 'red' }}>This field is required</span>}
                <input type='password' {...register("password", { required: true })} placeholder='Password' />
                {errors.password && <span style={{ color: 'red' }}>This field is required</span>}
                <button className='btn' type='submit'>Log In</button>
              </form>
            ) : (
              <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                {/* registration form fields here */}
                <input type='text' {...register("firstname")} placeholder='First name' />
                <input type='text' {...register("lastname")} placeholder='Last name' />
                <input type='text' {...register("mobile", { required: true })} placeholder='Mobile number' />
                {errors.mobile && <span style={{ color: 'red' }}>This field is required</span>}
                <input type='text' {...register("email", { required: true })} placeholder='Email' />
                {errors.email && <span style={{ color: 'red' }}>This field is required</span>}
                <input type='password' {...register("password")} placeholder='Password' />
                <input type='password' {...register("cpassword", { required: true })} placeholder='Confirm Password' />
                {errors.cpassword && <span style={{ color: 'red' }}>This field is required</span>}
                <input type='file' accept='image/*' />

                <button className='btn' type='submit'>Sign Up</button>
              </form>
            )}

            <p>{showLoginForm ? 'Don\'t have an account?' : 'Already have an account?'} <a href='#' onClick={() => setShowLoginForm(!showLoginForm)}>{showLoginForm ? 'Sign Up' : 'Sign In'}</a></p>
          </div>
          <div className='col-2'>
            <img src={regbg} alt='registration background' />
          </div>
        </div>
      )}
    </section>
  );
}