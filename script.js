document.addEventListener('DOMContentLoaded', () => {
    // Configuración e inicialización de partículas interactivas
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    
    // Efecto de desplazamiento para el fondo
    const backgroundText = document.querySelector('.background-text');
    let position = 0;
    
    function animateBackground() {
        position -= 0.5;
        backgroundText.style.backgroundPosition = `${position}px ${position}px`;
        requestAnimationFrame(animateBackground);
    }
    
    animateBackground();
    
    // Implementación de la animación de texto desencriptado para "IARUIK"
    const mainTitle = document.querySelector('.main-title');
    const originalText = mainTitle.textContent;
    let animationInProgress = false;
    
    // Función para generar caracteres aleatorios
    function getRandomChar() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Función para iniciar la animación de desencriptado
    function startDecryptEffect() {
        if (animationInProgress) return;
        animationInProgress = true;
        
        // Limpiar el contenido actual
        mainTitle.innerHTML = '';
        mainTitle.classList.add('decrypt-animation');
        
        // Crear un span para cada carácter
        const chars = originalText.split('');
        const charElements = [];
        
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.classList.add('decrypt-char');
            span.textContent = getRandomChar();
            span.dataset.originalChar = char;
            span.dataset.index = index;
            mainTitle.appendChild(span);
            charElements.push(span);
        });
        
        // Iniciar la animación de desencriptado
        let iteration = 0;
        const maxIterations = 10;
        
        const interval = setInterval(() => {
            iteration++;
            
            charElements.forEach((span, index) => {
                // Probabilidad de que el carácter se "desencripte" en esta iteración
                const shouldReveal = Math.random() < iteration / maxIterations || iteration === maxIterations;
                
                if (shouldReveal && span.textContent !== span.dataset.originalChar) {
                    span.textContent = span.dataset.originalChar;
                    span.style.color = '#fff';
                    span.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
                    
                    // Animación de revelación
                    span.animate([
                        { transform: 'scale(1.5)', opacity: 0.7 },
                        { transform: 'scale(1)', opacity: 1 }
                    ], {
                        duration: 600,
                        easing: 'cubic-bezier(0.33, 1, 0.68, 1)'
                    });
                } else if (!shouldReveal && span.textContent !== span.dataset.originalChar) {
                    span.textContent = getRandomChar();
                }
            });
            
            // Detener la animación después de completar las iteraciones
            if (iteration >= maxIterations) {
                clearInterval(interval);
                
                // Restaurar el estilo original después de un tiempo
                setTimeout(() => {
                    charElements.forEach(span => {
                        span.style.color = '';
                        span.style.textShadow = '';
                    });
                    animationInProgress = false;
                }, 1000);
            }
        }, 100);
    }
    
    // Iniciar la animación al cargar la página
    setTimeout(startDecryptEffect, 500);
    
    // Configurar la repetición de la animación cada 5 segundos
    setInterval(startDecryptEffect, 5000);
    
    // Mantener el evento de clic para permitir al usuario iniciar la animación manualmente
    mainTitle.addEventListener('click', startDecryptEffect);
    
    // Crear el fondo de ondas
    createWavesBackground();
    
    function createWavesBackground() {
        const wavesContainer = document.createElement('div');
        wavesContainer.classList.add('waves-background');
        
        // Crear múltiples capas de ondas
        for (let i = 0; i < 4; i++) {
            const waveLayer = document.createElement('div');
            waveLayer.classList.add('wave-layer');
            waveLayer.classList.add(`wave-layer-${i + 1}`);
            wavesContainer.appendChild(waveLayer);
        }
        
        // Insertar el contenedor de ondas antes del primer hijo del body
        document.body.insertBefore(wavesContainer, document.body.firstChild);
    }
    
    // Efecto de movimiento del contenedor de vidrio con el movimiento del ratón
    const contentContainer = document.querySelector('.content');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Movimiento suave del contenedor
        contentContainer.style.transform = `
            translate(
                ${(mouseX - 0.5) * 10}px, 
                ${(mouseY - 0.5) * 10}px
            )
        `;
        
        // Efecto de brillo dinámico en los bordes
        contentContainer.style.boxShadow = `
            0 4px 30px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(255, 255, 255, ${0.05 + mouseY * 0.1}),
            ${(mouseX - 0.5) * 20}px ${(mouseY - 0.5) * 20}px 30px rgba(0, 0, 0, 0.3)
        `;
    });
    
    // Efecto de desenfoque dinámico para el fondo
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Calcular la distancia desde el centro
        const distanceFromCenter = Math.sqrt(
            Math.pow(mouseX - 0.5, 2) + 
            Math.pow(mouseY - 0.5, 2)
        );
        
        // Ajustar el desenfoque basado en la distancia
        const blurAmount = 5 + distanceFromCenter * 15;
        
        // Aplicar el desenfoque al contenedor
        contentContainer.style.backdropFilter = `blur(${blurAmount}px)`;
        contentContainer.style.webkitBackdropFilter = `blur(${blurAmount}px)`;
    });
}); 