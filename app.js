// ==========================================
// 1. THREE.JS - ИНТЕРАКТИВНЫЙ 3D ФОН
// ==========================================
const canvasContainer = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
canvasContainer.appendChild(renderer.domElement);

// Создаем сложный узел (TorusKnot) из тонких неоновых линий
const geometry = new THREE.TorusKnotGeometry(10, 2, 100, 16);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00F0FF, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

camera.position.z = 25;

// Реакция на мышь
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);
    
    // Медленное базовое вращение
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.005;

    // Легкий наклон за курсором мыши
    torusKnot.rotation.x += mouseY * 0.01;
    torusKnot.rotation.y += mouseX * 0.01;

    renderer.render(scene, camera);
}
animate();

// Адаптивность 3D при ресайзе окна
window.addEventListener('resize', () => {
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
});


// ==========================================
// 2. FOMO CALCULATOR
// ==========================================
const fomoBtn = document.getElementById('fomo-btn');
const fomoAmount = document.getElementById('fomo-amount');
const fomoCoin = document.getElementById('fomo-coin');
const fomoResult = document.getElementById('fomo-result');

const multipliers = {
    btc: 65000 / 13, 
    doge: 0.15 / 0.002, 
    sol: 150 / 1.5 
};

fomoBtn.addEventListener('click', () => {
    const amount = parseFloat(fomoAmount.value);
    if (isNaN(amount) || amount <= 0) {
        fomoResult.innerHTML = `<span style="color: #ef4444;">Enter a valid amount.</span>`;
        return;
    }
    const coin = fomoCoin.value;
    const profit = (amount * multipliers[coin]).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    
    fomoResult.style.opacity = 0;
    setTimeout(() => {
        fomoResult.innerHTML = `Right now you would have <br><span style="font-size: 2rem; color: #00F0FF;">${profit}</span><br>But you chose a stable job.`;
        fomoResult.style.transition = 'opacity 0.5s ease';
        fomoResult.style.opacity = 1;
    }, 200);
});


// ==========================================
// 3. SHITCOIN ROULETTE
// ==========================================
const rouletteBtn = document.getElementById('roulette-btn');
const rouletteDisplay = document.getElementById('roulette-display');

const shitcoins = [
    { name: "$PEPE", desc: "Buy because the meme is funny. Outcome: -99%." },
    { name: "$DOGE", desc: "Elon Musk will definitely tweet about it (not)." },
    { name: "LUNA v3", desc: "Definitely not a scam this time. Do Kwon swears." },
    { name: "Random AI Token", desc: "It has 'GPT' in the name, so it's the future." }
];

rouletteBtn.addEventListener('click', () => {
    let ticks = 0;
    rouletteBtn.disabled = true;
    rouletteBtn.innerText = "Searching...";

    const timer = setInterval(() => {
        const randomCoin = shitcoins[Math.floor(Math.random() * shitcoins.length)];
        rouletteDisplay.innerHTML = `${randomCoin.name}`;
        ticks++;

        if (ticks >= 20) {
            clearInterval(timer);
            const finalCoin = shitcoins[Math.floor(Math.random() * shitcoins.length)];
            rouletteDisplay.innerHTML = `<span style="color: #7C3AED;">${finalCoin.name}</span><div class="desc">${finalCoin.desc}</div>`;
            rouletteBtn.disabled = false;
            rouletteBtn.innerText = "Spin again";
        }
    }, 50);
});


// ==========================================
// 4. LEVERAGE METER (SLIDER)
// ==========================================
const leverageSlider = document.getElementById('leverage-slider');
const sliderDisplay = document.getElementById('slider-display');
const meterResult = document.getElementById('meter-result');

const meterStatuses = [
    { max: 10, title: "Spot Trader 🐢", desc: "You sleep well at night, but you'll never buy a Lambo." },
    { max: 25, title: "Average Ape 🦍", desc: "You like a little risk. Your portfolio swings 20% daily." },
    { max: 50, title: "Casino Resident 🎰", desc: "You check charts in the shower. Sleep is for the weak." },
    { max: 100, title: "Max Leverage Degen 💀", desc: "Liquidation email incoming in 3... 2... 1..." }
];

leverageSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    sliderDisplay.innerText = val + 'x';
    
    const status = meterStatuses.find(s => val <= s.max);
    
    meterResult.innerHTML = `
        <h3>${status.title}</h3>
        <p>${status.desc}</p>
    `;
    
    // Меняем цвет от синего к красному по мере роста плеча
    const red = Math.floor((val / 100) * 255);
    const blue = Math.floor((1 - (val / 100)) * 255);
    sliderDisplay.style.color = `rgb(${red}, 50, ${blue})`;
});


// ==========================================
// 5. ACCORDION (GLOSSARY)
// ==========================================
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        // Закрываем другие
        accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Переключаем текущий
        item.classList.toggle('active');
    });
});