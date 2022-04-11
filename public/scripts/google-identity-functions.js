function handleCredentialResponse(googleResponse) {
   const url = 'http://localhost:1908/api/auth/google-sign-in'
   const body = { id_token: googleResponse.credential }
   const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
   }

   fetch(url, options)
      .then(response => response.json())
      .then(response => {
         console.log(response)
         localStorage.setItem('email', response.email)
      })
      .catch(error => console.log(error))
}

const logout = () => {
   google.accounts.id.revoke(localStorage.getItem('email'))
   localStorage.clear()
   location.reload()
}
