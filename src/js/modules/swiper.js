// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// import * as Swiper from "../../../node_modules/swiper/swiper-bundle.js"
// import { navigation } from "../../../node_modules/swiper/modules/navigation.mjs"
// import Swiper and modules styles


// init Swiper:
export const swiper = new Swiper('.social-swiper__swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Pagination],
    spaceBetween: 25,
    // breakpoints: {
    //     0: {
    //         slidesPerView: 1,
    //         spaceBetween: 5,
    //     },
    //     320: {
    //         slidesPerView: 1,
    //         spaceBetween: 10,
    //     },
    //     378: {
    //         slidesPerView: 1.5,
    //     },
    //     576: {
    //         slidesPerView: 2,

    //     },
    //     768: { slidesPerView: 2, },
    //     992: { slidesPerView: 2.5, },
    //     1050: { slidesPerView: 3, },
    //     1200: {
    //         slidesPerView: 3.5,
    //     },
    //     1400: { slidesPerView: 4 }
    // },
    navigation: {
        prevEl: ".swiper-button-prev-custom",
        nextEl: ".swiper-button-next-custom",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        bulletElement: "div",
        bulletClass: "pagination-bullet",
        bulletActiveClass: "pagination-bullet-active"
    },
    speed: 1500,
    direction: 'horizontal',
    // grabCursor: true,
    loop: false,
    setWrapperSize: true,
    // width: 360,
    rewind: true,
    slideToClickedSlide: false,
    // slidesPerView: 12.5,
    // slidesPerGroup: 9,
    slidesPerView: 'auto',
    // setWrapperSize: true,
    // slidesOffsetAfter: -600,
});
