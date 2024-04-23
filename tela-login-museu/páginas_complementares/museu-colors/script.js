const menuIcon = document.getElementById("menuIcon");
const headerNav = document.querySelector("ul");
const links = document.querySelectorAll('.men a');

let isMenuOpen = false;

menuIcon.addEventListener("click", () => {
  if (!isMenuOpen) {
    menuIcon.innerText = "close";
    headerNav.classList.add("active");
  } else {
    menuIcon.innerText = "menu";
    headerNav.classList.remove("active");
  }

  isMenuOpen = !isMenuOpen;
});

links.forEach(link => {
  link.addEventListener('click', () => {
    headerNav.classList.remove("active");
    menuIcon.innerText = "menu";
    isMenuOpen = !isMenuOpen;
  });
});