function preloader() {
    document.body.style.overflow = "hidden";
    $(() => {
        setTimeout(() => {
            let p = $('.preloader');
            p.css('opacity', 0);
            setTimeout(() => {
                p.remove();
                document.body.style.overflow = "visible";
            }, parseInt(p.css('--duration')) * 1000);
        }, 1000);
    });
}

preloader(); 

document.addEventListener("DOMContentLoaded", function() {
    var preloader = document.getElementById("preloader");
    if(window.location.pathname === '/') {
        preloader.classList.add("preloader");
    } else {
        preloader.classList.remove("preloader");
    }
});
