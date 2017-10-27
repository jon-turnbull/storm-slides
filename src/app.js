import Slides from './libs/component';

const onDOMContentLoadedTasks = [() => {
    Slides.init('.js-slides');
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });