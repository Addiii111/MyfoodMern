import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handelSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
    const jso = await response.json()
    console.log(jso)

    if (!jso.success) {
      alert('Enter valid credentials')
    }

    if (jso.success) {
      localStorage.setItem('authToken', jso.authToken)
      console.log(localStorage.getItem('authToken'))
      navigate('/')
    }
  }

  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handelSubmit}>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              name='email'
              value={credentials.email}
              onChange={onchange}
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              name='password'
              value={credentials.password}
              onChange={onchange}
            />
          </div>

          <button type='submit' className='m-3 btn btn-success'>
            Submit
          </button>
          <Link to='/signup' className='m-3 btn btn-danger'>
            I'm a new user
          </Link>
        </form>
      </div>
    </>
  )
}
