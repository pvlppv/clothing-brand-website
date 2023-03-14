(function() {
  let observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.intersectionRatio > 0) {
          entry.target.style.opacity = 1;
          entry.target.style.transition = "opacity 1s";
        } else {
          entry.target.style.opacity = 0;
        }
      });
    });
    let items = document.querySelectorAll('.product-box, .new-grid, .new-text-one, .new-text-two, .new-text-three, .new-text-four, .new-text-five, .new-text-six, .marquee, .welcome-message, .welcome-message-inside, .welcome-logo, .gallery-container img, .gallery-container h1, .product-card-section');
    for(let i = 0; i < items.length; i++) {
      items[i].style.opacity = 0;
      observer.observe(items[i]);
  }
})();


const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);
