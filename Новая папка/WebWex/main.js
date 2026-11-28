document.addEventListener('DOMContentLoaded', () => {
    // 1. Плавное появление элементов при прокрутке страницы
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Передача выбранного тарифа в блок обратной связи при нажатии «Заказать»
    const orderButtons = document.querySelectorAll('[data-order]');
    const selectedTariffText = document.getElementById('selected-tariff-text');

    orderButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tariffName = btn.getAttribute('data-order');
            if (selectedTariffText && tariffName) {
                selectedTariffText.innerHTML = `Вы выбрали: <u>${tariffName}</u>.<br>Напишите нам в ВКонтакте или Instagram — закрепим за вами условия и начнем работу!`;
                selectedTariffText.classList.add('highlighted');
            }
        });
    });

    // 3. Проверка, если пользователь перешел с квиза с готовым результатом
    const urlParams = new URLSearchParams(window.location.search);
    const quizResult = urlParams.get('quiz_result');
    if (quizResult && selectedTariffText) {
        selectedTariffText.innerHTML = `По результатам квиза вам подходит: <u>${decodeURIComponent(quizResult)}</u>.<br>Напишите нам в ВКонтакте или Instagram, чтобы обсудить детали!`;
        selectedTariffText.classList.add('highlighted');
    }
});
