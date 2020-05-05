
var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    slidesPerView: 4,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})
