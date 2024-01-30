import "./adcgame.css";

const messageGroups = [
  {
    questions: [
      "Ghbdtn! Rfr ltkf?",
      "Ой",
      "Привет! Как дела?",
      "Ладно, знаешь меня?",
    ],
    answers: ["Да", "Нет"],
  },
  {
    questions: [
      "Хей! приветствую тебя из глубин интернета",
      "Ты ведь не знаешь кто я, верно?",
    ],
    answers: ["Вообще-то знаю", "Нет"],
  },
  {
    questions: [
      "О, как хорошо, что ты заглянул",
      "Кажется, мы уже встречались?",
      "На вечеринке... Ну этого... того ",
    ],
    answers: ["Ну точно, было", "Ты меня с кем-то путаешь"],
  },
  {
    questions: ["ЙОУ", "ДИП!", "РЭП"],
    answers: ["ДИП!", "ЭЭЭ, ЧТО?"],
  },
];

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function showQuestion(question) {
  const element = document.createElement("div");
  element.innerText = question;
  element.classList.add("question");
  document.body.appendChild(element);
}

function showAnswers(answers) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("answersWrapper");
  document.body.appendChild(wrapper);

  answers.forEach((answer, i) => {
    const element = document.createElement("div");
    element.innerText = answer;
    element.classList.add("answer");

    element.addEventListener("click", () => {
      console.log("клик работает");
    });

    wrapper.appendChild(element);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let timeout = 2000;
  const messageGroup = sample(messageGroups);

  messageGroup.questions.forEach((question, i) => {
    if (i == 0) {
      showQuestion(question);
    } else if (i + 1 == messageGroup.questions.length) {
      setTimeout(() => {
        showQuestion(question);
        showAnswers(messageGroup.answers);
      }, timeout);
    } else {
      setTimeout(() => {
        showQuestion(question);
      }, timeout);

      // timeout = timeout + 2000;
      timeout += 2000;
    }
  });
});
