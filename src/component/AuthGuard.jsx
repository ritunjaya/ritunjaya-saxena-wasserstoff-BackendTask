import React from 'react'

const AuthGuard = ({children}) => {

  const token = localStorage.getItem('token')
  if (!token) {
        window.location.href = '/login'
  }

  return (
        <React.Fragment>        
        {children}
        </React.Fragment>
  )
}

export default AuthGuard;