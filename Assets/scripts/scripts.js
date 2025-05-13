function hamburgerActivation(){

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-list-container");

    hamburger.addEventListener('click', ()=>{
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    })

    document.querySelectorAll(".list-item").forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }))

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
}

function scrollToSection(link, section){

    document.querySelector(link).addEventListener("click", function(e) {
        e.preventDefault();
        const pageSection = document.querySelector(section);

        if(window.innerWidth > 767){
            pageSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
            });
        }

        pageSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
            });
      });
    }

document.addEventListener("DOMContentLoaded", () => {
    hamburgerActivation();
    scrollToSection(".about-us-link", ".about-us-section");
    scrollToSection(".projects-link", ".projects-section");
})
