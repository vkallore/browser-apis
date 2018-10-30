if (1 == 2) {
  if ('credentials' in navigator) {
    navigator.credentials
      .get({
        password: true,
        federated: {
          // Specify an array of IdP strings
          providers: ['https://accounts.google.com', 'https://www.facebook.com']
        },
        mediation: 'silent'
      })
      .then(function(cred) {
        console.log(`Credentials supported ${cred}`)
        if (cred) {
          if (cred.type == 'password') {
            // Construct FormData object
            var form = new FormData()

            // Append CSRF Token
            var csrf_token = document.querySelector('csrf_token').value
            form.append('csrf_token', csrf_token)

            // You can append additional credential data to `.additionalData`
            cred.additionalData = form

            // `POST` the credential object as `credentials`.
            // id, password and the additional data will be encoded and
            // sent to the url as the HTTP body.
            fetch(url, {
              // Make sure the URL is HTTPS
              method: 'POST', // Use POST
              credentials: cred // Add the password credential object
            }).then(function() {
              // continuation
            })
          } else if (cred.type == 'federated') {
            // `provider` contains the identity provider string
            switch (cred.provider) {
              case 'https://accounts.google.com':
                // Federated login using Google Sign-In
                var auth2 = gapi.auth2.getAuthInstance()

                // In Google Sign-In library, you can specify an account.
                // Attempt to sign in with by using `login_hint`.
                return auth2
                  .signIn({
                    login_hint: cred.id || ''
                  })
                  .then(function(profile) {
                    // continuation
                  })
                break

              case 'https://www.facebook.com':
                // Federated login using Facebook Login
                // continuation
                break

              default:
                // show form
                break
            }
          }
        }
      })
  } else {
    console.log('Credentials not supported')
  }
}

document.querySelector('#loginForm').submit(function(e) {
  e.preventDefault()
  var form = document.querySelector('#loginForm')
  var cred = new PasswordCredential(form)
  // Store it
  navigator.credentials.store(cred).then(function() {
    // continuation
    console.log(cred)
  })
})

document.querySelector('#btnLoginGoogle').click(function(e) {
  e.preventDefault()
  // After a federation, create a FederatedCredential object using
  // information you have obtained
  var cred = new FederatedCredential({
    id: '81111', // The id for the user
    name: 'vaikoovery@gmail.com', // Optional user name
    provider: 'https://accounts.google.com', // A string that represents the identity provider
    iconURL: iconUrl // Optional user avatar image url
  })
  // Store it
  navigator.credentials.store(cred).then(function() {
    // continuation
  })
})
