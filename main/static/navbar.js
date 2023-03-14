// scrlloing down hides navbar, scrolling up shows navbar
let navbar = document.getElementsByTagName("header");
let navbarHeight = navbar[0].offsetHeight;
let prevScrollpos = window.pageYOffset;
window.addEventListener('scroll', function(){
    var currentScrollPos = window.pageYOffset;
    if (!nav.classList.contains("show-menu") && !cartWindow.classList.contains("show-cart")) {
      if (currentScrollPos > navbarHeight) {
        navbar[0].style.top = "0";
        if (prevScrollpos > currentScrollPos) {
          navbar[0].style.top = "0";
        } else {
          navbar[0].style.top = "-150px";
        }
      } else {
        navbar[0].style.top = "0";
      }
      prevScrollpos = currentScrollPos;
    }
});

// clicking on shop refers to the shop section
let shop = document.querySelector(".shop");
shop.addEventListener('click', function(){
  window.scrollTo({
    top: document.querySelector('.shop-container').offsetTop - navbarHeight,
  });
});

// clicking on gallery refers to the gallery section
let gallery = document.querySelector(".gallery");
gallery.addEventListener('click', function(){
  window.scrollTo({
    top: document.querySelector(".gallery-container").offsetTop - navbarHeight,
  });
});

// clicking on contacts refers to the footer section
let contacts = document.querySelector(".contacts");
contacts.addEventListener('click', function(){
    window.scrollTo({
      top: document.querySelector('footer').offsetTop,
    });
});




let activeMenu = null;

// mobile navbar menu
let nav = document.querySelector('nav');
let mobileToggle = document.querySelector('.mobile-toggle');
let mobileToggleI = mobileToggle.querySelector('i');
mobileToggleI.addEventListener('click', function() {
  nav.classList.add('show-menu');
  document.body.style.overflow = 'hidden';
  activeMenu = nav;
});
function NavBodyOverflow(event) {
  if (!nav.contains(event.target) && !mobileToggleI.contains(event.target)) {
    nav.classList.remove('show-menu');
    if (activeMenu === nav) {
      document.body.style.overflow = 'visible';
      activeMenu = null;
    }
  }
};
document.addEventListener('click', NavBodyOverflow);




// cart menu
let cartWindow = document.querySelector(".whole-cart-window");
let cartIcon = document.querySelector(".cart-icon");
let cartIconI = cartIcon.querySelector('i');
let cartBtn = document.querySelector('.product-card-buy');
cartIconI.addEventListener('click', function() {
  cartWindow.classList.add('show-cart');
  document.body.style.overflow = 'hidden';
  activeMenu = cartWindow;
});
function CartBodyOverflow(event) {
  if (!cartWindow.contains(event.target) && !cartIconI.contains(event.target) && (cartBtn === null || !cartBtn.contains(event.target)) && !event.target.classList.contains('bx-x')) {
    cartWindow.classList.remove('show-cart');
    if (activeMenu === cartWindow) {
      document.body.style.overflow = 'visible';
      activeMenu = null;
    }
  }
};
document.addEventListener('click', CartBodyOverflow);


