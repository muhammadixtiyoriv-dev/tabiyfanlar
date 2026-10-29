
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=85",
    title: "Tabiat — bizning boyligimiz",
    text: "Har bir daraxt, daryo va tirik mavjudot sayyoramiz uchun muhim.",
    tag: "01 / TABIAT",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=85",
    title: "Yashil kelajak sari",
    text: "Bugun ekilgan bitta daraxt ertangi kunimizga katta foyda keltiradi.",
    tag: "02 / YASHIL HAYOT",
  },
  {
    image:
      "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1400&q=85",
    title: "Suvni asrash — hayotni asrash",
    text: "Suvni tejash orqali tabiat va kelajak avlodni himoya qilamiz.",
    tag: "03 / TOZA SUV",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85",
    title: "O‘rmonlarni himoya qilaylik",
    text: "Sog‘lom o‘rmonlar toza havo va boy tabiatning muhim qismidir.",
    tag: "04 / O‘RMON",
  },
];

// ============================
// CAROUSEL
// ============================

const carouselImage = document.querySelector("#carousel-image");
const carouselTitle = document.querySelector("#carousel-title");
const carouselText = document.querySelector("#carousel-text");
const carouselTag = document.querySelector("#carousel-tag");
const carouselDots = document.querySelector("#carousel-dots");
const carouselThumbnails = document.querySelector("#carousel-thumbnails");

let currentSlide = 0;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  const slide = slides[currentSlide];

  carouselImage.src = slide.image;
  carouselImage.alt = slide.title;
  carouselTitle.textContent = slide.title;
  carouselText.textContent = slide.text;
  carouselTag.textContent = slide.tag;

  // Nuqtalar
  document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });

  // Kichik rasmlar
  document.querySelectorAll(".thumbnail").forEach((thumbnail, i) => {
    thumbnail.classList.toggle("active", i === currentSlide);
  });
}

function createCarouselControls() {
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `${index + 1}-rasmga o'tish`);

    dot.addEventListener("click", () => {
      showSlide(index);
    });

    carouselDots.appendChild(dot);

    const thumbnail = document.createElement("button");
    thumbnail.className = "thumbnail";

    thumbnail.innerHTML = `
      <img src="${slide.image}" alt="${slide.title}" loading="lazy">
      <div>
        <small>${slide.tag}</small>
        <strong>${slide.title}</strong>
      </div>
    `;

    thumbnail.addEventListener("click", () => {
      showSlide(index);
    });

    carouselThumbnails.appendChild(thumbnail);
  });

  showSlide(0);
}

document.querySelector("#prev-slide").addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

document.querySelector("#next-slide").addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

createCarouselControls();

// ============================
// ECOLOGY QUIZ
// ============================

const questions = [
  {
    question: "Qaysi gaz ko‘pchilik tirik organizmlarning nafas olishi uchun zarur?",
    options: ["Azot", "Kislorod", "Geliy", "Vodorod"],
    answer: 1,
    info: "Kislorod ko‘pchilik tirik organizmlarning nafas olishi uchun zarur.",
  },
  {
    question: "Plastik chiqindilarni kamaytirishning yaxshi yo‘li qaysi?",
    options: [
      "Daryoga tashlash",
      "Ko‘mib yuborish",
      "Qayta foydalanish",
      "Ko‘proq plastik olish",
    ],
    answer: 2,
    info: "Buyumlarni qayta ishlatish va chiqindilarni saralash atrof-muhitga tushadigan chiqindilarni kamaytiradi.",
  },
  {
    question: "Orol dengizi nega keskin qisqargan?",
    options: [
      "Daraxtlar ko‘paygani uchun",
      "Daryo suvlari sug‘orishga ko‘p yo‘naltirilgani uchun",
      "Yomg‘ir ko‘paygani uchun",
      "Baliqlar ko‘paygani uchun",
    ],
    answer: 1,
    info: "Amudaryo va Sirdaryo suvlarining katta qismi sug‘orishga burilishi Orol dengizining qisqarishiga olib kelgan asosiy sabablardan biridir.",
  },
  {
    question: "Suvni tejash uchun nima qilish kerak?",
    options: [
      "Jo‘mrakni ochiq qoldirish",
      "Suvni bekorga oqizish",
      "Oqayotgan jo‘mrakni tuzatish",
      "Toza suvni ifloslantirish",
    ],
    answer: 2,
    info: "Oqayotgan jo‘mrakni tuzatish va suvdan ehtiyotkorlik bilan foydalanish isrofni kamaytiradi.",
  },
  {
    question: "Ekologiya nimani o‘rganadi?",
    options: [
      "Faqat sayyoralarni",
      "Organizmlar va atrof-muhit munosabatlarini",
      "Faqat avtomobillarni",
      "Faqat tarixni",
    ],
    answer: 1,
    info: "Ekologiya tirik organizmlar va ularning atrof-muhit bilan munosabatlarini o‘rganadi.",
  },
];

const startScreen = document.querySelector("#quiz-start");
const playScreen = document.querySelector("#quiz-play");
const resultScreen = document.querySelector("#quiz-result");

const startButton = document.querySelector("#start-game");
const restartButton = document.querySelector("#restart-game");
const nextButton = document.querySelector("#next-question");

const questionCount = document.querySelector("#question-count");
const questionText = document.querySelector("#question-text");
const answerOptions = document.querySelector("#answer-options");
const answerFeedback = document.querySelector("#answer-feedback");
const scoreElement = document.querySelector("#score");
const progressBar = document.querySelector("#quiz-progress-bar");

const finalScore = document.querySelector("#final-score");
const resultTitle = document.querySelector("#result-title");
const resultMessage = document.querySelector("#result-message");
const resultEmoji = document.querySelector("#result-emoji");

let questionIndex = 0;
let score = 0;
let selectedAnswer = null;

function startGame() {
  questionIndex = 0;
  score = 0;
  selectedAnswer = null;

  startScreen.hidden = true;
  resultScreen.hidden = true;
  playScreen.hidden = false;

  scoreElement.textContent = score;
  renderQuestion();
}

function renderQuestion() {
  const question = questions[questionIndex];

  selectedAnswer = null;

  questionCount.textContent =
    `Savol ${questionIndex + 1} / ${questions.length}`;

  questionText.textContent = question.question;

  progressBar.style.width =
    `${((questionIndex + 1) / questions.length) * 100}%`;

  answerOptions.innerHTML = "";
  answerFeedback.hidden = true;
  answerFeedback.className = "feedback";
  nextButton.hidden = true;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "answer-option";

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = option;

    button.append(letter, text);

    button.addEventListener("click", () => {
      chooseAnswer(index);
    });

    answerOptions.appendChild(button);
  });
}

function chooseAnswer(index) {
  if (selectedAnswer !== null) return;

  selectedAnswer = index;

  const question = questions[questionIndex];
  const buttons = answerOptions.querySelectorAll(".answer-option");
  const isCorrect = index === question.answer;

  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;

    if (buttonIndex === question.answer) {
      button.classList.add("correct");
    } else if (buttonIndex === index) {
      button.classList.add("wrong");
    }
  });

  if (isCorrect) {
    score += 10;
    scoreElement.textContent = score;

    answerFeedback.className = "feedback";
    answerFeedback.innerHTML = `
      <strong>✅ To‘g‘ri javob! +10 XP</strong>
      <p>${question.info}</p>
    `;
  } else {
    answerFeedback.className = "feedback wrong-feedback";
    answerFeedback.innerHTML = `
      <strong>💡 To‘g‘ri javob: ${question.options[question.answer]}</strong>
      <p>${question.info}</p>
    `;
  }

  answerFeedback.hidden = false;
  nextButton.hidden = false;

  nextButton.textContent =
    questionIndex === questions.length - 1
      ? "Natijani ko‘rish →"
      : "Keyingi savol →";
}

function nextQuestion() {
  if (selectedAnswer === null) return;

  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  playScreen.hidden = true;
  resultScreen.hidden = false;

  finalScore.textContent = `${score} / ${questions.length * 10} XP`;

  if (score === 50) {
    resultEmoji.textContent = "🏆";
    resultTitle.textContent = "Ajoyib natija!";
    resultMessage.textContent =
      "Barcha savollarga to‘g‘ri javob berding! Sen haqiqiy tabiat bilimdonisan.";
  } else if (score >= 20) {
    resultEmoji.textContent = "🌱";
    resultTitle.textContent = "Yaxshi harakat!";
    resultMessage.textContent =
      "Yaxshi natija! Ma’lumotlarni o‘qib, yana urinib ko‘rishing mumkin.";
  } else {
    resultEmoji.textContent = "💚";
    resultTitle.textContent = "Yana bir bor urinib ko‘r!";
    resultMessage.textContent =
      "Har bir urinish yangi bilim beradi. O‘yinni qayta boshlashing mumkin.";
  }
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestion);
