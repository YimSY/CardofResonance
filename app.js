// State Management
const state = {
    currentDeck: null,
    currentLevel: 1,
    cardsPlayedInLevel: 0,
    deckQueue: [],
    players: 2,
    lightMode: false,
    isSolo: false
};

// DOM Elements
const app = document.getElementById('app');

// Utility: Shuffle Array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// View Navigation
function navigateTo(viewId, context = {}) {
    // Clear App
    app.innerHTML = '';

    // Get Template
    const template = document.getElementById(`view-${viewId}`);
    const clone = template.content.cloneNode(true);

    // Setup View Logic
    if (viewId === 'home') setupHomeView(clone);
    if (viewId === 'setup') setupSetupView(clone, context);
    if (viewId === 'game') setupGameView(clone);
    if (viewId === 'decompression') setupDecompressionView(clone);

    app.appendChild(clone);

    // Trigger Animation
    setTimeout(() => {
        const view = app.querySelector('.view');
        view.classList.add('active');
    }, 10);
}

// --- HOME VIEW ---
function setupHomeView(view) {
    const grid = view.querySelector('.deck-grid');

    decks.forEach(deck => {
        const card = document.createElement('div');
        card.className = `deck-card ${deck.theme}`;
        card.innerHTML = `
            <h3>${deck.name}</h3>
            <p>${deck.description}</p>
        `;
        card.onclick = () => navigateTo('setup', { deck });
        grid.appendChild(card);
    });
}

// --- SETUP VIEW ---
function setupSetupView(view, { deck }) {
    state.currentDeck = deck;
    view.querySelector('#setup-deck-name').textContent = deck.name;
    view.querySelector('.view').classList.add(deck.theme);

    // Player Count Logic
    const btns = view.querySelectorAll('.toggle-btn');
    btns.forEach(btn => {
        btn.onclick = () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.players = btn.dataset.value;
            state.isSolo = state.players === '1';
        };
    });

    // Light Mode Logic
    const lightModeToggle = view.querySelector('#light-mode-toggle');
    lightModeToggle.onchange = (e) => state.lightMode = e.target.checked;

    // Start Game
    view.querySelector('.start-btn').onclick = () => {
        initializeGame();
        navigateTo('game');
    };

    // Back
    view.querySelector('.back-btn').onclick = () => navigateTo('home');
}

// --- GAME LOGIC ---
function initializeGame() {
    state.currentLevel = 1;
    state.cardsPlayedInLevel = 0;

    // Flatten and Shuffle Cards per Level
    const level1 = shuffle([...state.currentDeck.levels[1]]);
    const level2 = shuffle([...state.currentDeck.levels[2]]);
    const level3 = shuffle([...state.currentDeck.levels[3]]);

    // Filter Logic (Light Mode)
    const filterFn = card => !state.lightMode || !card.tags?.includes('#Heavy');

    state.deckQueue = [
        ...level1.filter(filterFn).map(c => ({ ...c, level: 1 })),
        ...level2.filter(filterFn).map(c => ({ ...c, level: 2 })),
        ...level3.filter(filterFn).map(c => ({ ...c, level: 3 }))
    ];

    console.log("Game Initialized. Queue length:", state.deckQueue.length);
}

function setupGameView(view) {
    const container = view.querySelector('.view');
    container.classList.add(state.currentDeck.theme);

    // Safety Check
    if (state.deckQueue.length === 0) {
        console.error("Deck queue is empty!");
        alert("Error: Deck is empty. Please try another deck.");
        navigateTo('home');
        return;
    }

    // Initial Card Render
    renderNextCard(container);

    // Long Press Logic
    const btn = view.querySelector('#connect-btn');
    let pressTimer;
    let isPressing = false;

    const startPress = (e) => {
        if (e.type === 'mousedown' && e.button !== 0) return; // Only left click
        if (isPressing) return;

        e.preventDefault(); // Prevent ghost clicks
        isPressing = true;
        btn.classList.add('pressing');

        pressTimer = setTimeout(() => {
            if (navigator.vibrate) navigator.vibrate(50);
            // Query live DOM for completion
            const activeView = document.querySelector('.view-game');
            if (activeView) completeCard(activeView);
            isPressing = false;
        }, 800);
    };

    const cancelPress = (e) => {
        if (!isPressing) return;
        e.preventDefault();
        isPressing = false;
        btn.classList.remove('pressing');
        clearTimeout(pressTimer);
    };

    btn.addEventListener('mousedown', startPress);
    btn.addEventListener('touchstart', startPress, { passive: false });
    btn.addEventListener('mouseup', cancelPress);
    btn.addEventListener('mouseleave', cancelPress);
    btn.addEventListener('touchend', cancelPress);
    btn.addEventListener('touchcancel', cancelPress);
    btn.addEventListener('contextmenu', e => e.preventDefault());

    // Dig Deeper
    view.querySelector('.dig-deeper-btn').onclick = () => {
        // Query live DOM
        const activeCard = document.querySelector('#active-card');
        if (activeCard) activeCard.querySelector('.card-subtext').classList.toggle('visible');
    };

    // Pass Button
    if (state.currentDeck.id === 'mending') {
        const passBtn = view.querySelector('.pass-btn');
        passBtn.classList.remove('hidden');
        passBtn.onclick = () => {
            const activeView = document.querySelector('.view-game');
            if (activeView) renderNextCard(activeView);
        };
    }

    // Menu
    view.querySelector('.menu-btn').onclick = () => {
        if (confirm("End session?")) navigateTo('decompression');
    };
}

function renderNextCard(viewElement) {
    if (state.deckQueue.length === 0) {
        navigateTo('decompression');
        return;
    }

    let card = state.deckQueue.shift();

    if (card.level > state.currentLevel) {
        state.currentLevel = card.level;
        state.cardsPlayedInLevel = 0;
        updateLevelIndicators(viewElement);
    }

    const cardEl = viewElement.querySelector('#active-card');
    const qEl = cardEl.querySelector('.card-question');
    const subEl = cardEl.querySelector('.card-subtext');
    const levelEl = cardEl.querySelector('.card-level');

    let qText = card.q;
    if (state.isSolo) {
        qText = qText.replace(/you/g, "I").replace(/your/g, "my");
    }

    qEl.textContent = qText;
    subEl.textContent = card.sub;
    subEl.classList.remove('visible');
    levelEl.textContent = `Level ${card.level}`;

    // Timer Logic
    const timerContainer = cardEl.querySelector('.timer-container');
    if (timerContainer) timerContainer.remove();

    if (card.type === 'timer') {
        const timerEl = document.createElement('div');
        timerEl.className = 'timer-container';
        timerEl.innerHTML = `
            <div class="timer-circle">
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" class="timer-bg"></circle>
                    <circle cx="50" cy="50" r="45" class="timer-progress"></circle>
                </svg>
                <span class="timer-text">${card.duration}s</span>
            </div>
            <button class="btn-secondary start-timer-btn">Start Timer</button>
        `;
        cardEl.querySelector('.card-content').appendChild(timerEl);

        const startBtn = timerEl.querySelector('.start-timer-btn');
        const progressCircle = timerEl.querySelector('.timer-progress');
        const timerText = timerEl.querySelector('.timer-text');

        startBtn.onclick = () => {
            startBtn.classList.add('hidden');
            let timeLeft = card.duration;

            progressCircle.style.animation = 'none';
            progressCircle.offsetHeight;
            progressCircle.style.animation = `countdown ${timeLeft}s linear forwards`;

            const interval = setInterval(() => {
                timeLeft--;
                timerText.textContent = `${timeLeft}s`;
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    timerText.textContent = "Done";
                }
            }, 1000);
        };
    }

    cardEl.style.transform = 'scale(0.95) translateY(10px)';
    cardEl.style.opacity = '0';
    setTimeout(() => {
        cardEl.style.transform = 'scale(1) translateY(0)';
        cardEl.style.opacity = '1';
    }, 50);
}

function completeCard(viewElement) {
    state.cardsPlayedInLevel++;
    const btn = viewElement.querySelector('#connect-btn');
    if (btn) btn.classList.remove('pressing');
    renderNextCard(viewElement);
}

function updateLevelIndicators(view) {
    const dots = view.querySelectorAll('.level-dot');
    dots.forEach((dot, i) => {
        if (i < state.currentLevel) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

// --- DECOMPRESSION VIEW ---
function setupDecompressionView(view) {
    view.querySelector('.home-btn').onclick = () => navigateTo('home');
}

// Init
navigateTo('home');
