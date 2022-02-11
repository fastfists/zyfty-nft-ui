$(document).ready(function(){
    const navbar = document.querySelector('.site-header');
    window.onscroll = () => {
        if (window.scrollY > 150) {
            navbar.classList.add('nav-active');
        } else {
            navbar.classList.remove('nav-active');
        }
    };
    $('.menu-toggle').on('click', function (e) {
        $('.site-nav').toggleClass("active");
        $(this).toggleClass("active");

    });
    $(".request-btn").click(function (e) {
        $(".form-popup").show();
        e.stopPropagation();
    });
    $(".form-popup").click(function (e) {
        e.stopPropagation();
    });

    $(document).click(function () {
        $(".form-popup").hide();
    });
   
});