import React from 'react'
import { Button } from '@mui/material'
import "./Login.css"
import { auth, provider } from './firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        // Use Firebase Authentication to sign in with Google
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                dispatch({
                    type: actionTypes.SET_USER,
                    user: user,
                })

  }).catch((error) => {
      alert(error.message)
  });
    };
    
    
  return (
      <div className='login'>
          <div className='login_container'>
              <img 
                  src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqUSoRguoVMuSOyZ-gV6g7RB3ib_X6-1cn4A&usqp=CAU"
                  alt = ""
              />
              <div className='login_text'>
                  <h1>Sign in to Chat App</h1>
              </div>
              <Button type= "submit" onClick={signIn}>
                  Sign in with Google
              </Button>
          </div>
      </div>
  )
}

export default Login