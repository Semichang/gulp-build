// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

// import * as Swiper from "../../../node_modules/swiper/swiper-bundle.js"
// import { navigation } from "../../../node_modules/swiper/modules/navigation.mjs"
// import Swiper and modules styles


// init Swiper:
export const swiper = new Swiper('.innstructors__swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Scrollbar],
    spaceBetween: 40,
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 5,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        378: {
            slidesPerView: 1.5,
        },
        576: {
            slidesPerView: 2,

        },
        768: { slidesPerView: 2, },
        992: { slidesPerView: 2.5, },
        1050: { slidesPerView: 3, },
        1200: { slidesPerView: 3, },
    },
    navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
    },
    // pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    // },
    scrollbar: {
        el: ".swiper-scrollbar",
        snapOnRelease: true,
    },
    speed: 1500,
    direction: 'horizontal',
    // grabCursor: true,
    loop: false,
    setWrapperSize: false,
    // width: 360,
    rewind: true,
    slideToClickedSlide: false,
    slidesPerView: 3,


});
