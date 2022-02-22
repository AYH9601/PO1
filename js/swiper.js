// var swiper = new Swiper(".mySwiper", {
//     loop: true,
//     slidesPerView: 3,
//     spaceBetween: 30,
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev"
//     },
// });

var swiper = new Swiper(".mySwiper", {
    loop:true,
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
  });