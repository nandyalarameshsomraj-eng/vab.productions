document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Fade In for Hero
    gsap.from('.hero-content h1', {
        duration: 1.5,
        opacity: 0,
        y: 30,
        ease: 'power4.out'
    });
    
    gsap.from('.hero-content p', {
        duration: 1.5,
        opacity: 0,
        y: 20,
        ease: 'power3.out',
        delay: 0.5
    });

    // Animate sections on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Glass navbar effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(5, 5, 5, 0.85)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.03)';
            navbar.style.backdropFilter = 'blur(5px)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Consolidated Form submission handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            // For local testing, use standard submission
            if (window.location.protocol === 'file:') {
                btn.innerHTML = 'Submitting...';
                return true; 
            }

            e.preventDefault();
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    btn.innerHTML = 'Inquiry Sent!';
                    btn.style.background = '#4CAF50';
                    form.reset();
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = 'transparent';
                        btn.disabled = false;
                    }, 5000);
                } else {
                    form.submit();
                }
            })
            .catch(error => {
                form.submit();
            });
        });
    }
});
