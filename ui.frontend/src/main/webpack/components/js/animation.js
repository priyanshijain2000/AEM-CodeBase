const inViewport = (entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
};
const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};
// Attach observer to every [data-inviewport] element:
const ELsinViewport = document.querySelectorAll("[data-inviewport]");
ELsinViewport.forEach((EL) => {
    Obs.observe(EL, obsOptions);
});