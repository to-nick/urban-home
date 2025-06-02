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

async function renderElement(elementID, elementFile){
    const element = document.getElementById(elementID);

    try{
        const file = await fetch(elementFile)
        element.innerHTML = await file.text()

        if(elementID === "navbar"){
            hamburgerActivation();
        }
    } catch (error){
        console.error('There was an error rendering the element:', error)
    }
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
    renderElement("navbar", "../navbar.html");
    renderElement("footer", "../footer.html");
    scrollToSection(".about-us-link", ".about-us-section");
    scrollToSection(".projects-link", ".projects-section");
})
