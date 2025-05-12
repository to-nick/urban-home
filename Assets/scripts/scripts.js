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

document.addEventListener("DOMContentLoaded", () => {
    hamburgerActivation();
})

