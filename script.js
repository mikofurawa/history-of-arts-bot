// Проверка наличия Telegram Web App API (для локального тестирования)
if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
  // Инициализация Telegram Mini App
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

const steps = [
    {
      location: "📍 Москва, 1927 — Дом Мельникова",
      text: "Перед тобой жилой дом. Каким он должен быть?",
      options: [
        { text: "Функциональным", result: "Да. Форма подчиняется функции — ключевая идея конструктивизма.", correct: true },
        { text: "Красивым", result: "Красота здесь вторична. Главное — как дом работает.", correct: false },
        { text: "Декоративным", result: "Авангард отказался от декора как пережитка прошлого.", correct: false }
      ]
    },
    {
      location: "📍 Дом культуры",
      text: "Для чего существует это здание?",
      options: [
        { text: "Для образования", result: "Да. Культура как инструмент развития.", correct: true },
        { text: "Для красоты", result: "Красота — не самоцель.", correct: false },
        { text: "Для статуса", result: "Статус не важен в новом обществе.", correct: false }
      ]
    },
    {
      location: "📍 Город будущего",
      text: "Какой главный принцип этого города?",
      options: [
        { text: "Функция", result: "Ты мыслишь как авангардист.", correct: true },
        { text: "Традиция", result: "Традиция не ведёт к будущему.", correct: false },
        { text: "Украшение", result: "Декор — лишний элемент.", correct: false }
      ]
    },
    {
      location: "📍 Жилой комплекс",
      text: "Как должна быть организована квартира?",
      options: [
        { text: "Свободная планировка", result: "Да. Гибкость пространства — принцип Баухауза.", correct: true },
        { text: "Фиксированные комнаты", result: "Старые перегородки ограничивают функциональность.", correct: false },
        { text: "С большими залами", result: "Открытые пространства важны, но не за счёт комфорта.", correct: false }
      ]
    },
    {
      location: "📍 Свет и воздух",
      text: "Что важнее в планировке города?",
      options: [
        { text: "Освещение и вентиляция", result: "Здоровье жителей — приоритет авангарда.", correct: true },
        { text: "Плотная застройка", result: "Теснота не способствует прогрессу.", correct: false },
        { text: "Исторический стиль", result: "Стиль не заменит комфорт и гигиену.", correct: false }
      ]
    },
    {
      location: "📍 Дом-коммуна",
      text: "Как организовать быт в новом обществе?",
      options: [
        { text: "Коллективные сервисы", result: "Да. Обобществление быта — путь к равенству.", correct: true },
        { text: "Индивидуальные квартиры", result: "Индивидуализм противоречит коммунистическим идеям.", correct: false },
        { text: "Роскошные особняки", result: "Роскошь — признак классового неравенства.", correct: false }
      ]
    },
    {
      location: "📍 Баухауз",
      text: "Как соединить искусство и ремесло?",
      options: [
        { text: "В едином процессе", result: "Баухауз объединил дизайн, искусство и производство.", correct: true },
        { text: "Отдельно друг от друга", result: "Разделение ведёт к элитарности искусства.", correct: false },
        { text: "Только для элиты", result: "Искусство должно служить всем людям.", correct: false }
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
  const questionGif = document.getElementById("questionGif");
  const kittyGif = document.getElementById("kittyGif");
  
  // Устанавливаем финальную позицию GIF один раз при загрузке и перемещаем в body если нужно
  if (questionGif) {
    // Перемещаем GIF в body, чтобы она была независима от контента
    if (questionGif.parentElement !== document.body) {
      document.body.appendChild(questionGif);
    }
    // Устанавливаем фиксированную позицию
    questionGif.style.position = 'fixed';
    questionGif.style.bottom = '10px';
    questionGif.style.left = '50%';
    questionGif.style.transform = 'translateX(-50%)';
    questionGif.style.width = '100%';
    questionGif.style.maxWidth = '600px';
    questionGif.style.zIndex = '100';
  }

  // Устанавливаем финальную позицию для второй GIF
  if (kittyGif) {
    // Перемещаем GIF в body, чтобы она была независима от контента
    if (kittyGif.parentElement !== document.body) {
      document.body.appendChild(kittyGif);
    }
    // Устанавливаем фиксированную позицию
    kittyGif.style.position = 'fixed';
    kittyGif.style.bottom = '10px';
    kittyGif.style.left = '50%';
    kittyGif.style.transform = 'translateX(-50%)';
    kittyGif.style.width = '100%';
    kittyGif.style.maxWidth = '600px';
    kittyGif.style.zIndex = '100';
  }

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
      
      // Убираем классы правильного/неправильного ответа при переходе к новому шагу
      textEl.classList.remove('correct-answer');
      textEl.classList.remove('wrong-answer');

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
        btn.onclick = () => selectOption(option.result, index);
        buttonsEl.appendChild(btn);
      });

      // Показываем GIF под кнопками после их создания (без классов анимации, чтобы не конфликтовало с фиксированной позицией)
      setTimeout(() => {
        // Убеждаемся, что GIF в body (независима от контента)
        if (questionGif.parentElement !== document.body) {
          document.body.appendChild(questionGif);
        }
        // Устанавливаем фиксированную позицию ПЕРЕД показом
        questionGif.style.cssText = `
          position: fixed !important;
          bottom: 10px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: 100% !important;
          max-width: 600px !important;
          z-index: 100 !important;
          opacity: 0;
          display: block;
          pointer-events: none;
        `;
        // Плавное появление через opacity после небольшой задержки
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            questionGif.style.opacity = '1';
          });
        });
      }, 600);

      // Убираем классы входа через некоторое время
      setTimeout(() => {
        locationEl.classList.remove('content-enter');
        textEl.classList.remove('content-enter');
        buttonsEl.classList.remove('content-enter');
      }, 1200);
    }, 300);
  }
  
  // Функция для создания эффекта конфетти
  function showFanfare() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    // Получаем позицию текста для размещения конфетти
    const textRect = textEl.getBoundingClientRect();
    const centerX = textRect.left + textRect.width / 2;
    const centerY = textRect.top + textRect.height / 2;

    // Цвета для конфетти
    const colors = ['#27ae60', '#3498db', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];
    
    // Создаем множество частиц конфетти
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      
      // Случайный цвет
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      
      // Случайный размер
      const size = Math.random() * 8 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Начальная позиция в центре текста
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      
      // Случайное направление разлета
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 300 + 200;
      const xVelocity = Math.cos(angle) * velocity;
      const yVelocity = Math.sin(angle) * velocity;
      
      // Случайная задержка анимации
      const delay = Math.random() * 0.3;
      particle.style.animationDelay = delay + 's';
      
      // Сохраняем скорость для анимации
      particle.style.setProperty('--x-velocity', xVelocity + 'px');
      particle.style.setProperty('--y-velocity', yVelocity + 'px');
      
      container.appendChild(particle);
    }

    // Удаляем контейнер после анимации
    setTimeout(() => {
      container.remove();
    }, 3000);
  }

  function selectOption(resultText, selectedIndex) {
    const step = steps[currentStep];
    const selectedOption = step.options[selectedIndex];
    const isCorrect = selectedOption.correct;

    // Добавляем анимацию для кнопок при выборе
    const buttons = buttonsEl.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.classList.add('button-selected');
      setTimeout(() => btn.classList.remove('button-selected'), 400);
    });

    // Если ответ правильный, показываем эффект фанфар
    if (isCorrect) {
      setTimeout(() => {
        showFanfare();
      }, 300);
    }

    // Плавная смена текста с анимацией
    textEl.classList.add('text-change');
    setTimeout(() => {
      if (!isCorrect) {
        // Если ответ неправильный, показываем правильный ответ
        const correctOption = step.options.find(opt => opt.correct);
        textEl.innerText = `Неправильно. Правильный ответ: "${correctOption.text}". \n\n ${selectedOption.result}`;
        textEl.classList.add('wrong-answer');
        textEl.classList.remove('correct-answer');
      } else {
        // Если ответ правильный
        textEl.innerText = resultText;
        textEl.classList.add('correct-answer');
        textEl.classList.remove('wrong-answer');
      }

      textEl.classList.remove('text-change');
      textEl.classList.add('content-enter');

      setTimeout(() => {
        textEl.classList.remove('content-enter');
        if (!isCorrect) {
          textEl.classList.remove('wrong-answer');
        }
        // Зеленый цвет и шрифт остаются для правильного ответа
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
    // Скрываем GIF на финальном экране
    questionGif.style.display = "none";
    
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

      // Показываем вторую GIF на финальном экране
      if (kittyGif) {
        // Убеждаемся, что GIF в body
        if (kittyGif.parentElement !== document.body) {
          document.body.appendChild(kittyGif);
        }
        // Устанавливаем фиксированную позицию
        kittyGif.style.cssText = `
          position: fixed !important;
          bottom: 10px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: 100% !important;
          max-width: 600px !important;
          z-index: 100 !important;
          opacity: 0;
          display: block;
          pointer-events: none;
        `;
        // Плавное появление
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            kittyGif.style.opacity = '1';
          });
        });
      }

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