/*global window*/

// custom event polyfill for IE9 - IE10 from Mozilla
(function () {
  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
   };
  CustomEvent.prototype = window.CustomEvent.prototype;
  window.CustomEvent = CustomEvent;
})();

// Custom Event copy function
function EventCopy(breakpoint){
  return CustomEvent(breakpoint, {
    bubbles: true,
    cancelable: false
  });
}
// breakpoints
var breakPoint1 = new EventCopy("breakpont1"),
  breakPoint2 = new EventCopy("breakpont2"),
  breakPoint3 = new EventCopy("breakpont3");

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
    document.dispatchEvent(breakPoint1);
    break;
  case 'break2':
    document.dispatchEvent(breakPoint2);
    break;
  case 'break3':
    document.dispatchEvent(breakPoint3);
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

  // on resize
  var lastDeviceState = getDeviceState();
  window.addEventListener('resize', debounce(function () {
    var state = getDeviceState();
    if (state !== lastDeviceState) {
      // Save the new state as current
      lastDeviceState = state;
    }
  }, 50, true));

});