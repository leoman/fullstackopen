import React from 'react'
const Login = ({ username, password, setUsername, setPassword, submit }) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={submit}>
      <div>
        <label>username: </label> <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>password: </label> <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  </div>
)

export default Login