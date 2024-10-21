const menuIcon = document.getElementById("menuIcon");
const menuCheckbox = document.getElementById("menu");
const headerNav = document.querySelector(".header_nav ul");
const links = document.querySelectorAll('.header_nav ul a');

menuCheckbox.addEventListener("change", () => {
  if (menuCheckbox.checked) {
    menuIcon.innerText = "close";
    headerNav.classList.add("active");
  } else {
    menuIcon.innerText = "menu";
    headerNav.classList.remove("active");
  }
});

links.forEach(link => {
  link.addEventListener('click', () => {
    headerNav.classList.remove("active");
    menuIcon.innerText = "menu";
    menuCheckbox.checked = false;
  });
});
