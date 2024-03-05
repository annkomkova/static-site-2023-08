import "./select2.css";
import Cookies from "js-cookie";

const selectOptions = ["#веловоскресенье"];

const multiSelectOptions = [];

// функция для смены состояния чекбокса (смена темы)
function initSwitch() {
  const checkbox = document.querySelector("input[type=checkbox]");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      Cookies.set("theme", "dark");
      changeTheme();
    } else {
      Cookies.remove("theme");
      changeTheme();
    }
  });
}

// функция для смены темы
function changeTheme() {
  const body = document.querySelector("body");

  if (Cookies.get("theme") === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
}

// функция для работы селекта
function initSelect() {
  const selectElement = document.querySelector(".O_Select");
  const optionList = document.querySelector(".C_SelectOptionList");
  const selectInput = document.querySelector(".A_SelectInput");
  const dropdownButton = document.querySelector(".A_SelectDropdownButton");

  selectOptions.forEach((option) => {
    const listItem = document.createElement("div");
    listItem.classList.add("A_SelectOptionListItem");
    listItem.innerText = option;

    listItem.addEventListener("click", () => {
      const listItems = document.getElementsByClassName(
        "A_SelectOptionListItem"
      );

      for (let index = 0; index < listItems.length; index++) {
        const element = listItems[index];
        element.classList.remove("active");
      }

      listItem.classList.add("active");
      selectInput.value = option;
      selectElement.classList.remove("focus");
    });

    optionList.appendChild(listItem);
  });

  dropdownButton.addEventListener("click", () => {
    selectElement.classList.toggle("focus");
  });
  selectInput.addEventListener("click", () => {
    selectElement.classList.toggle("focus");
  });
}

// дальше идут функции для мультиселекта
// функция для создания чипсов внутри "инпута"
function createChips(option) {
  const { text } = option;
  const chipElement = document.createElement("div");
  const chipElementText = document.createElement("span");
  const chipElementButton = document.createElement("div");

  chipElement.classList.add("A_MultiSelectChip");
  chipElementText.classList.add("Q_MultiSelectChipText");
  chipElementButton.classList.add("Q_MultiSelectChipButton");

  chipElementText.innerText = text;

  chipElementButton.addEventListener("click", () => {
    updateSelectData(option); // смена состояния active
    updateSelectOptionList(); // проверка условия active
    updateContent();
    chipElement.remove();
  });

  chipElement.appendChild(chipElementText);
  chipElement.appendChild(chipElementButton);

  return chipElement;
}

// функция для смены значения состояния active: true, если в инпуте, false, если не отображается
function updateSelectData(option) {
  multiSelectOptions.forEach((o) => {
    if (o.text === option.text) {
      o.active = !option.active;
    }
  });
}

function updateContent() {
  const contentCards = document.getElementsByClassName("O_contentCard");
  const selectedTags = [];

  multiSelectOptions.forEach((item) => {
    if (item.active) {
      selectedTags.push(item.text);
    }
  });

  for (let i = 0; i < contentCards.length; i++) {
    const contentCard = contentCards[i];
    const contentCardTags = contentCard.dataset.tags.split(",");
    const transformedCardTags = [];

    contentCardTags.forEach((item) => {
      transformedCardTags.push(item.toLowerCase());
    });

    contentCard.classList.remove("hidden");

    selectedTags.forEach((tag) => {
      if (!transformedCardTags.includes(tag)) {
        contentCard.classList.add("hidden");
      }
    });
  }
}

//функция для проверки состояния active и вызова остальных
function updateSelectOptionList() {
  const optionList = document.querySelector(".C_MultiSelectOptionList");
  const chips = document.querySelector(".C_MultiSelectInput");
  const selectElement = document.querySelector(".O_MultiSelect");

  optionList.innerHTML = "";

  multiSelectOptions.forEach((option) => {
    // // старый способ выдёргивать значение по ключу из объекта
    // const text = option.text
    // const active = option.active

    // новый способ выдёргивать значение по ключу из объекта
    const { text, active } = option;

    if (!active) {
      const listItem = document.createElement("div");
      listItem.classList.add("A_MultiSelectOptionListItem");
      listItem.innerText = text;

      listItem.addEventListener("click", () => {
        updateSelectData(option);
        updateSelectOptionList();
        updateContent();
        // const listItems = document.getElementsByClassName(
        //   "A_MultiSelectOptionListItem"
        // );

        // for (let index = 0; index < listItems.length; index++) {
        //   const element = listItems[index];
        //   element.classList.remove("active");
        // }

        // listItem.classList.add("active");
        // selectInput.value = option;
        const chipElement = createChips(option);
        chips.appendChild(chipElement);

        selectElement.classList.remove("focus");
      });
      optionList.appendChild(listItem);
    }
  });
}

//показывает выпадающий список с чипсами, вызывает основную функцию с проверкой условия
function initMultiSelect() {
  const selectElement = document.querySelector(".O_MultiSelect");
  const selectInput = document.querySelector(".C_MultiSelectInput");
  const dropdownButton = document.querySelector(".A_MultiSelectDropdownButton");

  getContentCardDataTags().forEach((item) => {
    multiSelectOptions.push({
      text: item,
      active: false,
    });
  });

  updateSelectOptionList();

  dropdownButton.addEventListener("click", () => {
    selectElement.classList.toggle("focus");
  });
  selectInput.addEventListener("click", () => {
    selectElement.classList.toggle("focus");
  });
}

function getContentCardDataTags() {
  const contentCards = document.getElementsByClassName("O_contentCard");
  const tags = [];

  for (let i = 0; i < contentCards.length; i++) {
    const contentCard = contentCards[i];
    const contentCardTags = contentCard.dataset.tags.split(",");
    tags.push(...contentCardTags); //спреад-оператор: передаём все элементы массива
  }
  const transformedTags = [];
  tags.forEach((item) => {
    transformedTags.push(item.toLowerCase());
  });
  const uniqueTags = [...new Set(transformedTags)];

  return uniqueTags.sort();
}

document.addEventListener("DOMContentLoaded", () => {
  changeTheme();
  initSelect();
  getContentCardDataTags();
  initMultiSelect();
});
