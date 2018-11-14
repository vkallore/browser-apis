document.querySelector('#shareThisText').addEventListener('click', function(e) {
  e.preventDefault()
  if ('share' in navigator) {
    navigator
      .share({
        title: 'Sample Web Share',
        text: document.querySelector('#customTextArea').value,
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
