var mySwiper = new Swiper('.swiper-container', {
    // loop: true,
    slidesPerView: 4,
    spaceBetween: 20,

    pagination: {
        el: '.swiper-pagination',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

export default mySwiper