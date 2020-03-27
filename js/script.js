'use strict'

window.onload = () => {

  { /* Fixed Header */


    /* Function */

    const checkScroll = (scrollOffset) => {
      console.clear();
      console.log(scrollOffset);
      // headerList.add('fixed');

      if (scrollOffset > (INTRO_HIGHT / 2)) {
        headerList.add('fixed');
      } else if (scrollOffset < (INTRO_HIGHT / 2)) {
        headerList.remove('fixed');
      }

      if (scrollOffset >= INTRO_HIGHT) {
        if (headerList[1] !== 'active' || headerList[2] !== 'active') {
          headerList.add('active');
          // headerList.add('fixed');
        }
        if (navToggleList[1] === 'active') {
          navList.remove('active');;
          navToggleList.remove('active');
        }
      } else if (scrollOffset <= INTRO_HIGHT) {
        if (headerList[1] !== 'active' || headerList[2] !== 'active') {
          headerList.remove('active');
          // headerList.remove('fixed');
        }
        if (navToggleList[1] === 'active') {
          navList.remove('active');;
          navToggleList.remove('active');
        }
      }

    }

    const checkNavActive = (navLinks, scrollOffset) => {
      for (const item of navLinks) {
        let nameBlockId = item.getAttribute('data-scroll');
        let blockId = document.querySelector(nameBlockId);
        const ToItem = blockId.offsetTop;
        const bottomItem = blockId.offsetHeight + blockId.offsetTop;

        if (scrollOffset >= ToItem && bottomItem >= scrollOffset) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      }
    }

    /* Usege */

    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');

    const INTRO_HIGHT = document.querySelector('.intro').offsetHeight;

    const headerList = header.classList;
    const navList = nav.classList;
    const navToggleList = navToggle.classList;

    navToggle.onclick = () => {
      event.preventDefault();
      if ((window.pageYOffset + 70) <= INTRO_HIGHT) {
        header.classList.toggle('active');
      }
      nav.classList.toggle('active');
      navToggle.classList.toggle('active');
    };

    const navLinks = document.querySelectorAll('[data-scroll]');

    window.onscroll = () => {
      checkScroll(window.pageYOffset + 70);
      checkNavActive(navLinks, window.pageYOffset + 70);
    }

  } /* end Fixed Header */


  { /* Smooth scroll */
    /* Functions */



    /* Usege */

    document.querySelectorAll('[data-scroll]').forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        let nameBlockId = item.dataset.scroll;
        let blockId = document.querySelector(nameBlockId);

        document.querySelectorAll('.nav a').forEach(item => {
          item.classList.remove('active');
        });

        event.target.classList.add('active');

        window.scrollTo({
          top: blockId.offsetTop - 67.78,
          behavior: "smooth"
        });
        // blockId.scrollIntoView({ block: "start", behavior: "smooth" });
      })
    })

  } /* end Smooth scroll */

  { /* Accordion Collapse */
    /* Functions */
    const hideAll = () => {
      const items = accordion.querySelectorAll('.accordion__item');
      for (const item of items) {
        item.classList.remove('active');
      }
    }

    const searchAccordionItem = element => {
      if (element.classList[0] === 'accordion__item') return element;
      for (let i = 0; i < 2; i++) {
        element = element.parentNode;
        if (element.classList[0] === 'accordion__item') return element;
      }
      return false;
    }

    const change = event => {
      const targ = event.target;
      const classTarget = targ.classList[0];
      if (classTarget !== 'accordion__item' &&
        classTarget !== 'accordion__header' &&
        classTarget !== 'accordion__icon' &&
        classTarget !== 'accordion__title') return;

      const accordionItem = searchAccordionItem(targ);
      // const accordion = accordionItem.parentNode;

      if (accordionItem.classList[1] === 'active') {
        hideAll();
      } else {
        hideAll();
        accordionItem.classList.add('active');
      }
    }

    /* Usege */
    const accordion = document.querySelector('.accordion');
    accordion.addEventListener('click', change);

  } /* end Accordion Collapse */

  { /* reviews-Slider */
    /* Functions */

    function Timer(fn, t) {
      var timerObj = setInterval(fn, t);

      this.stop = function () {
        if (timerObj) {
          clearInterval(timerObj);
          timerObj = null;
        }
        return this;
      }

      // start timer using current settings (if it's not already running)
      this.start = function () {
        if (!timerObj) {
          this.stop();
          timerObj = setInterval(fn, t);
        }
        return this;
      }

      // start with new interval, stop current interval
      this.reset = function (newT) {
        t = newT;
        return this.stop().start();
      }
    }

    const hideAll = items => {
      for (const item of items) {
        item.classList.remove('active');
      }
    }

    const whichItemActive = reviewsItems => {
      for (let i = 0; i < reviewsItems.length; i++) {
        if (reviewsItems[i].classList[1] === 'active') {
          return i;
        }
      }
      return false;
    }

    const prev = (timer, reviewsItems) => event => {
      timer.reset(6000);
      event.preventDefault();

      const number = whichItemActive(reviewsItems) + 1;
      // console.log(number);
      const totalItem = reviewsItems.length;
      if ((number - 1) === 0) {
        hideAll(reviewsItems);
        reviewsItems[totalItem - 1].classList.add('active');
        console.dir(whichItemActive(reviewsItems));
      } else {
        hideAll(reviewsItems);
        reviewsItems[number - 2].classList.add('active');
        console.dir(whichItemActive(reviewsItems));
      }
    }

    const next = (timer, reviewsItems) => event => {
      timer.reset(6000);
      event.preventDefault();

      const number = whichItemActive(reviewsItems) + 1;
      // console.log(number);
      const totalItem = reviewsItems.length;

      // console.dir(whichItemActive(reviewsItems));

      if (totalItem === number) {
        hideAll(reviewsItems);
        reviewsItems[0].classList.add('active');
      } else {
        hideAll(reviewsItems);
        reviewsItems[number].classList.add('active');
      }
    }

    /* Usege */

    const reviews = document.querySelectorAll('.reviews');
    for (const review of reviews) {

      const btnPrev = review.querySelector('.reviews__btn--prev');
      const btnNext = review.querySelector('.reviews__btn--next');

      const reviewsItems = review.querySelectorAll('.reviews__item');

      var timer = new Timer(function () {
        btnNext.click()
      }, 5000);

      btnPrev.addEventListener('click', prev(timer, reviewsItems));
      btnNext.addEventListener('click', next(timer, reviewsItems));

    }



  } /* end reviews-Slider */

  { /* Intro-slider *//*  22.01.20 */
    /* Function */
    const deactivateAll = items => {
      for (const item of items) {
        item.classList.remove('active');
      }
    }

    const activate = sliderItems => event => {
      deactivateAll(sliderItems);
      let sliderItem = event.target;
      if (sliderItem.classList[0] !== 'slider__item') {
        sliderItem = sliderItem.closest('.slider__item');
      }
      sliderItem.classList.add('active');
    }

    /* Usege */
    const sliderInner = document.querySelector('.slider__inner');
    const sliderItems = sliderInner.querySelectorAll('.slider__item');

    for (const item of sliderItems)
      item.addEventListener('click', activate(sliderItems));

  } /* end Intro-slider */

};
