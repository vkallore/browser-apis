var hasCredentials = 'credentials' in navigator
if (hasCredentials) {
  navigator.credentials
    .get({
      password: true,
      federated: {
        // Specify an array of IdP strings
        providers: ['https://accounts.google.com', 'https://www.facebook.com']
      }
    })
    .then(function(cred) {
      console.log(cred)
      if (cred) {
        if (cred.type == 'password') {
          // Construct FormData object
          var form = new FormData()

          // Append CSRF Token
          var csrf_token = document.getElementsByName('csrf_token').value
          form.append('csrf_token', csrf_token)

          // You can append additional credential data to `.additionalData`
          cred.additionalData = form

          // `POST` the credential object as `credentials`.
          // id, password and the additional data will be encoded and
          // sent to the url as the HTTP body.
          // validate
          console.log('Password re-validate with API request')
          fetch('YOUR_LOGIN_URL', {
            // Make sure the URL is HTTPS
            method: 'POST', // Use POST
            credentials: cred // Add the password credential object
          }).then(function() {
            // Password check status, throw error if login failed
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

            case 'https://www.facebook.com':
              // Federated login using Facebook Login
              // continuation
              break

            default:
              // normal login - show form
              break
          }
        }
      }
    })
} else {
  console.log('Credentials not supported')
}

document.querySelector('#loginForm').addEventListener('submit', function(e) {
  e.preventDefault()
  var form = document.querySelector('#loginForm')
  if (hasCredentials) {
    var cred = new PasswordCredential(form)
    // Store/update it
    navigator.credentials.store(cred).then(function() {
      // continuation, proceed with login
      console.log('Your credential is being stored/updated')
    })
  } else {
    alert('Credentials not supported, proceeding with normal login')
  }
})

document
  .querySelector('#btnLoginGoogle')
  .addEventListener('click', function(e) {
    e.preventDefault()
    if (hasCredentials) {
      // After a federation, create a FederatedCredential object using

      // information you have obtained
      var cred = new FederatedCredential({
        id: 'EMAIL_ID_OR_ANY_ID', // The id for the user
        name: 'NAME_OF_USER', // Optional user name
        provider: 'https://accounts.google.com', // A string that represents the identity provider
        iconURL: '' // Optional user avatar image url
      })
      // Store it
      navigator.credentials.store(cred).then(function() {
        // continuation
      })
    }
  })

function init() {
  gapi.load('auth2', function() {
    gapi.auth2.init({
      clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
      scope: 'fetch_basic_profile'
    })
  })
}
