/* ========================================
   PORTAFOLIO SEBASTIAN ZAMBRANO
   JavaScript - Funcionalidades Interactivas
   Comentários em Português
   ======================================== */

// ===== MENÚ MÓVIL =====
// Funcionalidad para abrir/cerrar menú en dispositivos móviles

document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Evento para abrir/cerrar menú al hacer clic en el botón
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animar las líneas del botón hamburguesa
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translate(10px, 10px)' 
                : 'rotate(0)';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translate(7px, -7px)' 
                : 'rotate(0)';
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Resetear animación del botón hamburguesa
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0)';
        });
    });
});

// ===== SCROLL SUAVE Y NAVEGACIÓN ACTIVA =====
// Resaltar el enlace de navegación activo según la sección visible

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');
    
    // Función para actualizar el enlace activo
    function updateActiveLink() {
        let currentSection = '';
        
        // Encontrar la sección actualmente visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Actualizar clase activa en los enlaces
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Llamar función al hacer scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Llamar función al cargar la página
    updateActiveLink();
});

// ===== ANIMACIÓN DE NÚMEROS EN SCROLL =====
// Animar números de métricas cuando se hacen visibles

document.addEventListener('DOMContentLoaded', function() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    let hasAnimated = false;
    
    function animateNumbers() {
        // Verificar si la sección de métricas es visible
        const heroMetrics = document.querySelector('.hero-metrics');
        if (!heroMetrics) return;
        
        const rect = heroMetrics.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        // Solo animar una vez
        if (isVisible && !hasAnimated) {
            hasAnimated = true;
            
            metricNumbers.forEach(element => {
                // Extraer el número del texto
                const text = element.textContent;
                const number = parseInt(text);
                
                if (!isNaN(number)) {
                    // Animar de 0 al número final
                    let current = 0;
                    const increment = number / 30; // 30 frames de animación
                    
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            element.textContent = text; // Mostrar texto original
                            clearInterval(interval);
                        } else {
                            element.textContent = Math.floor(current) + '+';
                        }
                    }, 30);
                }
            });
        }
    }
    
    // Ejecutar animación al hacer scroll
    window.addEventListener('scroll', animateNumbers);
    // Ejecutar al cargar la página
    animateNumbers();
});

// ===== ANIMACIÓN FADE-IN EN SCROLL =====
// Animar elementos cuando entran en la vista

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Crear observador para elementos
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase de animación cuando el elemento es visible
                entry.target.classList.add('animate-fade-in');
                // Dejar de observar el elemento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos con clases específicas
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .project-card, .highlight-card'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// ===== VALIDACIÓN Y ENVÍO DE FORMULARIO =====
// Manejar envío de formulario de contacto (si existe)

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form[name="contact"]');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.querySelector('input[name="name"]').value;
            const email = document.querySelector('input[name="email"]').value;
            const message = document.querySelector('textarea[name="message"]').value;
            
            // Validación básica
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Por favor, completa todos los campos');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un email válido');
                return;
            }
            
            // Aquí se podría enviar el formulario a un servidor
            console.log('Formulario válido:', { name, email, message });
            alert('¡Mensaje enviado! Te contactaremos pronto.');
            contactForm.reset();
        });
    }
});

// ===== EFECTO HOVER EN TARJETAS =====
// Agregar efectos visuales en hover para tarjetas

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .project-card, .contact-card');
    
    cards.forEach(card => {
        // Efecto de sombra mejorada en hover
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// ===== SCROLL SUAVE PARA ENLACES INTERNOS =====
// Implementar scroll suave nativo (fallback para navegadores antiguos)

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si el href es solo "#", no hacer nada
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Usar scroll suave nativo si está disponible
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== CONTADOR DE SCROLL =====
// Mostrar indicador de progreso de scroll (opcional)

document.addEventListener('DOMContentLoaded', function() {
    // Crear barra de progreso
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #FF8C42, #0A1F3C);
        z-index: 999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Actualizar ancho de la barra según el scroll
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// ===== LAZY LOADING DE IMÁGENES =====
// Cargar imágenes solo cuando sean visibles (mejora de rendimiento)

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sin IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// ===== DETECCIÓN DE TEMA OSCURO =====
// Aplicar tema oscuro si el sistema lo prefiere

document.addEventListener('DOMContentLoaded', function() {
    // Verificar preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.style.colorScheme = 'dark';
    }
    
    // Escuchar cambios en la preferencia del sistema
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            document.documentElement.style.colorScheme = e.matches ? 'dark' : 'light';
        });
    }
});

// ===== FUNCIONES AUXILIARES =====

// Función para desplazarse a una sección específica
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Función para obtener el año actual (útil para footer)
function getCurrentYear() {
    return new Date().getFullYear();
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para copiar texto al portapapeles
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    }
}

// ===== INICIALIZACIÓN GENERAL =====
// Ejecutar funciones de inicialización cuando el DOM esté listo

console.log('Portafolio de Sebastian Zambrano cargado correctamente');
console.log('Versión: 2.0 - Minimalismo Corporativo Moderno');
