/*global window*/

// Create the state-indicator element
var indicator = document.createElement('aside');
indicator.className = 'state-indicator';
document.body.appendChild(indicator);

// Create a method which returns device state
function getDeviceState() {
  var dynamicIndicator = document.querySelector('.state-indicator'),
    state = window.getComputedStyle(dynamicIndicator, ':before').getPropertyValue('content');
  // strip extra '' from return value
  state = state.replace(/'/g, "");
  // breakpoints switch statement
  switch (state) {
  case 'break1':
    console.log('break1');
    break;
  case 'break2':
    console.log('break2');
    break;
  case 'break3':
    console.log('break3');
    break;
  default:
    console.log('no breakpoints');
  }
}
// including debounce function which should be made global
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// native document ready
document.addEventListener("DOMContentLoaded", function () {
  getDeviceState();
});

// on resize
var lastDeviceState = getDeviceState();
window.addEventListener('resize', debounce(function () {
  var state = getDeviceState();
  if (state !== lastDeviceState) {
    // Save the new state as current
    lastDeviceState = state;
  }
}, 50, true));