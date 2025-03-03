document.addEventListener('DOMContentLoaded', () => {
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
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
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
    
    const backgroundText = document.querySelector('.background-text');
    let position = 0;
    
    function animateBackground() {
        position -= 0.5;
        backgroundText.style.backgroundPosition = `${position}px ${position}px`;
        requestAnimationFrame(animateBackground);
    }
    
    animateBackground();
    
    const mainTitle = document.querySelector('.main-title');
    const originalText = mainTitle.textContent;
    let animationInProgress = false;
    
    function getRandomChar() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    function startDecryptEffect() {
        if (animationInProgress) return;
        animationInProgress = true;
        
        mainTitle.innerHTML = '';
        mainTitle.classList.add('decrypt-animation');
        
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
        
        let iteration = 0;
        const maxIterations = 10;
        
        const interval = setInterval(() => {
            iteration++;
            
            charElements.forEach((span, index) => {
                const shouldReveal = Math.random() < iteration / maxIterations || iteration === maxIterations;
                
                if (shouldReveal && span.textContent !== span.dataset.originalChar) {
                    span.textContent = span.dataset.originalChar;
                    span.style.color = '#fff';
                    span.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
                    
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
            
            if (iteration >= maxIterations) {
                clearInterval(interval);
                
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
    
    setTimeout(startDecryptEffect, 500);
    
    setInterval(startDecryptEffect, 5000);
    
    mainTitle.addEventListener('click', startDecryptEffect);
    
    createWavesBackground();
    
    function createWavesBackground() {
        const wavesContainer = document.createElement('div');
        wavesContainer.classList.add('waves-background');
        
        for (let i = 0; i < 4; i++) {
            const waveLayer = document.createElement('div');
            waveLayer.classList.add('wave-layer');
            waveLayer.classList.add(`wave-layer-${i + 1}`);
            wavesContainer.appendChild(waveLayer);
        }
        
        document.body.insertBefore(wavesContainer, document.body.firstChild);
    }
    
    const contentContainer = document.querySelector('.content');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        contentContainer.style.transform = `
            translate(
                ${(mouseX - 0.5) * 10}px, 
                ${(mouseY - 0.5) * 10}px
            )
        `;
        
        contentContainer.style.boxShadow = `
            0 4px 30px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(255, 255, 255, ${0.05 + mouseY * 0.1}),
            ${(mouseX - 0.5) * 20}px ${(mouseY - 0.5) * 20}px 30px rgba(0, 0, 0, 0.3)
        `;
    });
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const distanceFromCenter = Math.sqrt(
            Math.pow(mouseX - 0.5, 2) + 
            Math.pow(mouseY - 0.5, 2)
        );
        
        const blurAmount = 5 + distanceFromCenter * 15;
        
        contentContainer.style.backdropFilter = `blur(${blurAmount}px)`;
        contentContainer.style.webkitBackdropFilter = `blur(${blurAmount}px)`;
    });
    
    const gameContainer = document.querySelector('.game-container');
    const memoryGrid = document.querySelector('.memory-grid');
    const scoreElement = document.querySelector('.game-score');
    const startScreen = document.querySelector('.start-screen');

    let gameStarted = false;
    let attempts = 0;
    let flippedCards = [];
    let matchedPairs = 0;

    const emojiCategories = {
        animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'],
        food: ['🍎', '🍕', '🍔', '🌮', '🍦', '🍩', '🍪', '🍫', '🍿', '🥤', '🧃', '🍺'],
        sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🏊', '🚴'],
        nature: ['🌸', '🌹', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵', '🍄'],
        objects: ['📱', '💻', '⌚', '📷', '🎮', '🎧', '👑', '💍', '💎', '🔑', '🎁', '💡'],
        expressions: ['😀', '😎', '🤓', '😍', '🥳', '😴', '🤔', '😅', '😂', '🥺', '😱', '🤯']
    };

    function getRandomEmojis(count) {
        const categories = Object.keys(emojiCategories);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const emojis = emojiCategories[randomCategory];
        
        return shuffleArray([...emojis])
            .slice(0, count)
            .reduce((pairs, emoji) => [...pairs, emoji, emoji], []); 
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCards() {
        const gameEmojis = shuffleArray(getRandomEmojis(6)); 
        memoryGrid.innerHTML = '';
        
        gameEmojis.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.cardIndex = index;
            
            const front = document.createElement('div');
            front.className = 'card-front';
            front.innerHTML = '❓';
            
            const back = document.createElement('div');
            back.className = 'card-back';
            back.innerHTML = emoji;
            
            card.appendChild(front);
            card.appendChild(back);
            
            card.addEventListener('click', () => flipCard(card));
            memoryGrid.appendChild(card);
        });
    }

    function flipCard(card) {
        if (!gameStarted || flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        card.classList.add('flipped');
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            attempts++;
            scoreElement.textContent = `Tries: ${attempts}`;
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const match = card1.querySelector('.card-back').innerHTML === card2.querySelector('.card-back').innerHTML;
        
        if (match) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            
            if (matchedPairs === 6) { 
                setTimeout(() => {
                    showGameOver();
                }, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
        }
        
        setTimeout(() => {
            flippedCards = [];
        }, 1000);
    }

    function showGameOver() {
        startScreen.classList.remove('hidden');
        startScreen.querySelector('.start-text').textContent = `Won in ${attempts} tries!\nClick to play again`;
        gameStarted = false;
    }

    function startGame() {
        gameStarted = true;
        attempts = 0;
        matchedPairs = 0;
        flippedCards = [];
        scoreElement.textContent = 'Tries: 0';
        startScreen.classList.add('hidden');
        createCards();
    }

    startScreen.addEventListener('click', startGame);

    createCards();
}); 
