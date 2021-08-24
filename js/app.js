let sections, navBar, activeSection;

/**
 * set section to be active
 * 
 * @param {Element} section 
 */
const setActiveSection = (section) => {
  // remove active class from section if found
  if (!activeSection)
    activeSection = document.querySelector(".your-active-class");

  activeSection.classList.remove('your-active-class');

  // set current section to active
  section.className = 'your-active-class';
  activeSection = section;

}

/**
 * nav list click event handler
 * 
 * @param {Event} e 
 */
const navListClickHandler = (e) => {
  const section = document.getElementById(e.target.getAttribute('section__id'));

  section.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  setActiveSection(section);
}

/**
 * Build the nav bar
 */
const buildNavBar = () => {
  sections = document.querySelectorAll('section');
  navBar = document.getElementById('navbar__list');

  // add sections li to navbar
  sections.forEach((section) => {
    // create list item of the navBar
    const listItem = document.createElement('li');

    listItem.innerHTML = section.getAttribute('data-nav');
    listItem.className = 'menu__link';

    // add section id to the list item
    listItem.setAttribute('section__id', `${section.id}`);

    // add scroll event
    listItem.addEventListener('click', navListClickHandler);

    navBar.appendChild(listItem);
  });
}

const sectionInView = (section) => {
  var boundingRect = section.getBoundingClientRect();

  return (
    boundingRect.top <= 200 &&
    boundingRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

const scrollHandler = (e) => {
  if (!activeSection)
    activeSection = document.querySelector(".your-active-class");

  sections.forEach((section) => {
    if (section.id !== activeSection.id && sectionInView(section)) {
      setActiveSection(section);
    }
  });
}

document.addEventListener('DOMContentLoaded', (e) => {
  buildNavBar();
  document.addEventListener('scroll', scrollHandler);
});