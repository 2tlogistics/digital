document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Space effects
    const spaceEffects = document.getElementById('spaceEffects');
    
    // Create stars
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'stars';
        const size = Math.random() * 3 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${Math.random() * 3 + 1}s`);
        spaceEffects.appendChild(star);
    }
    
    // Diamond Effect
    const contenedor = document.getElementById('diamantes');
    const colores = [
        'linear-gradient(135deg, #00f2fe, #4facfe)',
        'linear-gradient(135deg, #ff758c, #ff7eb3)',
        'linear-gradient(135deg, #a6c1ee, #fbc2eb)',
        'linear-gradient(135deg, #84fab0, #8fd3f4)'
    ];
    
    function crearDiamante() {
        const diamante = document.createElement('div');
        diamante.className = 'diamante';
        
        // Random position
        diamante.style.left = Math.random() * 100 + '%';
        
        // Random size
        const tamaño = 10 + Math.random() * 30;
        diamante.style.width = tamaño + 'px';
        diamante.style.height = tamaño + 'px';
        
        // Random color
        diamante.style.background = colores[Math.floor(Math.random() * colores.length)];
        
        // Random animation duration
        const duración = 3 + Math.random() * 4;
        diamante.style.animationDuration = duración + 's';
        
        // Random delay
        diamante.style.animationDelay = Math.random() * 2 + 's';
        
        contenedor.appendChild(diamante);
        
        // Remove after animation
        setTimeout(() => {
            diamante.remove();
        }, duración * 1000);
    }
    
    // Create initial diamonds
    for (let i = 0; i < 15; i++) {
        crearDiamante();
    }
    
    // Continue creating diamonds
    setInterval(crearDiamante, 500);
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Counter animation
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
        
        function updateCount() {
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        }
    });
    
    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Start slideshow
    startSlideShow();
    
    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow');
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slideshowContainer.addEventListener('mouseleave', startSlideShow);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            clearInterval(slideInterval);
            startSlideShow();
        });
    });
    
    // Testimonials animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease ' + (index * 0.2) + 's';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero background parallax - Targeting the new element
    gsap.to(".hero-bg-overlay", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: "20%",
        ease: "none"
    });
    
    // Slideshow waves parallax - Targeting the new elements
    gsap.to(".slideshow-wave", {
        scrollTrigger: {
            trigger: ".slideshow-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: "30%",
        ease: "none"
    });
    
    // Hero text animation
    gsap.from('.hero-title', {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1.5,
        opacity: 0,
        y: 50,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.cta-button', {
        duration: 1.5,
        opacity: 0,
        y: 50,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.stat-item', {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.9,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Slideshow section animation
    gsap.from('.slideshow-title', {
        scrollTrigger: {
            trigger: '.slideshow-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.slideshow-subtitle', {
        scrollTrigger: {
            trigger: '.slideshow-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.slideshow', {
        scrollTrigger: {
            trigger: '.slideshow-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        y: 50,
        opacity: 1,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    // Services section animation
    gsap.from('.services-title', {
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        y: 50,
        opacity: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.flip-card', {
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        y: 50,
        opacity: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Testimonials section animation
    gsap.from('.testimonials-title', {
        scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.testimonials-subtitle', {
        scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        y: 0,
        opacity: 1,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 100%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // AI agents animation
    gsap.to('.ai-agent:nth-child(1)', {
        duration: 10,
        x: 50,
        y: -20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to('.ai-agent:nth-child(2)', {
        duration: 8,
        x: -30,
        y: 30,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
    });
    
    gsap.to('.ai-agent:nth-child(3)', {
        duration: 12,
        x: 20,
        y: -40,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
    });
    
    // Slider section animation
    gsap.from('.slider-logo img', {
        scrollTrigger: {
            trigger: '.slider-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1.5,
        rotation: 180,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.slider-content', {
        scrollTrigger: {
            trigger: '.slider-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power3.out'
    });
    
    // Features animation
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Contact form animation
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        opacity: 0,
        x: -50,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        opacity: 0,
        x: 50,
        ease: 'power3.out'
    });
    
    // Random movement for AI agents
    setInterval(() => {
        gsap.to(".ai-agent:nth-child(1)", {
            duration: 10,
            x: "+=30",
            y: "-=20",
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        gsap.to(".ai-agent:nth-child(2)", {
            duration: 8,
            x: "-=40",
            y: "+=30",
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2
        });
        
        gsap.to(".ai-agent:nth-child(3)", {
            duration: 12,
            x: "+=20",
            y: "-=40",
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });
    }, 15000); // Repeat every 15 seconds
// Animación para los marcadores del mapa
gsap.to(".marker-dot", {
    duration: 1,
    scale: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});


// Tooltips para los marcadores
document.querySelectorAll('.location-marker').forEach(marker => {
    const city = marker.getAttribute('data-city');
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    tooltip.textContent = city;
    marker.appendChild(tooltip);
    
    marker.addEventListener('mouseenter', () => {
        gsap.to(tooltip, {
            duration: 0.3,
            opacity: 1,
            y: -20
        });
    });
    
    marker.addEventListener('mouseleave', () => {
        gsap.to(tooltip, {
            duration: 0.3,
            opacity: 0,
            y: 0
        });
    });
});


    // Animación avanzada para múltiples cohetes con movimientos aleatorios y loop
    function animateSingleRocket(rocket) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const rocketWidth = rocket.offsetWidth;
        const rocketHeight = rocket.offsetHeight;

        let startX, startY;
        const startEdge = Math.random(); // 0-0.5 para izquierda, 0.5-1 para arriba/abajo
        
        // Determinar un punto de inicio aleatorio en un borde
        if (startEdge < 0.5) { // Empieza desde la izquierda
            startX = -rocketWidth; // Completamente fuera de pantalla izquierda
            startY = Math.random() * (viewportHeight - rocketHeight); // Posición Y aleatoria
        } else { // Empieza desde arriba o abajo (aleatorio)
            startX = Math.random() * (viewportWidth - rocketWidth); // Posición X aleatoria
            startY = (Math.random() < 0.5) ? -rocketHeight : viewportHeight; // Empieza arriba o abajo
        }

        // Determinar destino aleatorio y duración
        let endX, endY;
        let duration = gsap.utils.random(2, 5); // Duración aleatoria para cada viaje (más rápido)

        const moveType = Math.random(); // 0-0.33 horizontal, 0.33-0.66 vertical, 0.66-1 diagonal

        if (moveType < 0.33) { // Movimiento horizontal
            endX = viewportWidth + rocketWidth; // Sale por la derecha
            endY = startY; // Misma altura
        } else if (moveType < 0.66) { // Movimiento vertical
            endX = startX; // Misma posición X
            endY = (startY < viewportHeight / 2) ? viewportHeight + rocketHeight : -rocketHeight; // Sale por abajo o por arriba
        } else { // Movimiento diagonal
            endX = (Math.random() < 0.5) ? viewportWidth + rocketWidth : -rocketWidth; // Sale por derecha o izquierda
            endY = (Math.random() < 0.5) ? viewportHeight + rocketHeight : -rocketHeight; // Sale por abajo o arriba
        }
        
        // Ajuste para asegurar que siempre haya un movimiento significativo
        if (Math.abs(startX - endX) < rocketWidth / 2 && Math.abs(startY - endY) < rocketHeight / 2) {
             // Si el movimiento es muy corto, fuerza un final opuesto
            if (startX < viewportWidth / 2) {
                endX = viewportWidth + rocketWidth;
            } else {
                endX = -rocketWidth;
            }
            if (startY < viewportHeight / 2) {
                endY = viewportHeight + rocketHeight;
            } else {
                endY = -rocketHeight;
            }
        }


        // Configura la posición inicial con gsap.set
        gsap.set(rocket, { x: startX, y: startY, rotation: gsap.utils.random(-10, 10) });

        // Anima el cohete
        gsap.to(rocket, {
            x: endX,
            y: endY,
            rotation: "random(-10, 10)", // Rotación aleatoria continua
            duration: duration,
            ease: "none", // Movimiento lineal para un viaje constante
            onComplete: () => animateSingleRocket(rocket) // Cuando termina, reinicia otra animación aleatoria para este cohete
        });
    }

    // Inicializar la animación para cada cohete
    const allRockets = document.querySelectorAll('.hero-rocket');
    allRockets.forEach(rocket => {
        animateSingleRocket(rocket);
    });

    // ... (El resto de tu código JavaScript) ...
});


