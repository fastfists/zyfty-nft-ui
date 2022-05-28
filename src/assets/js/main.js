$(document).ready(function(){
    const navbar = document.querySelector('.site-header');
    window.onscroll = () => {
        if (window.scrollY > 150) {
            navbar.classList.add('nav-active');
        } else {
            navbar.classList.remove('nav-active');
        }
    };
    // $('.menu-toggle').click( function (e) {
    //     $('.site-nav').toggleClass("active");
    //     $(this).toggleClass("active");
    // });

    $('.list-items').click(function (e) {
        $('.site-nav').toggleClass("active");
        $('.menu-toggle').toggleClass("active");
    });

    $(".request-btn").click(function (e) {
        $(".form-popup").show();
        e.stopPropagation();
    });
    $(".form-popup").click(function (e) {
        e.stopPropagation();
    });

    $(document).click(function (event) {
        $(".form-popup").hide();
        if(!$(event.target).closest(".primary-nav").length) {
            $('.site-nav').removeClass("active");
            $('.menu-toggle').removeClass("active");
            $(this).removeClass("active");
        } else {
            $('.site-nav').toggleClass("active");
            $(this).toggleClass("active");
            $('.menu-toggle').toggleClass("active");
        }
    });
   
});