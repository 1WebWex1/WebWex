const questions = [
    {
        question: "Чем вы занимаетесь?",
        options: [
            { text: "🧠 Психолог, коуч или консультант", type: "blog", platform: "any" },
            { text: "📚 Репетитор или онлайн-преподаватель", type: "multi", platform: "any" },
            { text: "🔧 Сантехник, мастер по ремонту или бытовые услуги", type: "landing", platform: "any" },
            { text: "🏪 Малый бизнес с товарами или большим прайсом", type: "catalog", platform: "any" }
        ]
    },
    {
        question: "Какая главная цель сайта прямо сейчас?",
        options: [
            { text: "Быстро запустить рекламу и получать заявки на 1–2 услуги", type: "landing", platform: "any" },
            { text: "Подробно рассказать о себе, услугах, дипломах и ценах", type: "multi", platform: "any" },
            { text: "Показать ассортимент товаров или пакетных тарифов", type: "catalog", platform: "any" },
            { text: "Вести экспертный блог, публиковать статьи и привлекать людей из поиска", type: "blog", platform: "any" }
        ]
    },
    {
        question: "Сколько примерно разделов или позиций планируется?",
        options: [
            { text: "Всё на одной странице — кратко и по делу", type: "landing", platform: "any" },
            { text: "3–6 отдельных страниц (Главная, Обо мне, Услуги, Отзывы, Контакты)", type: "multi", platform: "any" },
            { text: "Много карточек товаров или услуг с фильтрацией", type: "catalog", platform: "any" },
            { text: "Постоянно обновляемая лента статей и кейсов", type: "blog", platform: "any" }
        ]
    },
    {
        question: "Какой способ разработки вам ближе?",
        options: [
            { text: "На Tilda — хочу запустить быстрее и сэкономить 20%", type: "none", platform: "tilda" },
            { text: "Индивидуальный код (HTML/CSS/JS) — без ежемесячной оплаты конструктора", type: "none", platform: "code" },
            { text: "Пока не решил(а), покажите оба варианта", type: "none", platform: "both" }
        ]
    },
    {
        question: "Понадобится ли помощь с рекламой и обновлением сайта после запуска?",
        options: [
            { text: "Да, хочу продвижение и регулярную техподдержку", support: "full" },
            { text: "Хватит базовой бесплатной поддержки (30 мин/мес)", support: "free" },
            { text: "Пока нужен только сам сайт", support: "none" }
        ]
    }
];

const resultsData = {
    landing: {
        title: "Одностраничный сайт (Landing Page)",
        desc: "Идеальное решение для быстрого старта и приема заявок. Вся информация о ваших услугах, преимуществах, ценах и контактах расположена на одной продающей странице.",
        priceCode: "от 9 999 ₽",
        priceTilda: "от 7 999 ₽ (-20%)",
        bonus: "🎁 В подарок подключим удобные кнопки связи в ВКонтакте, Telegram и WhatsApp!"
    },
    multi: {
        title: "Многостраничный сайт",
        desc: "Солидный сайт с отдельными страницами под каждую услугу, кейсы и информацию о специалисте. Вызывает максимум доверия у клиентов и отлично продвигается в поиске.",
        priceCode: "от 18 999 ₽",
        priceTilda: "от 15 199 ₽ (-20%)",
        bonus: "🎁 Базовая SEO-оптимизация всех страниц включена в стоимость!"
    },
    catalog: {
        title: "Сайт-каталог",
        desc: "Удобная онлайн-витрина с карточками ваших товаров или услуг, описаниями и быстрым заказом. Клиенты легко найдут нужную позицию и оставят заявку.",
        priceCode: "от 21 999 ₽",
        priceTilda: "от 17 599 ₽ (-20%)",
        bonus: "🎁 Настроим удобную панель, чтобы вы могли легко менять цены и добавлять позиции!"
    },
    blog: {
        title: "Сайт-блог для эксперта",
        desc: "Лучший формат для психологов, коучей и репетиторов. Вы сможете публиковать полезные статьи, прогревать аудиторию и получать органический трафик из Яндекса и Google.",
        priceCode: "от 23 999 ₽",
        priceTilda: "от 19 199 ₽ (-20%)",
        bonus: "🎁 Бонус по тарифу: первые 2 недели техподдержки абсолютно бесплатно!"
    }
};

let currentStep = 0;
const userAnswers = [];

const questionTitle = document.getElementById('question-title');
const optionsList = document.getElementById('options-list');
const btnPrev = document.getElementById('btn-prev');
const stepCounter = document.getElementById('step-counter');
const stepPercent = document.getElementById('step-percent');
const progressFill = document.getElementById('progress-fill');
const questionScreen = document.getElementById('question-screen');
const progressWrap = document.getElementById('progress-wrap');
const resultScreen = document.getElementById('result-screen');

function renderQuestion() {
    const q = questions[currentStep];
    questionTitle.textContent = q.question;
    optionsList.innerHTML = '';

    const percent = Math.round(((currentStep + 1) / questions.length) * 100);
    stepCounter.textContent = `Вопрос ${currentStep + 1} из ${questions.length}`;
    stepPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;

    btnPrev.disabled = currentStep === 0;

    q.options.forEach((opt, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'option-btn';
        if (userAnswers[currentStep] === index) {
            button.classList.add('selected');
        }
        button.textContent = opt.text;

        button.addEventListener('click', () => {
            userAnswers[currentStep] = index;
            if (currentStep < questions.length - 1) {
                currentStep++;
                renderQuestion();
            } else {
                showResult();
            }
        });

        optionsList.appendChild(button);
    });
}

btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderQuestion();
    }
});

function showResult() {
    const scores = { landing: 0, multi: 0, catalog: 0, blog: 0 };
    let chosenPlatform = 'both';

    userAnswers.forEach((ansIndex, qIndex) => {
        const option = questions[qIndex].options[ansIndex];
        if (option.type && scores[option.type] !== undefined) {
            scores[option.type]++;
        }
        if (option.platform && option.platform !== 'any') {
            chosenPlatform = option.platform;
        }
    });

    // Определяем тип сайта с максимальным баллом
    let bestType = 'landing';
    let maxScore = -1;
    for (const [key, val] of Object.entries(scores)) {
        if (val > maxScore) {
            maxScore = val;
            bestType = key;
        }
    }

    const res = resultsData[bestType];

    questionScreen.classList.add('hidden');
    progressWrap.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    document.getElementById('result-title').textContent = res.title;
    document.getElementById('result-desc').textContent = res.desc;
    document.getElementById('result-price-code').textContent = res.priceCode;
    document.getElementById('result-price-tilda').textContent = res.priceTilda;
    document.getElementById('result-bonus').textContent = res.bonus;

    let platformText = '';
    if (chosenPlatform === 'tilda') platformText = ' (на Tilda -20%)';
    if (chosenPlatform === 'code') platformText = ' (разработка кодом)';

    const finalLabel = `${res.title}${platformText}`;
    const orderBtn = document.getElementById('order-quiz-btn');
    orderBtn.href = `../index.html?quiz_result=${encodeURIComponent(finalLabel)}#contacts`;
}

document.getElementById('btn-restart').addEventListener('click', () => {
    currentStep = 0;
    userAnswers.length = 0;
    resultScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    progressWrap.classList.remove('hidden');
    renderQuestion();
});

renderQuestion();
