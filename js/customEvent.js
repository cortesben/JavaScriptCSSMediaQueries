// custom event polyfill for IE9 - IE10
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


// native syntax

// creating custom events

// Use new CustomEvent contstructor
var breakPoint1 = new CustomEvent("breakpont1", {
  bubbles: true,
  cancelable: false
});

// Dispatch event
document.dispatchEvent(breakPoint1);

// Listen for event
document.on("breakpont1", function (){
  // run code inside event listener
});