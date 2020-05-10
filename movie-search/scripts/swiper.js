var mySwiper = new Swiper('.swiper-container', {
    // loop: true,
    spaceBetween: 10,
    slidesPerView: 1,

    pagination: {
        el: '.swiper-pagination',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        767: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },
})

export default mySwiper