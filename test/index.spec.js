import should from 'should';
import 'jsdom-global/register';
import Slides from '../dist/storm-slides.standalone';

const html = `<div class="js-slides">
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
                </div>`;

document.body.innerHTML = html;

let SlidesBasic = Slides.init('.js-slides');

describe('Initialisation', () => {
  
	it('should return array of slides', () => {
		should(SlidesBasic)
		.Array()
		.and.have.lengthOf(1);
	});

	// it('should throw an error if no elements are found', () => {
	// 	SlidesBasic.init.bind(SlidesBasic, '.js-err').should.throw();
	// });
	
	it('each array item should be an object with the correct properties', () => {
		SlidesBasic[0].should.be.an.instanceOf(Object).and.not.empty();
		SlidesBasic[0].should.have.property('node');
		SlidesBasic[0].should.have.property('settings').Object();
        SlidesBasic[0].should.have.property('slides').Array();
		SlidesBasic[0].should.have.property('init').Function();
		SlidesBasic[0].should.have.property('initHandlers').Function();
		SlidesBasic[0].should.have.property('loadImages').Function();
		SlidesBasic[0].should.have.property('next').Function();
		SlidesBasic[0].should.have.property('previous').Function();
		SlidesBasic[0].should.have.property('change').Function();
	});

    it('should set zero index slide as default', () => {
		SlidesBasic[0].currentIndex.should.equal(0);
	});
    
    it('should set inerHTML of notification live region', () => {
        //SlidesBasic[0].notification.innerHTML.should.equal('Slide 1 of 4');
    });

    it('should add active classNme to navItem', () => {
        window.setTimeout(() => {
            Array.from(SlidesBasic[0].navItems[0].classList).should.containEql('is--current');
        }, 0);
    });


});