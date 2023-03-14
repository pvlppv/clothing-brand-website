let observer = new IntersectionObserver(callback);
let logoText = document.querySelector(".logo-text");
observer.observe(logoText);
function callback(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            logoText.classList.add("shine");
            setTimeout(() => {
                logoText.classList.remove("shine");
            }, 1000);
        }
    });
}
let style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
.shine {
  text-shadow: 0 0 15px #fff, 0 0 20px #fff, 0 0 30px #fff;
  transition: text-shadow 1s ease-in-out;
}
`;
document.getElementsByTagName('head')[0].appendChild(style);
setInterval(() => {
    logoText.classList.add("shine");
    setTimeout(() => {
        logoText.classList.remove("shine");
    }, 2000);
}, 3500);