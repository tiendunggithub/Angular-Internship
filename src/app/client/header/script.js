const body = document.body;
const triggerMenu = document.querySelector(".page-header .trigger-menu");
 
triggerMenu.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});