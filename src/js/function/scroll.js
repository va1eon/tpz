const scroll = (element) => {
  element.addEventListener('click',  e => {
    e.preventDefault();
    const idEl = element.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(idEl)
    const topOffset = 50;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth",
    })
  })
}

export default scroll;