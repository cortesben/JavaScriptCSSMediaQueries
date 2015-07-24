# A JavaScript Media Query Finder
A Simple JavaScript and CSS media query sync tool

Tool is still under development.

##How it works
First include your `main.js` above `mediaQueryFinder.js`. Then `mediaQueryFinder.js` uses getComputedStyles and reads a pseudo-content value from the CSS to sync the JS and media queries. This content value is then passed into a switch statement and if the pseudo-content value matches the case it fires an event such as `breakpoint1`. This is where main.js comes in, this file has event listeners looking for these events to fire. Once they fire new JS can be executed. It's a very simple and so far effective way to sync media queries with JavaScript events.