document.querySelector('#shareThisText').addEventListener('click', function(e) {
  e.preventDefault()
  console.log(location.protocol)
  if ('share' in navigator) {
    console.log(navigator)
    navigator
      .share({
        title: 'Sample Web Share',
        text: 'Text to share on webshare api',
        url: location.href
      })
      .then(function() {
        console.log('Successful share')
      })
      .catch(function(err) {
        console.log(`Share failed ${err}`)
      })
  } else if (location.protocol !== 'https:') {
    alert('Sorry, the website must be HTTPS. Try again!')
  } else {
    alert("Sorry, your browser doesn't support this! Try from mobile")
  }
})
