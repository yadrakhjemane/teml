// Initialize AOS
AOS.init();

// Vanta.NET background setup
VANTA.GLOBE({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,

    minHeight: window.innerHeight * 0.7, // Ensure Vanta.js respects 70vh
    minWidth: window.innerWidth, // Ensure Vanta.js respects 100vh
    scale: 1,
    scaleMobile: 1.00,

    backgroundColor: 0x1B263B,
    color: 0x23a7c2,               // Cyan net color
    color2: 0x707070,              // Secondary grey color
    points: 12.0,
    maxDistance: 20.0,
    spacing: 15.0,
    size: 0.50
});

// Handle mailto link with Gmail fallback
function tryMailto(mailtoUrl) {
    const emailWindow = window.open(mailtoUrl, '_blank');
    setTimeout(() => {
        if (!emailWindow || emailWindow.closed || typeof emailWindow.closed === 'undefined') {
            const params = mailtoUrl.split('?')[1];
            const subject = params.match(/subject=([^&]*)/)?.[1] || '';
            const body = params.match(/body=([^&]*)/)?.[1] || '';
            const to = mailtoUrl.split('?')[0].replace('mailto:', '');
            window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
        } else {
            emailWindow.close();
        }
    }, 500);
}