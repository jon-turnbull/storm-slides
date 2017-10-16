# Storm Slides

[![Build Status](https://travis-ci.org/mjbp/storm-slides.svg?branch=master)](https://travis-ci.org/mjbp/storm-slides)
[![codecov.io](http://codecov.io/github/mjbp/storm-slides/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-slides?branch=master)
[![npm version](https://badge.fury.io/js/storm-slides.svg)](https://badge.fury.io/js/storm-slides)

Accessible image lazyloading slides/carousel/fader component.

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

## Options
```
{
    callback: null
}
```

e.g.
```
Slides.init('.js-selector', {
    callback(){
        console.log(this);
    }
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