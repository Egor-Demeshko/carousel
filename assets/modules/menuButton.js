(function() {
  const mobileButton = document.querySelector(".mobile_bottom__button");
  const menu = document.querySelector(".menu");
  let menuOpen = false;

  function toggleMenu() {
    console.log("click");
    if (menuOpen) {
      menu.style.transform = "translateX(-150%)";
    } else {
      menu.style.transform = "translateX(-50%)";
    }
    menuOpen = !menuOpen;
  }

  mobileButton.addEventListener("click", toggleMenu);
})();