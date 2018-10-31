/**
 * Original Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

var prevRatio = 0.0
var increasingColor = 'rgba(40, 40, 190, ratio)'
var decreasingColor = 'rgba(190, 40, 40, ratio)'

// Set things up.

window.addEventListener(
  'load',
  function(event) {
    observerElements = document.querySelectorAll('.observer img')
    observerElements.forEach(function(observerElement) {
      createObserver(observerElement)
    })
  },
  false
)
function createObserver(observerElement) {
  var options = {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList()
  }

  var observer = new IntersectionObserver(handleIntersect, options)
  observer.observe(observerElement)
}
function buildThresholdList() {
  var thresholds = []
  var numSteps = 20

  for (var i = 1.0; i <= numSteps; i++) {
    var ratio = i / numSteps
    thresholds.push(ratio)
  }

  thresholds.push(0)
  return thresholds
}
function handleIntersect(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor.replace(
        'ratio',
        entry.intersectionRatio
      )
    } else {
      entry.target.style.backgroundColor = decreasingColor.replace(
        'ratio',
        entry.intersectionRatio
      )
    }

    var toFixed = (entry.intersectionRatio * 100).toFixed(2)
    var images = []
    if (entry.target.nodeName.toUpperCase() !== 'IMG') {
      images = entry.target.querySelectorAll('img')
    } else {
      images.push(entry.target)
    }
    if (toFixed > 0) {
      images.forEach(function(img) {
        var dataSrc = img.getAttribute('data-src')
        if (
          img.src !== dataSrc ||
          (typeof conType !== 'undefined' &&
            typeof newConType !== 'undefined' &&
            conType !== newConType &&
            ['2g', 'cellular'].indexOf(newConType) === -1)
        ) {
          /* Just an example to handle image src on low speed, without service worker */
          if (
            typeof conType !== 'undefined' &&
            ['2g', 'cellular'].indexOf(conType) !== -1
          ) {
            dataSrc += '&blur'
          }
          img.src = dataSrc
        }
      })
    }
    var observerIntRatio = entry.target.querySelector('#observerIntRatio')
    if (typeof observerIntRatio !== undefined && observerIntRatio !== null) {
      observerIntRatio.innerHTML = toFixed + '%'
    }

    prevRatio = entry.intersectionRatio
  })
}
