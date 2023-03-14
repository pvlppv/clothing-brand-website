
let galleryImg = document.querySelectorAll(".gallery-img img"),
  popup = document.querySelector(".popup-img"),
  popupImg = popup.querySelector("img");

galleryImg.forEach(img =>{
  img.onclick = () =>{
    popup.classList.add('show-popup');
    popup.style.display = 'block';
    popupImg.src = img.getAttribute('data-src');
    popup.style.opacity = 0;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      popup.style.opacity = 1;
    }, 10);
  }
});

let zoomed = false;
let originalWidth = 0;
let originalHeight = 0;
let originalLeft = 0;
let originalTop = 0;
if ('ontouchstart' in document.documentElement === false) {
  popupImg.addEventListener("click", function(event) {
    if (!zoomed) {
      zoomed = true;
      originalWidth = popupImg.offsetWidth;
      originalHeight = popupImg.offsetHeight;
      originalLeft = popupImg.offsetLeft;
      originalTop = popupImg.offsetTop;

      let scale = 2;
      let newWidth = originalWidth * scale;
      let newHeight = originalHeight * scale;
      let mouseX = event.clientX;
      let mouseY = event.clientY;
      let zoomX = (mouseX - originalLeft) * (scale - 1);
      let zoomY = (mouseY - originalTop) * (scale - 1);

      popupImg.style.transition = "width 0.3s, height 0.3s, left 0.3s, top 0.3s";
      popupImg.style.width = `${newWidth}px`;
      popupImg.style.height = `${newHeight}px`;
      popupImg.style.left = `${originalLeft - zoomX}px`;
      popupImg.style.top = `${originalTop - zoomY}px`;
      popupImg.style.cursor = "move";
    } else {
      zoomed = false;
      popupImg.style.transition = "width 0.3s, height 0.3s, left 0.3s, top 0.3s";
      popupImg.style.width = `${originalWidth}px`;
      popupImg.style.height = `${originalHeight}px`;
      popupImg.style.left = `${originalLeft}px`;
      popupImg.style.top = `${originalTop}px`;
      popupImg.style.cursor = "pointer";
    }
  });

  popupImg.addEventListener("mousemove", function(event) {
    if (zoomed) {
      let scale = 2;
      let newWidth = originalWidth * scale;
      let newHeight = originalHeight * scale;
      let mouseX = event.clientX;
      let mouseY = event.clientY;
      let zoomX = (mouseX - originalLeft) * (scale - 1);
      let zoomY = (mouseY - originalTop) * (scale - 1);

      popupImg.style.transition = "none";
      popupImg.style.width = `${newWidth}px`;
      popupImg.style.height = `${newHeight}px`;
      popupImg.style.left = `${originalLeft - zoomX}px`;
      popupImg.style.top = `${originalTop - zoomY}px`;
    }
  });

  popupImg.addEventListener("mouseleave", function() {
    if (zoomed) {
      zoomed = false;
      popupImg.style.transition = "width 0.3s, height 0.3s, left 0.3s, top 0.3s";
      popupImg.style.width = `${originalWidth}px`;
      popupImg.style.height = `${originalHeight}px`;
      popupImg.style.left = `${originalLeft}px`;
      popupImg.style.top = `${originalTop}px`;
    }
  })
};

popup.addEventListener("click", function(event) {
  if (event.target !== popupImg) {
    popup.classList.remove('show-popup');
    popup.style.opacity = 0;
    document.body.style.overflow = 'visible';
    setTimeout(function() {
      popup.style.display = "none";
    }, 100);
  }
});