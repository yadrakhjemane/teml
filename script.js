// JavaScript for Portfolio Website
document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const themeToggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    // Full Page Scroll Snap with Infinite Scroll
    document.addEventListener("wheel", (e) => {
        const sections = document.querySelectorAll(".section");
        const currentIndex = Math.round(window.scrollY / window.innerHeight);
    
        let nextIndex = e.deltaY > 0 ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= sections.length) nextIndex = 0; // Loop to first section
        if (nextIndex < 0) nextIndex = sections.length - 1; // Loop to last section
    
        sections[nextIndex].scrollIntoView({ behavior: "instant" });
    });

    // Dynamic Body Class Update on Scroll
    document.addEventListener("scroll", () => {
        const sections = document.querySelectorAll(".section");
        const scrollY = window.scrollY;

        document.body.className = ""; // Clear previous classes
        sections.forEach((section) => {
            const offsetTop = section.offsetTop;
            const offsetHeight = section.offsetHeight;

            if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
                document.body.classList.add(`page-${section.id}`);
            }
        });
    });

    // Flip Card Logic in About Section
    // let flipState = 0; // 0 = photo, 1 = first text, 2 = second text
    // const card = document.querySelector(".card"); // The card container
    // const cardInner = document.querySelector(".card-inner"); // The flipping inner content



    // card.addEventListener("click", () => {
    //     if (flipState === 0) {
    //         // Flip to first text
    //         cardInner.classList.add("flipped-right");
    //         flipState = 1;

    //     } else if (flipState === 1) {
    //         // Flip to second text
    //         cardInner.classList.remove("flipped-right");
    //         cardInner.classList.add("flipped-top");
    //         flipState = 2;
    //     } else if (flipState === 2) {
    //         // Flip back to photo
    //         cardInner.classList.remove("flipped-top");
    //         flipState = 0;
    //     }
    // });

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

    prevButton.addEventListener("click", function() {
        if (currentProjectIndex > 0) {
            currentProjectIndex--;
            updateProjectVisibility();
        }
    });

    nextButton.addEventListener("click", function() {
        if (currentProjectIndex < projectSections.length - 1) {
            currentProjectIndex++;
            updateProjectVisibility();
        }
    });

    updateProjectVisibility();
});

function showSkills(sem) {
    document.querySelectorAll('.college-skills-list').forEach(list => list.classList.remove('active'));
    document.querySelectorAll('.semester-buttons button').forEach(button => button.classList.remove('active'));
    
    let selectedList = document.getElementById('college-skills-list-' + sem);
    let selectedButton = document.querySelector('.semester-buttons button:nth-child(' + sem + ')');
    
    if (selectedList) {
        selectedList.classList.add('active');
    }
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}


const text = [
    "I am a Machine Learning Enthusiast.",
    "I am doing my Bachelor of Engineering in AI & ML from LJ University in Ahmedabad. I aspire to work on the bleeding edge of Machine Learning and am looking for work opportunities.",
    "My goal is to work on real-world AI applications and contribute to innovative projects that leverage AI and Machine Learning for solving complex problems.",
    "I am passionate about using AI for social good, such as improving healthcare, education, and environmental sustainability through cutting-edge technologies.",
    "Currently, I am constantly learning new techniques and tools in AI to stay up-to-date with the latest advancements in the field.",
    "Feel free to reach out if you're looking for a passionate and driven AI enthusiast to collaborate with on exciting projects."
];

let i = 0, j = 0;

function typeWriter() {
    const typewriterText = document.getElementById("typewriter-text");

    // Type out the current text character by character
    if (i < text[j].length) {
        typewriterText.textContent += text[j].charAt(i);
        i++;
        setTimeout(typeWriter, 40); // Slightly faster typing speed (reduced delay)
    } 
    // Move to the next chunk of text
    else if (j < text.length - 1) {
        typewriterText.innerHTML += "<br><br> ";  // Add a break between sentences/paragraphs
        j++;
        i = 0;
        setTimeout(typeWriter, 500);  // Add a pause before moving to the next line of text
    }
}

// Ensure the text wraps and stays inside the screen without overflowing
document.addEventListener("DOMContentLoaded", function () {
    const typewriterText = document.getElementById("typewriter-text");
    typewriterText.style.whiteSpace = "pre-wrap";  // Ensure text wraps correctly
    typewriterText.style.caretColor = "transparent"; // Hide the cursor
    typeWriter();
});
