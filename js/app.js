let sections, navBar, activeSection;

/**
 * set section to be active
 * 
 * @param {Element} section section HTML element
 * @param {Number} idx section index
 */
const setActiveSection = (section, idx) => {
  // remove active class from section if found
  if (!activeSection)
    activeSection = document.querySelector(".your-active-class");

  activeSection.classList.remove('your-active-class');

  // set current section to active
  section.className = 'your-active-class';
  activeSection = section;

  // set menu link section active
  for (let i = 0; i < navBar.children.length; i++) {
    const child = navBar.children[i];
    if (child.classList.contains('active')) {
      if (i !== idx) child.classList.remove('active');
    } else {
      if (i === idx) child.classList.add('active');
    }

  }
}

/**
 * nav list click event handler
 * 
 * @param {Event} e 
 */
const navListClickHandler = (e) => {
  const section = document.getElementById(e.target.getAttribute('section__id'));

  section.scrollIntoView({ behavior: "smooth" });

  setActiveSection(section);
}

/**
 * Build the nav bar
 */
const buildNavBar = () => {
  sections = document.querySelectorAll('section');
  navBar = document.getElementById('navbar__list');

  // add sections li to navbar
  sections.forEach((section, i) => {
    // create list item of the navBar
    const listItem = document.createElement('li');

    listItem.innerHTML = section.getAttribute('data-nav');
    listItem.className = 'menu__link';
    listItem.id = i;

    // add section id to the list item
    listItem.setAttribute('section__id', `${section.id}`);

    // add scroll event
    listItem.addEventListener('click', navListClickHandler);

    // set first element as active one
    if (i == 0) listItem.classList.add('active');

    navBar.appendChild(listItem);
  });
}

/**
 * Check if user viewport active section is changed
 * 
 * @param {Element} section 
 * @returns boolean
 */
const sectionInView = (section) => {
  // get section bounding rect
  const boundingRect = section.getBoundingClientRect();

  return (
    boundingRect.top <= 200 &&
    boundingRect.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    boundingRect.right <=
    (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * change active section when user scroll to another one
 * 
 * @param {Event} e 
 */
const scrollHandler = (e) => {
  if (!activeSection)
    activeSection = document.querySelector(".your-active-class");

  sections.forEach((section, i) => {
    if (section.id !== activeSection.id && sectionInView(section)) {
      setActiveSection(section, i);
    }
  });
}

document.addEventListener('DOMContentLoaded', (e) => {
  buildNavBar();
  document.addEventListener('scroll', scrollHandler);
});