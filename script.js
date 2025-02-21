// JavaScript for Portfolio Website
document.addEventListener("DOMContentLoaded", function () {
    // Theme Toggle Button (if applicable)
    const themeToggleButton = document.getElementById("theme-toggle");

    // Function to get all sections
    function getSections() {
        return document.querySelectorAll(".section");
    }

    // Function to get the current visible section index
    function getCurrentIndex() {
        return Math.round(window.scrollY / window.innerHeight);
    }

    // Smooth Scroll to a specific section index
    function scrollToSection(index) {
        const sections = getSections();
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: "smooth" });
        }
    }

    // Full Page Scroll Snap with Infinite Scroll
    document.addEventListener("wheel", (e) => {
        const sections = getSections();
        let currentIndex = getCurrentIndex();
        let nextIndex = e.deltaY > 0 ? currentIndex + 1 : currentIndex - 1;

        // Infinite scroll behavior (looping back)
        if (nextIndex >= sections.length) {
            nextIndex = 0; // Loop back to first section
        } else if (nextIndex < 0) {
            nextIndex = sections.length - 1; // Loop to last section
        }

        // Smooth scroll to the target section
        scrollToSection(nextIndex);
    });

    // Handle arrow key navigation with infinite scrolling at edges
    document.addEventListener("keydown", (e) => {
        const sections = getSections();
        let currentIndex = getCurrentIndex();

        if (e.key === "ArrowDown") {
            // If at the last section, jump to first
            if (currentIndex === sections.length - 1) {
                scrollToSection(0);
            } else {
                scrollToSection(currentIndex + 1);
            }
        } else if (e.key === "ArrowUp") {
            // If at the first section, jump to last
            if (currentIndex === 0) {
                scrollToSection(sections.length - 1);
            } else {
                scrollToSection(currentIndex - 1);
            }
        }
    });

    // Dynamic Body Class Update on Scroll
    document.addEventListener("scroll", () => {
        const sections = getSections();
        const scrollY = window.scrollY;

        // Clear previous body classes
        document.body.className = "";

        // Add a class corresponding to the currently viewed section
        sections.forEach((section) => {
            const offsetTop = section.offsetTop;
            const offsetHeight = section.offsetHeight;

            if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
                document.body.classList.add(`page-${section.id}`);
            }
        });
    });


    // Initialize Swiper
    document.addEventListener("DOMContentLoaded", function () {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
    

    // Project Navigation Logic
    let currentProjectIndex = 0;
    const projectSections = document.querySelectorAll(".project-details");
    const prevButton = document.getElementById("prev-project");
    const nextButton = document.getElementById("next-project");

    function updateProjectVisibility() {
        projectSections.forEach((section, index) => {
            section.style.display = index === currentProjectIndex ? "block" : "none";
        });

        prevButton.disabled = currentProjectIndex === 0;
        nextButton.disabled = currentProjectIndex === projectSections.length - 1;
    }

    prevButton.addEventListener("click", function () {
        if (currentProjectIndex > 0) {
            currentProjectIndex--;
            updateProjectVisibility();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentProjectIndex < projectSections.length - 1) {
            currentProjectIndex++;
            updateProjectVisibility();
        }
    });

    updateProjectVisibility();
});

// Show Skills based on Semester
function showSkills(sem) {
    document.querySelectorAll(".college-skills-list").forEach((list) =>
        list.classList.remove("active")
    );
    document.querySelectorAll(".semester-buttons button").forEach((button) =>
        button.classList.remove("active")
    );

    let selectedList = document.getElementById("college-skills-list-" + sem);
    let selectedButton = document.querySelector(
        ".semester-buttons button:nth-child(" + sem + ")"
    );

    if (selectedList) {
        selectedList.classList.add("active");
    }
    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}

// Typewriter Effect
const text = [
    "Machine Learning nerd with big dreams. 🤖",
    "B.E. AI & ML @ LJ University, Ahmedabad. Still human (for now).",
    "Obsessed with cutting-edge ML—because the future won’t build itself!",
    "AI for social good? Count me in! Healthcare, education, sustainability—you name it.",
    "Always learning, always coding, always caffeinated. ☕",
    "Got a cool AI project? Let’s make some magic happen! ✨",
];

let i = 0,
    j = 0;

function typeWriter() {
    const typewriterText = document.getElementById("typewriter-text");

    if (i < text[j].length) {
        typewriterText.textContent += text[j].charAt(i);
        i++;
        setTimeout(typeWriter, 40);
    } else if (j < text.length - 1) {
        typewriterText.innerHTML += "<br><br>";
        j++;
        i = 0;
        setTimeout(typeWriter, 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const typewriterText = document.getElementById("typewriter-text");
    typewriterText.style.whiteSpace = "pre-wrap";
    typewriterText.style.caretColor = "transparent";
    typeWriter();
});

// Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll(".mySlides");
const dots = document.querySelectorAll(".dot");

function showSlides(n) {
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    slides.forEach((slide, i) => {
        slide.style.display = i === slideIndex ? "block" : "none";
        dots[i].classList.toggle("active", i === slideIndex);
    });
}

function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides(slideIndex);
}

// Initial display
showSlides(slideIndex);

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("theme-toggle");

    if (!toggleButton) {
        console.error("Theme toggle button not found!");
        return;
    }

    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }

    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const savedTheme = localStorage.getItem("theme") || systemPreference;
    setTheme(savedTheme);

    toggleButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });
});



class OrderedHashMap {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.data = [];
    }

    add(key, value) {
        if (this.data.some(item => item.key === key)) {
            return; // Prevent duplicate keys
        }

        if (this.data.length >= this.maxSize) {
            this.data.pop(); // Remove the oldest entry when exceeding max size
        }

        this.data.unshift({ key, value }); // Add new entry at the beginning
    }

    getAll() {
        return this.data;
    }
}

// Create a new testimonial manager with max 6 entries
const testimonialManager = new OrderedHashMap(6);

function addNewTestimonial() {
    const name = document.getElementById("testimonial-writer").value.trim();
    const message = document.getElementById("testimonial-message").value.trim();

    if (!name || !message) {
        alert("Please enter your name and testimonial.");
        return;
    }

    if (name.length > 10) {
        alert("Name must not exceed 10 characters.");
        return;
    }

    if (message.length > 50) {
        alert("Testimonial must not exceed 50 characters.");
        return;
    }

    const userEmail = prompt("Enter my email to confirm your identity:");
    if (userEmail !== "shailpatel.connect@gmail.com") {
        alert("Email verification failed.");
        return;
    }

    testimonialManager.add(name, message);
    renderTestimonials();

    // Reset form
    document.getElementById("testimonial-writer").value = "";
    document.getElementById("testimonial-message").value = "";
}




function renderTestimonials() {
    const list = document.getElementById("testimonial-list");
    list.innerHTML = ""; // Clear existing testimonials

    const testimonials = testimonialManager.getAll();

    if (testimonials.length === 0) {
        list.innerHTML = `<p class="no-testimonials">No Testimonials yet.</p>`;
        list.style = `display: block`;
        return;
    }
    else{
        list.innerHTML = "";
        list.style.display = "grid";
        list.style.gridTemplateColumns = "repeat(3, 1fr)";
        list.style.gridTemplateRows = "repeat(2, auto)";
        list.style.padding = "5%";
        list.style.gap = "5%";
        list.style.justifyContent = "center";
        list.style.overflow = "hidden";
        list.style.fontSize = "1vw";  // Font size based on viewport width
        list.style.fontFamily = "Arial, sans-serif";  // Font family
    }

    testimonials.forEach(({ key, value }) => {
        const box = document.createElement("div");
        box.classList.add("testimonial-box");

        box.innerHTML = `
            <p class="testimonial-message">"${value}"</p>
            <p class="testimonial-author">— ${key}</p>
        `;

        list.appendChild(box);
    });
}

// Initialize empty state
renderTestimonials();