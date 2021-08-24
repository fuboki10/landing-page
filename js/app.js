/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/


/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNavBar() {
  const sections = document.querySelectorAll('section');
  const navBar = document.getElementById('navbar__list');

  // add sections li to navbar
  sections.forEach((section) => {
    // create list item of the navBar
    const listItem = document.createElement('li');

    listItem.innerHTML = section.getAttribute('data-nav');
    listItem.className = 'menu__link';

    // add section id to the list item
    listItem.setAttribute('section-id', `${section.id}`);

    navBar.appendChild(listItem);
  });


  console.log(sections);

  console.log(navBar);
}


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


document.addEventListener('DOMContentLoaded', (e) => {
  buildNavBar();
});