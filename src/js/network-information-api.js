const connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection
let conType
if (typeof connection !== 'undefined') {
  conType = connection.type || connection.effectiveType
  function connectionUpdated() {
    const newConType = connection.type || connection.effectiveType
    console.log(`Connection changed from ${conType} to ${newConType}`)
    conType = newConType
  }

  connection.addEventListener('change', connectionUpdated)
}
