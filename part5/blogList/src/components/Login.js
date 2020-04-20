import React from 'react'
const Login = ({ username, password, setUsername, setPassword, submit }) => (
  <div>
    <h2>Login</h2>
    <form id="login" onSubmit={submit}>
      <div>
        <label>username: </label> <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>password: </label> <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button id="login-button">Login</button>
      </div>
    </form>
  </div>
)

export default Login