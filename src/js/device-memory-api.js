const memoryContainer = document.querySelector('#memoryContainer')
if ('deviceMemory' in navigator) {
  const deviceMemory = navigator.deviceMemory
  let applause = 'Sad!'
  if (deviceMemory >= 6) {
    applause = 'Great! Your system has good RAM!'
  } else if (deviceMemory >= 4) {
    applause = 'Okay! You may consider upgrading your system!'
  } else {
    applause = 'Sorry! You must seriously upgrade your system!'
  }
  memoryContainer.innerHTML = `Your Device RAM is ${deviceMemory} GB. ${applause}`
} else {
  memoryContainer.innerHTML = `Your Device doesn't support <em>"Device Memory"</em> feature`
}
