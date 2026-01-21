const steps = [
    {
      location: "📍 Москва, 1927 — Дом Мельникова",
      text: "Перед тобой жилой дом. Каким он должен быть?",
      options: [
        { text: "Функциональным", result: "Да. Форма подчиняется функции — ключевая идея конструктивизма." },
        { text: "Красивым", result: "Красота здесь вторична. Главное — как дом работает." },
        { text: "Декоративным", result: "Авангард отказался от декора как пережитка прошлого." }
      ]
    },
    {
      location: "📍 Дом культуры",
      text: "Для чего существует это здание?",
      options: [
        { text: "Для образования", result: "Да. Культура как инструмент развития." },
        { text: "Для красоты", result: "Красота — не самоцель." },
        { text: "Для статуса", result: "Статус не важен в новом обществе." }
      ]
    },
    {
      location: "📍 Город будущего",
      text: "Какой главный принцип этого города?",
      options: [
        { text: "Функция", result: "Ты мыслишь как авангардист." },
        { text: "Традиция", result: "Традиция не ведёт к будущему." },
        { text: "Украшение", result: "Декор — лишний элемент." }
      ]
    },
    {
      location: "📍 Жилой комплекс",
      text: "Как должна быть организована квартира?",
      options: [
        { text: "Свободная планировка", result: "Да. Гибкость пространства — принцип Баухауза." },
        { text: "Фиксированные комнаты", result: "Старые перегородки ограничивают функциональность." },
        { text: "С большими залами", result: "Открытые пространства важны, но не за счёт комфорта." }
      ]
    },
    {
      location: "📍 Свет и воздух",
      text: "Что важнее в планировке города?",
      options: [
        { text: "Освещение и вентиляция", result: "Здоровье жителей — приоритет авангарда." },
        { text: "Плотная застройка", result: "Теснота не способствует прогрессу." },
        { text: "Исторический стиль", result: "Стиль не заменит комфорт и гигиену." }
      ]
    },
    {
      location: "📍 Дом-коммуна",
      text: "Как организовать быт в новом обществе?",
      options: [
        { text: "Коллективные сервисы", result: "Да. Обобществление быта — путь к равенству." },
        { text: "Индивидуальные квартиры", result: "Индивидуализм противоречит коммунистическим идеям." },
        { text: "Роскошные особняки", result: "Роскошь — признак классового неравенства." }
      ]
    },
    {
      location: "📍 Баухауз",
      text: "Как соединить искусство и ремесло?",
      options: [
        { text: "В едином процессе", result: "Баухауз объединил дизайн, искусство и производство." },
        { text: "Отдельно друг от друга", result: "Разделение ведёт к элитарности искусства." },
        { text: "Только для элиты", result: "Искусство должно служить всем людям." }
      ]
    }
  ];
  
  let currentStep = 0;
  let gameStarted = false;

  const introEl = document.getElementById("intro");
  const appEl = document.getElementById("app");
  const locationEl = document.getElementById("location");
  const textEl = document.getElementById("text");
  const buttonsEl = document.getElementById("buttons");
  const nextBtn = document.getElementById("nextBtn");

  function startGame() {
    if (gameStarted) return;
    gameStarted = true;

    // Анимация перехода от intro к игре
    introEl.classList.add('screen-transition-out');

    setTimeout(() => {
      introEl.style.display = 'none';
      appEl.style.display = 'block';
      appEl.classList.add('screen-transition-in');

      setTimeout(() => {
        appEl.classList.remove('screen-transition-in');
        renderStep();
      }, 600);
    }, 300);
  }

  // Экспортируем функцию в глобальную область
  window.startGame = startGame;

function renderStep() {
    const step = steps[currentStep];

    // Добавляем класс выхода для текущего контента
    locationEl.classList.add('content-exit');
    textEl.classList.add('content-exit');
    buttonsEl.classList.add('content-exit');

    setTimeout(() => {
      locationEl.innerText = step.location;
      textEl.innerText = step.text;
      buttonsEl.innerHTML = "";
      nextBtn.style.display = "none";
      nextBtn.classList.remove('show');

      // Убираем классы выхода и добавляем входа
      locationEl.classList.remove('content-exit');
      textEl.classList.remove('content-exit');
      buttonsEl.classList.remove('content-exit');

      locationEl.classList.add('content-enter');
      textEl.classList.add('content-enter');
      buttonsEl.classList.add('content-enter');

      step.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option.text;
        btn.style.animationDelay = `${1 + index * 0.1}s`;
        btn.onclick = () => selectOption(option.result);
        buttonsEl.appendChild(btn);
      });

      // Убираем классы входа через некоторое время
      setTimeout(() => {
        locationEl.classList.remove('content-enter');
        textEl.classList.remove('content-enter');
        buttonsEl.classList.remove('content-enter');
      }, 600);
    }, 300);
  }
  
  function selectOption(resultText) {
    // Добавляем анимацию для кнопок при выборе
    const buttons = buttonsEl.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.classList.add('button-selected');
      setTimeout(() => btn.classList.remove('button-selected'), 400);
    });

    // Плавная смена текста с анимацией
    textEl.classList.add('text-change');
    setTimeout(() => {
      textEl.innerText = resultText;
      textEl.classList.remove('text-change');
      textEl.classList.add('content-enter');

      setTimeout(() => {
        textEl.classList.remove('content-enter');
      }, 600);
    }, 200);

    // Плавное исчезновение кнопок
    buttonsEl.classList.add('content-exit');
    setTimeout(() => {
      buttonsEl.innerHTML = "";
      buttonsEl.classList.remove('content-exit');

      // Плавное появление кнопки "Дальше"
      setTimeout(() => {
        nextBtn.style.display = "block";
        nextBtn.classList.add('show');
      }, 300);
    }, 300);
  }
  
  function nextStep() {
    currentStep++;
    if (currentStep < steps.length) {
      renderStep();
    } else {
      finishGame();
    }
  }
  
  function finishGame() {
    // Анимация выхода текущего контента
    locationEl.classList.add('content-exit');
    textEl.classList.add('content-exit');
    buttonsEl.classList.add('content-exit');

    setTimeout(() => {
      locationEl.innerText = "ГОТОВО";
      textEl.innerText =
        "Ты прошёл город будущего глазами авангарда. Архитектура здесь — не украшение, а инструмент мышления.";
      buttonsEl.innerHTML = "";
      nextBtn.style.display = "none";
      nextBtn.classList.remove('show');

      // Анимация входа финального контента
      locationEl.classList.remove('content-exit');
      textEl.classList.remove('content-exit');
      buttonsEl.classList.remove('content-exit');

      locationEl.classList.add('content-enter');
      textEl.classList.add('content-enter');

      setTimeout(() => {
        locationEl.classList.remove('content-enter');
        textEl.classList.remove('content-enter');
      }, 600);
    }, 300);
  }
  
  // игра запускается через startGame()