// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Typing effect for hero section
const typingText = document.querySelector('.typing-text');
const textToType = ['QA Engineer', 'Software Developer', 'Cybersecurity Practioner'];
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textToType[textIndex].length) {
        typingText.textContent += textToType[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = textToType[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % textToType.length;
        setTimeout(type, 500);
    }
}

// Start the typing animation
setTimeout(type, 1000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            to_email: 'owenkakembo20@gmail.com',
            message: message
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function() {
                // Clear form
                contactForm.reset();
                
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, function(error) {
                // Show error message
                console.error('Failed to send message:', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
    });
}

// Scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add these styles to your CSS
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: var(--transition);
        z-index: 999;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .scroll-top.show {
        opacity: 1;
    }
    
    .scroll-top:hover {
        background: var(--secondary-color);
        transform: translateY(-2px);
    }
    
    .nav-links.open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);
