let sections, navBar, activeSection;
let scrollTimeOut;

/**
 * set section to be active
 * 
 * @param {Number} idx section index
 */
const setActiveSection = (idx) => {
  // remove active class from section if found
  if (!activeSection)
    activeSection = document.querySelector(".your-active-class");

  activeSection.classList.remove('your-active-class');

  // set current section to active
  sections[idx].className = 'your-active-class';
  activeSection = sections[idx];

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
  const i = parseInt(e.target.id, 10);
  const section = sections[i];

  section.scrollIntoView({ behavior: "smooth" });

  setActiveSection(i);
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
const getDistanceFromView = (section) => {
  // get section bounding rect
  const boundingRect = section.getBoundingClientRect();

  return Math.abs(boundingRect.y);
}

/**
 * change active section when user scroll to another one
 * 
 * @param {Event} e 
 */
const scrollHandler = (e) => {
  // remove timeout
  clearTimeout(scrollTimeOut);
  navBar.style.display = 'flex';

  if (!activeSection)
    activeSection = document.querySelector(".your-active-class");

  // index of min abs y diff 
  let nearestSectionIdx = 0, minYDiff = Number.MAX_SAFE_INTEGER;

  sections.forEach((section, i) => {
    const yDiff = getDistanceFromView(section);
    if (yDiff < minYDiff) {
      minYDiff = yDiff;
      nearestSectionIdx = i;
    }
  });

  setActiveSection(nearestSectionIdx);

  // add scroll time out to hide navbar after 1 second no scrolling
  scrollTimeOut = setTimeout(() => {
    navBar.style.display = 'none';
  }, 1000);
}

document.addEventListener('DOMContentLoaded', (e) => {
  buildNavBar();
  document.addEventListener('scroll', scrollHandler);
  document.getElementById('top-btn').addEventListener('click', (e) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});