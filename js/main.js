// Initialize AOS
AOS.init();

// Vanta.GLOBE background setup
VANTA.GLOBE({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: window.innerHeight * 0.7, // Ensure Vanta.js respects 70vh
  minWidth: window.innerWidth, // Ensure Vanta.js respects 100vh
  scale: 1,
  scaleMobile: 1.0,
  backgroundColor: 0x1b263b,
  color: 0x23a7c2, // Cyan net color
  color2: 0x707070, // Secondary grey color
  points: 12.0,
  maxDistance: 20.0,
  spacing: 15.0,
  size: 0.5,
});

// VanillaTilt initialization for buttons
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 15,
  speed: 300,
  glare: true,
  "max-glare": 0.2,
});

// Show Skills based on Semester
document.addEventListener("DOMContentLoaded", function () {
  // Show default semester (4)
  const defaultSem = 4;
  showSkills(defaultSem);

  // Show Skills based on Semester
  function showSkills(sem) {
    document.querySelectorAll(".college-skills-list").forEach((list) => {
      list.classList.add("hidden"); // Hide all skill lists
      list.classList.remove("active");
    });

    document.querySelectorAll(".semester-buttons button").forEach((button) =>
      button.classList.remove("active")
    );

    const selectedList = document.getElementById(`college-skills-list-${sem}`);
    const selectedButton = document.querySelector(
      `.semester-buttons button:nth-child(${sem})`
    );

    if (selectedList) {
      selectedList.classList.remove("hidden");
      selectedList.classList.add("active");
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }

  // Dynamically attach click events to buttons
  document.querySelectorAll(".semester-buttons button").forEach((button, index) => {
    const sem = index + 1; // Button index corresponds to semester number
    button.addEventListener("click", () => {
      if (!button.classList.contains("cursor-not-allowed")) {
        showSkills(sem);
      }
    });
  });
});


// Handle mailto link with Gmail fallback
function tryMailto(mailtoUrl) {
  const emailWindow = window.open(mailtoUrl, "_blank");
  setTimeout(() => {
    if (
      !emailWindow ||
      emailWindow.closed ||
      typeof emailWindow.closed === "undefined"
    ) {
      const params = mailtoUrl.split("?")[1];
      const subject = params.match(/subject=([^&]*)/)?.[1] || "";
      const body = params.match(/body=([^&]*)/)?.[1] || "";
      const to = mailtoUrl.split("?")[0].replace("mailto:", "");
      window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    } else {
      emailWindow.close();
    }
  }, 500);
}
