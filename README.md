# Storm Slides

[![Build Status](https://travis-ci.org/mjbp/storm-slides.svg?branch=master)](https://travis-ci.org/mjbp/storm-slides)
[![codecov.io](http://codecov.io/github/mjbp/storm-slides/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-slides?branch=master)
[![npm version](https://badge.fury.io/js/storm-slides.svg)](https://badge.fury.io/js/storm-slides)

Slides/carousel/fader/slider component. Accessible, lazy-loading image content, multi-panel content area with between-slide transitions.

## Example
[https://mjbp.github.io/storm-slides](https://mjbp.github.io/storm-slides)

## Usage
HTML
```
<div class="js-slides">
    <div class="js-slides__list">
        <div class="js-slides__item">
            <img data-src="http://lorempixel.com/400/200">
        </div>
        <div class="js-slides__item">
            <img data-src="http://lorempixel.com/400/200">
        </div>
        <div class="js-slides__item">
            <img data-src="http://lorempixel.com/400/200">
        </div>
        <div class="js-slides__item">
            <img data-src="http://lorempixel.com/400/200">
        </div>
    </div>
    <button class="js-slides__previous">Previous</button>
    <button class="js-slides__next">Next</button>
    <ul>
        <li><button class="js-slides__nav-item">1</button></li>
        <li><button class="js-slides__nav-item">2</button></li>
        <li><button class="js-slides__nav-item">3</button></li>
        <li><button class="js-slides__nav-item">4</button><li>
    </ul>
    <div aria-live="polite" aria-atomic="true" class="visuallyhidden js-slides__liveregion"></div>
</div>
```

JS
```
npm i -S storm-slides
```
either using es6 import
```
import Slides from 'storm-slides';

Slides.init('.js-slides');
```
asynchronous browser loading (use the .standalone version in the /dist folder) using the global name (Storm + capitalised package name)
```
import Load from 'storm-load';

Load('{{path}}/storm-component-boilerplate.standalone.js')
    .then(() => {
        StormSlides.init('.js-slides');
    });
```

CSS
Basic CSS to support fading transition
```
.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}
.js-slides {
    position: relative;
}
.js-slides__list {
    position: relative;
    overflow: hidden;
}
.js-slides__item {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
.js-slides__item.is--current {
    visibility: visible;
    position: relative;
}
.js-slides__item.hide--previous,
.js-slides__item.hide--next {
  visibility: visible;
  z-index: 2;
  -webkit-animation: fadeOut 450ms cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  -moz-animation: fadeOut 450ms cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  -ms-animation: fadeOut 450ms cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  animation: fadeOut 450ms cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}

@-webkit-keyframes fadeOut {
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
@-moz-keyframes fadeOut {
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
@-ms-keyframes fadeOut {
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
@keyframes fadeOut {
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
```

## Options
```
{
    callback: null,
    autoPlay: bool,
    slideDuration: int (duration in seconds, default is 5)
}
```

e.g.
```
Slides.init('.js-selector', {
    callback(){
        console.log(this);
    },
    autoPlay: true,
    slideDuration: 3
});
```

## Tests
```
npm run test
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends upon Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfills for Array functions and eventListeners.

## Dependencies
None

## License
MIT

## Credits
Redeveloped from an initial fork of Wallop(https://github.com/peduarte/wallop/)