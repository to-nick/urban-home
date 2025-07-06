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

document.addEventListener('DOMContentLoaded', function() {
  function enableReviewCarousel() {
    const container = document.querySelector('.reviews-container');
    const items = document.querySelectorAll('.review-image-container');
    const bars = document.querySelectorAll('.carousel-bar');
    if (!container || !items.length || !bars.length) return;

    let currentIndex = 0;
    let autoScrollInterval;
    let startX = 0;
    let isDragging = false;
    let deltaX = 0;

    function scrollToIndex(index) {
      const itemWidth = items[0].offsetWidth + 16; // 16px = gap
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      bars.forEach(bar => bar.classList.remove('active'));
      if (bars[index]) bars[index].classList.add('active');
    }

    function goToIndex(index) {
      currentIndex = index;
      scrollToIndex(currentIndex);
    }

    function nextIndex() {
      if (currentIndex < items.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      scrollToIndex(currentIndex);
    }

    function prevIndex() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = items.length - 1;
      }
      scrollToIndex(currentIndex);
    }

    function startAutoScroll() {
      clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(nextIndex, 5000);
    }

    bars.forEach(bar => {
      bar.addEventListener('click', function() {
        const idx = parseInt(bar.getAttribute('data-index'));
        goToIndex(idx);
        startAutoScroll(); // reset timer on user click
      });
    });

    // Touch events for swipe
    container.addEventListener('touchstart', function(e) {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      isDragging = true;
      deltaX = 0;
      clearInterval(autoScrollInterval);
    });

    container.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      deltaX = e.touches[0].clientX - startX;
    });

    container.addEventListener('touchend', function(e) {
      if (!isDragging) return;
      isDragging = false;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0 && currentIndex < items.length - 1) {
          currentIndex++;
        } else if (deltaX > 0 && currentIndex > 0) {
          currentIndex--;
        }
        scrollToIndex(currentIndex);
        startAutoScroll();
      } else {
        scrollToIndex(currentIndex); // snap back if not enough swipe
        startAutoScroll();
      }
    });

    // Set initial active bar
    scrollToIndex(currentIndex);
    startAutoScroll();

    // Update on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 900) {
        scrollToIndex(currentIndex);
        startAutoScroll();
      } else {
        clearInterval(autoScrollInterval);
      }
    });
  }

  if (window.innerWidth <= 900) enableReviewCarousel();
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 900) enableReviewCarousel();
  });
});
