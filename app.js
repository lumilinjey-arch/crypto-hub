// ==========================================
// 1. Degen Cursor Trail (Эмодзи за курсором)
// ==========================================
const trailContainer = document.getElementById('cursor-trail-container');
const emojis = ['🚀', '📉', '💎', '💀', '💸'];

document.addEventListener('mousemove', (e) => {
    // Ограничиваем частоту создания, чтобы не лагало
    if (Math.random() > 0.15) return; 

    const emoji = document.createElement('div');
    emoji.className = 'trail-emoji';
    emoji.innerText = emojis[Math.random() * emojis.length | 0];
    
    // Позиция курсора
    emoji.style.left = e.clientX + 'px';
    emoji.style.top = e.clientY + 'px';
    
    trailContainer.appendChild(emoji);

    // Удаляем элемент после завершения анимации
    setTimeout(() => {
        emoji.remove();
    }, 1000);
});

// ==========================================
// 2. Fake Connect Wallet (Honeypot Modal)
// ==========================================
const connectBtn = document.getElementById('connect-wallet-btn');
const walletModal = document.getElementById('wallet-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

connectBtn.addEventListener('click', () => {
    walletModal.classList.add('active');
    connectBtn.querySelector('span').innerText = "Connecting...";
    setTimeout(() => { connectBtn.querySelector('span').innerText = "Wallet Drained"; }, 1000);
});

closeModalBtn.addEventListener('click', () => {
    walletModal.classList.remove('active');
    connectBtn.querySelector('span').innerText = "Connect Wallet";
});




// ==========================================
// Старые модули (Калькулятор, Рулетка, Отмазки, Копиум, Ползунок, Словарь)
// ==========================================

const fomoBtn = document.getElementById('fomo-btn');
const fomoAmount = document.getElementById('fomo-amount');
const fomoCoin = document.getElementById('fomo-coin');
const fomoResult = document.getElementById('fomo-result');

const multipliers = { btc: 65000 / 13, doge: 0.15 / 0.002, sol: 150 / 1.5 };

fomoBtn.addEventListener('click', () => {
    const amount = parseFloat(fomoAmount.value);
    if (isNaN(amount) || amount <= 0) { fomoResult.innerHTML = `<span style="color: #ef4444;">Enter a valid amount.</span>`; return; }
    const coin = fomoCoin.value;
    const profit = (amount * multipliers[coin]).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    fomoResult.style.opacity = 0;
    setTimeout(() => {
        fomoResult.innerHTML = `Right now you would have <br><span style="font-size: 2rem; color: #00F0FF;">${profit}</span><br>But you chose a stable job.`;
        fomoResult.style.transition = 'opacity 0.5s ease'; fomoResult.style.opacity = 1;
    }, 200);
});

const rouletteBtn = document.getElementById('roulette-btn');
const rouletteDisplay = document.getElementById('roulette-display');
const shitcoins = [
    { name: "$PEPE", desc: "Buy because the meme is funny. Outcome: -99%." },
    { name: "$DOGE", desc: "Elon Musk will definitely tweet about it (not)." },
    { name: "LUNA v3", desc: "Definitely not a scam this time. Do Kwon swears." },
    { name: "Random AI Token", desc: "It has 'GPT' in the name, so it's the future." }
];

rouletteBtn.addEventListener('click', () => {
    let ticks = 0; rouletteBtn.disabled = true; rouletteBtn.querySelector('span').innerText = "Searching...";
    const timer = setInterval(() => {
        const randomCoin = shitcoins[Math.floor(Math.random() * shitcoins.length)];
        rouletteDisplay.innerHTML = `<span style="color: #00F0FF;">${randomCoin.name}</span>`;
        ticks++;
        if (ticks >= 20) {
            clearInterval(timer);
            const finalCoin = shitcoins[Math.floor(Math.random() * shitcoins.length)];
            rouletteDisplay.innerHTML = `<span style="color: #39FF14; font-size: 2rem;">${finalCoin.name}</span><div class="desc">${finalCoin.desc}</div>`;
            rouletteBtn.disabled = false; rouletteBtn.querySelector('span').innerText = "Spin again";
        }
    }, 50);
});

const excuseBtn = document.getElementById('excuse-btn');
const excuseDisplay = document.getElementById('excuse-display');
const excuses = [
    "I was providing liquidity for a revolutionary sandwich protocol...",
    "The macroeconomic environment in the metaverse changed unexpectedly.",
    "I didn't lose money, I just converted my fiat into a long-term educational experience.",
    "My hardware wallet fell into the ocean during a boating accident.",
    "Mercury was in retrograde, which historically correlates with altcoin dips."
];

excuseBtn.addEventListener('click', () => {
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    excuseDisplay.innerHTML = ""; let i = 0; excuseBtn.disabled = true;
    const typeWriter = setInterval(() => {
        excuseDisplay.innerHTML += randomExcuse.charAt(i); i++;
        if (i >= randomExcuse.length) { clearInterval(typeWriter); excuseBtn.disabled = false; }
    }, 30);
});

const hopiumBtn = document.getElementById('hopium-btn');
const hopiumBar = document.getElementById('hopium-bar');
const hopiumText = document.getElementById('hopium-text');
let hopiumLevel = 0; let holdInterval; let decayInterval;

function fillHopium() {
    clearInterval(decayInterval);
    holdInterval = setInterval(() => {
        if (hopiumLevel < 100) {
            hopiumLevel += 2; hopiumBar.style.width = `${hopiumLevel}%`; hopiumText.innerText = `${hopiumLevel}%`;
            if (hopiumLevel >= 100) { clearInterval(holdInterval); hopiumText.innerText = "MAX HOPIUM REACHED!"; hopiumText.style.color = "#39FF14"; }
        }
    }, 50);
}
function decayHopium() {
    clearInterval(holdInterval);
    if (hopiumLevel >= 100) setTimeout(() => { hopiumText.style.color = "#fff"; }, 2000);
    decayInterval = setInterval(() => {
        if (hopiumLevel > 0) { hopiumLevel -= 1; hopiumBar.style.width = `${hopiumLevel}%`; if (hopiumLevel < 100) hopiumText.innerText = `${hopiumLevel}%`; }
        else clearInterval(decayInterval);
    }, 100);
}
hopiumBtn.addEventListener('mousedown', fillHopium); hopiumBtn.addEventListener('mouseup', decayHopium); hopiumBtn.addEventListener('mouseleave', decayHopium);
hopiumBtn.addEventListener('touchstart', (e) => { e.preventDefault(); fillHopium(); }); hopiumBtn.addEventListener('touchend', decayHopium);

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
    const val = e.target.value; sliderDisplay.innerText = val + 'x';
    const status = meterStatuses.find(s => val <= s.max);
    meterResult.innerHTML = `<h3>${status.title}</h3><p>${status.desc}</p>`;
    const red = Math.floor((val / 100) * 255); const blue = Math.floor((1 - (val / 100)) * 255);
    sliderDisplay.style.color = `rgb(${red}, 50, ${blue})`;
});

const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        accordionItems.forEach(otherItem => { if (otherItem !== item) otherItem.classList.remove('active'); });
        item.classList.toggle('active');
    });
});
// ==========================================
// 7. RUG PULL SIMULATOR
// ==========================================
const pumpBtn = document.getElementById('pump-btn');
const chart = document.getElementById('crypto-chart');

let marketCap = 1000;
let isRugged = false;
let bars = [];

pumpBtn.addEventListener('click', () => {
    // Если уже соскамились - кнопка работает как рестарт
    if (isRugged) {
        chart.innerHTML = '<div class="chart-status" id="chart-status">Market Cap: $1,000</div>';
        marketCap = 1000; isRugged = false; bars = [];
        pumpBtn.querySelector('span').innerText = "PUMP IT 🟢";
        return;
    }

    // С вероятностью 15% (начиная с 4-го клика) разработчики сливают токен
    if (bars.length > 3 && Math.random() < 0.15) {
        isRugged = true;
        chart.innerHTML = `
            <div class="chart-status" style="color: #ef4444;">LIQUIDITY DRAINED</div>
            <div class="rug-text">DEV SOLD 💀</div>
            <div class="chart-bar red" style="height: 100%;"></div>
        `;
        pumpBtn.querySelector('span').innerText = "Try again (You won't)";
        return;
    }

    // Обычный Памп
    marketCap = Math.floor(marketCap * (1.1 + Math.random() * 0.4)); // Растем на 10-50% за клик
    document.getElementById('chart-status').innerText = `Market Cap: $${marketCap.toLocaleString('en-US')}`;
    
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    
    // Вычисляем высоту свечи (чтобы она не вылезла за пределы блока)
    const height = Math.min(20 + (bars.length * 10) + (Math.random() * 30), 210);
    bar.style.height = `${height}px`;
    
    chart.appendChild(bar);
    bars.push(bar);

    // Удаляем старые свечи, если их стало слишком много на экране
    if (bars.length > 30) {
        bars[0].remove();
        bars.shift();
    }
});
// ==========================================
// 8. LIQUIDATION ENGINE
// ==========================================
const liqBtn = document.getElementById('liq-btn');
const liqResult = document.getElementById('liq-result');

liqBtn.addEventListener('click', () => {
    const entry = parseFloat(document.getElementById('liq-entry').value);
    const leverage = parseFloat(document.getElementById('liq-leverage').value);
    const pos = document.getElementById('liq-position').value;

    if (isNaN(entry) || entry <= 0) {
        liqResult.innerHTML = `<span style="color: #ef4444;">Enter a valid price.</span>`;
        return;
    }

    let liqPrice = 0;
    if (pos === 'long') {
        liqPrice = entry * (1 - (1 / leverage));
    } else {
        liqPrice = entry * (1 + (1 / leverage));
    }

    liqResult.innerHTML = `Liquidation Price: <br><span style="font-size: 2rem; color: #ef4444;">$${liqPrice.toFixed(4)}</span>`;
});

// ==========================================
// 9. IMPERMANENT LOSS CALCULATOR
// ==========================================
const ilBtn = document.getElementById('il-btn');
const ilResult = document.getElementById('il-result');

ilBtn.addEventListener('click', () => {
    const drop = parseFloat(document.getElementById('il-price-change').value);
    
    if (isNaN(drop) || drop < 0 || drop > 100) {
        ilResult.innerHTML = `<span style="color: #ef4444;">Enter a drop % (0-100).</span>`;
        return;
    }

    const lossMultiplier = (drop / 100) * 1.5; 
    const lossPercent = Math.min((drop * lossMultiplier), 99.9);

    ilResult.innerHTML = `You lost an extra <br><span style="font-size: 2rem; color: #ef4444;">${lossPercent.toFixed(2)}%</span><br>just by providing liquidity.`;
});

// ==========================================
// 10. SMART CONTRACT SCANNER
// ==========================================
const scannerBtn = document.getElementById('scanner-btn');
const scannerInput = document.getElementById('scanner-input');
const terminal = document.getElementById('scanner-terminal');

const scanLines = [
    "> Initializing connection to RPC node...",
    "> Fetching bytecode from mainnet...",
    "> Decompiling smart contract...",
    "> Analyzing ownership renouncement...",
    "> Checking liquidity lock duration...",
    "> WARNING: Mint function detected hidden in proxy...",
    "> WARNING: Blacklist capability found...",
    "> Running honeypot simulation..."
];

scannerBtn.addEventListener('click', () => {
    const addr = scannerInput.value.trim();
    if (addr.length < 5) {
        terminal.innerHTML = "<p class='warning'>> Error: Invalid contract address.</p>";
        return;
    }

    terminal.innerHTML = "";
    scannerBtn.disabled = true;
    let lineIndex = 0;

    const scanInterval = setInterval(() => {
        if (lineIndex < scanLines.length) {
            const p = document.createElement('p');
            p.innerText = scanLines[lineIndex];
            if (scanLines[lineIndex].includes("WARNING")) p.className = "warning";
            terminal.appendChild(p);
            terminal.scrollTop = terminal.scrollHeight;
            lineIndex++;
        } else {
            clearInterval(scanInterval);
            const risk = Math.floor(Math.random() * 50) + 50; // Результат всегда 50-99%
            const finalP = document.createElement('p');
            finalP.className = "warning";
            finalP.style.fontSize = "1.2rem";
            finalP.style.marginTop = "15px";
            finalP.innerText = `> AUDIT COMPLETE. Scam Risk: ${risk}%. DO NOT BUY.`;
            terminal.appendChild(finalP);
            terminal.scrollTop = terminal.scrollHeight;
            scannerBtn.disabled = false;
        }
    }, 800);
});
// ==========================================
// 11. PARALLAX CYBER SHAPES
// ==========================================
const shapesLayer = document.getElementById('cyber-shapes');

document.addEventListener('mousemove', (e) => {
    // Высчитываем сдвиг относительно центра экрана
    const moveX = (e.clientX / window.innerWidth - 0.5) * 40;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 40;
    
    // Плавно сдвигаем весь слой с фигурами в противоход мышке
    shapesLayer.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
});
// ==========================================
// 12. PREMIUM SPOTLIGHT & 3D TILT EFFECT ON CARDS
// ==========================================
const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach(card => {
    // Плавный возврат на место
    card.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Передаем координаты для "фонарика"
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Вычисляем угол наклона (максимум 5 градусов)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5; 
        const rotateY = ((x - centerX) / centerX) * 5;

        // Применяем 3D-трансформацию
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    // Когда мышка уходит — возвращаем карточку в исходное положение
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
});
// ==========================================
// 13. CYBER DUST PARTICLES
// ==========================================
const dustContainer = document.getElementById('cyber-dust');
const particleCount = 40; // Количество пылинок

for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'dust-particle';
    
    // Рандомная позиция, размер и скорость
    p.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 3 + 1;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * -20) + 's'; // Чтобы пыль была сразу при загрузке
    
    // Рандомный цвет (синий или фиолетовый)
    const color = Math.random() > 0.5 ? 'var(--accent-blue)' : 'var(--accent-purple)';
    p.style.background = color;
    p.style.boxShadow = `0 0 8px ${color}`;
    
    dustContainer.appendChild(p);
}
// ==========================================
// 14. MAGNETIC BUTTONS
// ==========================================
const magneticBtns = document.querySelectorAll('.glass-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        // Вычисляем дистанцию от центра кнопки до курсора
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Сдвигаем кнопку (коэффициент 0.3 смягчает движение)
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        // Упругий возврат на место
        btn.style.transform = `translate(0px, 0px)`;
    });
});
// ==========================================
// 15. VC PITCH GENERATOR
// ==========================================
const vcBtn = document.getElementById('vc-btn');
const vcDisplay = document.getElementById('vc-display');

const tech = ["a Zero-Knowledge Rollup", "a Synergistic AI Protocol", "an Omnichain Liquidity Layer", "a Decentralized Neural Network"];
const problem = ["optimizing Web3 lead generation", "solving fragmented liquidity", "disrupting algorithmic trading", "scaling custom hardware integrations"];
const buzz = ["powered by decentralized AI", "leveraging ZK proofs", "with built-in deflationary tokenomics", "utilizing abstract blockchain architecture"];

vcBtn.addEventListener('click', () => {
    const t = tech[Math.floor(Math.random() * tech.length)];
    const p = problem[Math.floor(Math.random() * problem.length)];
    const b = buzz[Math.floor(Math.random() * buzz.length)];
    
    vcDisplay.innerHTML = "";
    vcBtn.disabled = true;
    
    const pitch = `"We are building ${t} for ${p}, ${b}. We are raising $10M at a $100M valuation. Are you in?"`;
    let i = 0;
    
    const typeWriter = setInterval(() => {
        vcDisplay.innerHTML += pitch.charAt(i);
        i++;
        if (i >= pitch.length) {
            clearInterval(typeWriter);
            vcBtn.disabled = false;
        }
    }, 20);
});

// ==========================================
// 18. EXIT LIQUIDITY PLANNER (Take-Profit Ladder)
// ==========================================
const tpCalcBtn = document.getElementById('tp-calc-btn');
const tpLadderContainer = document.getElementById('tp-ladder-container');
const tpSummary = document.getElementById('tp-summary');

tpCalcBtn.addEventListener('click', () => {
    // Получаем базовые данные
    const tokens = parseFloat(document.getElementById('tp-tokens').value) || 0;
    const buyPrice = parseFloat(document.getElementById('tp-buy-price').value) || 0;
    
    // Получаем цели
    const t1P = parseFloat(document.getElementById('tp-price-1').value) || 0;
    const t1Pct = parseFloat(document.getElementById('tp-pct-1').value) || 0;
    
    const t2P = parseFloat(document.getElementById('tp-price-2').value) || 0;
    const t2Pct = parseFloat(document.getElementById('tp-pct-2').value) || 0;
    
    const t3P = parseFloat(document.getElementById('tp-price-3').value) || 0;
    const t3Pct = parseFloat(document.getElementById('tp-pct-3').value) || 0;

    // Простая валидация
    if (tokens <= 0 || buyPrice <= 0 || (t1Pct + t2Pct + t3Pct) > 100) {
        tpSummary.innerHTML = `<span style="color: #ef4444;">Invalid data. Check your % (must not exceed 100%).</span>`;
        return;
    }

    const initialInvestment = tokens * buyPrice;
    
    // Считаем доходы
    const rev1 = (tokens * (t1Pct / 100)) * t1P;
    const rev2 = (tokens * (t2Pct / 100)) * t2P;
    const rev3 = (tokens * (t3Pct / 100)) * t3P;
    
    const totalRevenue = rev1 + rev2 + rev3;
    const netProfit = totalRevenue - initialInvestment;
    const roi = (netProfit / initialInvestment) * 100;

    // Очищаем старую лесенку
    tpLadderContainer.innerHTML = '';

    // Строим новые ступеньки (от самой высокой цены к самой низкой)
    const targets = [
        { price: t3P, pct: t3Pct, rev: rev3, label: 'Target 3' },
        { price: t2P, pct: t2Pct, rev: rev2, label: 'Target 2' },
        { price: t1P, pct: t1Pct, rev: rev1, label: 'Target 1' }
    ].filter(t => t.pct > 0).sort((a, b) => b.price - a.price); // Сортируем по убыванию цены

    targets.forEach((t, index) => {
        const step = document.createElement('div');
        step.className = 'ladder-step';
        step.style.animationDelay = `${index * 0.2}s`;
        
        step.innerHTML = `
            <span>${t.label} (Sell ${t.pct}%)</span>
            <span style="color: var(--accent-green);">$${t.price}</span>
            <span>+$${t.rev.toLocaleString('en-US', {maximumFractionDigits: 0})}</span>
        `;
        tpLadderContainer.appendChild(step);
    });

    // Выводим результат
    tpSummary.innerHTML = `
        Total Profit: <span class="highlight">+$${netProfit.toLocaleString('en-US', {maximumFractionDigits: 0})}</span> <br>
        <span style="font-size: 1rem; color: var(--text-body);">ROI: ${roi.toLocaleString('en-US', {maximumFractionDigits: 0})}%</span>
    `;

    // 🔴 ИЗМЕНЕНИЕ ВИЗУАЛА САЙТА В ЗАВИСИМОСТИ ОТ ЖАДНОСТИ 🔴
    document.body.classList.remove('smart-mode', 'overdose-mode');

    if (roi > 1000) {
        // Жадность > 1000% (x10). Включаем передозировку.
        document.body.classList.add('overdose-mode');
        setTimeout(() => {
            alert("⚠️ HOPIUM OVERDOSE DETECTED ⚠️\n\nWake up, degen. You are hallucinating. Adjust your targets before you become exit liquidity.");
        }, 1500);
    } else if (roi > 0 && roi <= 500) {
        // Умный трейд (до x5). Включаем дзен-режим.
        document.body.classList.add('smart-mode');
    }
});
// ==========================================
// 19. "WEN RETIRE" COMPOUNDING ENGINE
// ==========================================
const retireCalcBtn = document.getElementById('retire-calc-btn');
const compoundChart = document.getElementById('compound-chart');
const retireSummary = document.getElementById('retire-summary');
const retireVerdict = document.getElementById('retire-verdict');

retireCalcBtn.addEventListener('click', () => {
    const initial = parseFloat(document.getElementById('retire-initial').value) || 0;
    const monthly = parseFloat(document.getElementById('retire-monthly').value) || 0;
    const apy = parseFloat(document.getElementById('retire-apy').value) || 0;
    const years = parseFloat(document.getElementById('retire-years').value) || 0;

    if (years <= 0 || years > 50) {
        retireSummary.innerHTML = `<span style="color: #ef4444; font-size: 1.2rem;">Years must be between 1 and 50. You are mortal.</span>`;
        return;
    }

    compoundChart.innerHTML = ''; 
    
    let currentBalance = initial;
    let totalInvested = initial;
    const monthlyRate = apy / 100 / 12;
    const dataPoints = [];

    for (let y = 1; y <= years; y++) {
        for (let m = 1; m <= 12; m++) {
            currentBalance += monthly;
            currentBalance += currentBalance * monthlyRate;
            totalInvested += monthly;
        }
        dataPoints.push({
            year: y,
            invested: totalInvested,
            balance: currentBalance,
            interest: currentBalance - totalInvested
        });
    }

    const finalBalance = dataPoints[dataPoints.length - 1].balance;
    const maxBalance = finalBalance; 
    const formattedBal = finalBalance.toLocaleString('en-US', {maximumFractionDigits: 0});

    // Отрисовка колонок графика
    dataPoints.forEach((data, index) => {
        const col = document.createElement('div');
        col.className = 'chart-col';
        
        const principalHeight = (data.invested / maxBalance) * 100;
        const interestHeight = (data.interest / maxBalance) * 100;

        col.innerHTML = `
            <div class="chart-tooltip">
                Year ${data.year}<br>
                Total: $${data.balance.toLocaleString('en-US', {maximumFractionDigits: 0})}<br>
                Invested: $${data.invested.toLocaleString('en-US', {maximumFractionDigits: 0})}<br>
                Profit: $${data.interest.toLocaleString('en-US', {maximumFractionDigits: 0})}
            </div>
            <div class="chart-interest" style="height: 0%;"></div>
            <div class="chart-principal" style="height: 0%;"></div>
        `;
        
        compoundChart.appendChild(col);

        // Каскадная анимация (каждый столбец вырастает чуть позже предыдущего)
        setTimeout(() => {
            col.querySelector('.chart-interest').style.height = `${interestHeight}%`;
            col.querySelector('.chart-principal').style.height = `${principalHeight}%`;
        }, 50 + (index * 30)); 
    });

    retireSummary.innerHTML = `Total Value: <span class="highlight">$${formattedBal}</span>`;

    // Динамический мемный вердикт с реальными цифрами
    let verdict = "";
    if (finalBalance < 10000) {
        verdict = `Status: With $${formattedBal}, you're still applying for jobs at Wendy's. Keep grinding.`;
    } else if (finalBalance < 100000) {
        verdict = `Status: $${formattedBal}? You can buy a used Honda Civic and a lifetime supply of ramen.`;
    } else if (finalBalance < 1000000) {
        verdict = `Status: $${formattedBal} makes you a middle-class degen. You survived, but wen lambo?`;
    } else if (finalBalance < 5000000) {
        verdict = `Status: $${formattedBal}! MILLIONAIRE. You can finally tell your boss to kick rocks. 🏎️`;
    } else {
        verdict = `Status: WHALE ALERT 🐋. $${formattedBal} is generational wealth. Watch out for boating accidents.`;
    }
    retireVerdict.innerHTML = verdict;
});
// ==========================================
// 20. BOOT SEQUENCE PRELOADER
// ==========================================
const preloader = document.getElementById('preloader');
const preloaderText = document.getElementById('preloader-text');
const bootLines = [
    "> Bypassing SEC regulations...", 
    "> Injecting Hopium directly into the DOM...", 
    "> Connecting to Web3 node...", 
    "> Decrypting wallet seed phrases (just kidding)...", 
    "> ACCESS GRANTED. WAGMI."
];
let bootLineIdx = 0;

// Печатаем строки по очереди
const bootInterval = setInterval(() => {
    if (bootLineIdx < bootLines.length) {
        const p = document.createElement('div');
        p.className = 'preloader-line';
        p.innerText = bootLines[bootLineIdx];
        preloaderText.appendChild(p);
        bootLineIdx++;
    } else {
        clearInterval(bootInterval);
        // Через полсекунды после последней строки плавно скрываем экран
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500); // Удаляем из кода
        }, 600);
    }
}, 300);

// ==========================================
// 21. CYBER GRID SCROLL PARALLAX
// ==========================================
const cyberGrid = document.getElementById('cyber-grid');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // При скролле сетка движется, создавая эффект полета вперед
    if(cyberGrid) cyberGrid.style.backgroundPositionY = `${scrollY * 0.5}px`;
});

// ==========================================
// 22. LASER EYES EASTER EGG (DOUBLE CLICK)
// ==========================================
const laserLeft = document.getElementById('laser-left');
const laserRight = document.getElementById('laser-right');
const pepeImg = document.querySelector('.pepe-img');
let lasersActive = false;

// Включение / выключение по двойному клику
document.addEventListener('dblclick', (e) => {
    // Чтобы не включалось, если кликаешь по инпуту
    if(e.target.tagName === 'INPUT') return; 
    
    lasersActive = !lasersActive;
    if (lasersActive) {
        laserLeft.classList.add('active');
        laserRight.classList.add('active');
    } else {
        laserLeft.classList.remove('active');
        laserRight.classList.remove('active');
    }
});

// Лучи тянутся за курсором
document.addEventListener('mousemove', (e) => {
    if (!lasersActive || !pepeImg) return;
    
    const rect = pepeImg.getBoundingClientRect();
    
    // Приблизительные координаты глаз относительно размера картинки Пепе
    const leftEyeX = rect.left + rect.width * 0.57;
    const leftEyeY = rect.top + rect.height * 0.40;
    
    const rightEyeX = rect.left + rect.width * 0.81;
    const rightEyeY = rect.top + rect.height * 0.35;
    
    // Функция расчета угла и длины лазера
    const updateLaser = (laser, eyeX, eyeY) => {
        const dx = e.clientX - eyeX;
        const dy = e.clientY - eyeY;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        laser.style.left = `${eyeX}px`;
        laser.style.top = `${eyeY}px`;
        laser.style.width = `${distance}px`;
        laser.style.transform = `rotate(${angle}deg)`;
    };
    
    updateLaser(laserLeft, leftEyeX, leftEyeY);
    updateLaser(laserRight, rightEyeX, rightEyeY);
});
// ==========================================
// 23. BULLETPROOF SEAMLESS TICKER
// ==========================================
const tickerTrack = document.getElementById('ticker-track');
const tickerContent = tickerTrack.querySelector('.ticker-content');

// Полностью клонируем весь блок с новостями (все 14 штук разом)
const contentClone = tickerContent.cloneNode(true);

// Вставляем второй такой же блок в трек
tickerTrack.appendChild(contentClone);
// ==========================================
// 8. MECHANICAL SFX (Thock Sounds)
// ==========================================
// Используем короткий звук щелчка механики при каждом клике на любую кнопку
const thockSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
thockSound.volume = 0.5;

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        // Клонируем звук, чтобы можно было кликать быстро подряд
        thockSound.cloneNode().play().catch(() => {}); 
    });
});

// ==========================================
// 1. COPIUM VISUALIZER
// ==========================================
const copiumSlider = document.getElementById('copium-slider');
const copiumLost = document.getElementById('copium-lost');
const copiumEmoji = document.getElementById('copium-emoji');
const copiumText = document.getElementById('copium-text');

copiumSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    copiumLost.innerText = val.toLocaleString('en-US');
    
    if (val < 100) { copiumEmoji.innerText = "🍔"; copiumText.innerText = "A value meal."; }
    else if (val < 1000) { copiumEmoji.innerText = "👟"; copiumText.innerText = "Some fake Jordans."; }
    else if (val < 10000) { copiumEmoji.innerText = "🚗"; copiumText.innerText = "A beat-up Honda Civic."; }
    else if (val < 50000) { copiumEmoji.innerText = "🎓"; copiumText.innerText = "Pay off your student loans."; }
    else if (val < 250000) { copiumEmoji.innerText = "🏠"; copiumText.innerText = "A down payment on a house."; }
    else if (val < 900000) { copiumEmoji.innerText = "🏎️"; copiumText.innerText = "A Lamborghini Huracan."; }
    else { copiumEmoji.innerText = "🏝️"; copiumText.innerText = "A private island. You ruined your life."; }
});

// ==========================================
// 2. SHITCOIN GENERATOR
// ==========================================
const scamBtn = document.getElementById('scam-gen-btn');
const scamDisplay = document.getElementById('scam-display');
const prefixes = ["Safe", "Elon", "Baby", "Floki", "ZK", "Omni", "Quantum", "Pepe"];
const suffixes = ["Moon", "Inu", "Cum", "Rocket", "AI", "Doge", "Yield", "GPT"];

scamBtn.addEventListener('click', () => {
    const name = prefixes[Math.floor(Math.random()*prefixes.length)] + suffixes[Math.floor(Math.random()*suffixes.length)];
    const ticker = "$" + name.substring(0, 4).toUpperCase();
    const tax = Math.floor(Math.random() * 15) + 5;
    
    scamDisplay.innerHTML = `
        <span style="color: var(--accent-green); font-size: 1.5rem; font-weight: bold;">${name} (${ticker})</span><br>
        <br>Buy Tax: ${tax}% | Sell Tax: 99%<br>
        Utility: "We are building a decentralized metaverse AI layer."<br>
        <span style="color: #ef4444;">Status: Dev already dumped.</span>
    `;
});

// ==========================================
// 4. FOUNDER APOLOGY GENERATOR
// ==========================================
const apologyBtn = document.getElementById('apology-btn');
const apologyDisplay = document.getElementById('apology-display');

const apologyText = `"Dear Community.\n\nIt is with a heavy heart that we announce a security incident. A highly sophisticated attacker (probably a 14-year-old on Discord) drained $50M from our liquidity pools.\n\nWe take security VERY seriously, which is why we had our smart contracts audited by ChatGPT.\n\nFunds are NOT SAFU. We will launch a V2 token tomorrow and airdrop you 0.01% of your lost value.\n\nThanks for being our exit liquidity."`;

apologyBtn.addEventListener('click', () => {
    apologyDisplay.innerHTML = "";
    apologyBtn.disabled = true;
    let i = 0;
    
    const typeWriter = setInterval(() => {
        apologyDisplay.innerHTML += apologyText.charAt(i);
        i++;
        if (i >= apologyText.length) {
            clearInterval(typeWriter);
            apologyBtn.disabled = false;
        }
    }, 25); // Скорость печати
});

// ==========================================
// 3. DAYS WITHOUT A RUGPULL (FIXED TIMER)
// ==========================================
let rugSec = 0, rugMin = 0, rugHr = 0;
const rugClock = document.getElementById('rug-clock');
const rugTimerBox = document.getElementById('rug-timer');

if (rugClock && rugTimerBox) {
    setInterval(() => {
        // Шанс скама
        if (Math.random() < 0.03 && (rugSec > 5 || rugMin > 0)) {
            rugSec = 0; rugMin = 0; rugHr = 0;
            rugTimerBox.style.borderColor = '#ef4444';
            rugClock.style.color = '#ef4444';
            rugClock.innerText = "HACKED!";
            
            // Через 2 секунды возвращаем всё в норму
            setTimeout(() => {
                rugTimerBox.style.borderColor = 'var(--accent-purple)';
                rugClock.style.color = 'var(--accent-green)';
                rugClock.innerText = "00:00:00"; // ВОТ ЭТА СТРОКА РЕШАЕТ ПРОБЛЕМУ ЗАВИСАНИЯ
            }, 2000);
            return;
        }
        
        rugSec++;
        if(rugSec >= 60) { rugSec = 0; rugMin++; }
        if(rugMin >= 60) { rugMin = 0; rugHr++; }
        
        if(rugClock.innerText !== "HACKED!") {
            rugClock.innerText = 
                (rugHr < 10 ? "0"+rugHr : rugHr) + ":" + 
                (rugMin < 10 ? "0"+rugMin : rugMin) + ":" + 
                (rugSec < 10 ? "0"+rugSec : rugSec);
        }
    }, 1000);
}

// ==========================================
// 9. TELEPORTING AIRDROP BUTTON (SMOOTH RETURN)
// ==========================================
const airdropBtn = document.getElementById('airdrop-btn');
let airdropResetTimer; // Переменная для таймера возврата

if (airdropBtn) {
    const flee = (e) => {
        if (e.type === 'touchstart') e.preventDefault(); 
        
        // Делаем прыжок быстрым при наведении
        airdropBtn.style.transition = 'top 0.2s ease-out, left 0.2s ease-out';
        
        const x = Math.max(10, Math.random() * (window.innerWidth - 180));
        const y = Math.max(10, Math.random() * (window.innerHeight - 60));
        
        airdropBtn.style.left = `${x}px`;
        airdropBtn.style.top = `${y}px`;
        airdropBtn.style.bottom = 'auto'; // Отвязываем от нижнего края
        
        // Сбрасываем старый таймер, если пользователь продолжает гоняться за кнопкой
        clearTimeout(airdropResetTimer);
        
        // Устанавливаем таймер на 5 секунд бездействия
        airdropResetTimer = setTimeout(() => {
            // Делаем возврат плавным и долгим (1.5 секунды)
            airdropBtn.style.transition = 'all 1.5s ease-in-out';
            airdropBtn.style.left = '20px';
            airdropBtn.style.top = 'auto';
            airdropBtn.style.bottom = '80px';
        }, 5000);
    };

    airdropBtn.addEventListener('mouseover', flee);
    airdropBtn.addEventListener('touchstart', flee, {passive: false});
}

// ==========================================
// 10. TOUCH GRASS EASTER EGG (GUARANTEED FIX)
// ==========================================
const grassBtn = document.getElementById('grass-btn');
const grassOverlay = document.getElementById('grass-overlay');

if (grassBtn && grassOverlay) {
    grassBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        // Включаем заставку
        grassOverlay.style.opacity = '1';
        
        // Плавно выключаем через 5 секунд
        setTimeout(() => { 
            grassOverlay.style.opacity = '0'; 
        }, 5000);
    });
}