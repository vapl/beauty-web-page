var hamburgerMenuSelect = document.querySelector(".hamburger-menu");

function openCloseMenu() {
    var hamburgerMenu = document.querySelector(".header");
    if (hamburgerMenu.style.display == "none") {
        hamburgerMenu.style.display = "flex";
    } else {
        hamburgerMenu.style.display = "none";
    }
    
}

// NAV PABEIGTS!