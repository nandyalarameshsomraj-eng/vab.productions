document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Fade In for Hero
    gsap.from('.hero-content h1', {
        duration: 1.5,
        opacity: 0,
        y: 30,
        ease: 'power4.out',
        stagger: 0.2
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

    // Parallax effect for Hero
    gsap.to('.hero', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        backgroundPosition: '50% 100%',
        ease: 'none'
    });

    // Glass navbar effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.03)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- BULLETPROOF FORM SUBMISSION ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            // If testing on file:// protocol, many browsers block Fetch.
            // In that case, we will use a standard form submission for 100% reliability.
            if (window.location.protocol === 'file:') {
                btn.innerHTML = 'Sending...';
                return true; // Let the browser handle submission normally
            }

            // If on a real server, try the smooth background method
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
                    // Fallback to normal submission if Fetch is blocked
                    form.submit();
                }
            })
            .catch(error => {
                // Final Fallback: Just submit the form normally
                form.submit();
            });
        });
    }
});
