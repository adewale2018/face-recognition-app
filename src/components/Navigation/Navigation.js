import React from 'react';

const Navigation = props => {
  const { onRouteChange, name, isSignedIn } = props;
  if(isSignedIn) {
    return (
      <nav style={{display: "flex", justifyContent: "flex-end"}}>
        <p 
        onClick={() => onRouteChange('signout')}
        className="f3 link dim black underline pa3 pointer">{name}</p>
      </nav>
    )

  } else {
    return (
      <nav style={{display: "flex", justifyContent: "flex-end"}}>
        <p 
        onClick={() => onRouteChange('signin')}
        className="f3 link dim black underline pa3 pointer">Signin
        </p>
        <p 
        onClick={() => onRouteChange('register')}
        className="f3 link dim black underline pa3 pointer">Register
        </p>
      </nav>
    );
  }
  
}

export default Navigation;
