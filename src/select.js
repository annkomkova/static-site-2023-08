import "./select.css";
import Cookies from "js-cookie";

const selectOptions = [
  "#веловоскресенье",
  "#цветыпопонедельникам",
  "#архитектураповторникам",
  "#природнаясреда",
  "#жизненнаясреда",
  "#танцыпосредам",
  "#птицыпочетвергам",
  "#рыбныйчетверг",
  "#четвероногийчетверг",
  "#пятничныекотики",
  "#ачётаковапопятницам",
  "#субботниепёсики",
  "#субботнеефотодлядуши",
];

const multiSelectOptions = [
  {
    text: "#веловоскресенье",
    active: false,
  },
  { text: "#цветыпопонедельникам", active: false },
  { text: "#архитектураповторникам", active: false },
  { text: "#природнаясреда", active: false },
  { text: "#жизненнаясреда", active: false },
  { text: "#танцыпосредам", active: false },
  { text: "#птицыпочетвергам", active: false },
  { text: "#рыбныйчетверг", active: false },
  { text: "#четвероногийчетверг", active: false },
  { text: "#пятничныекотики", active: false },
  { text: "#ачётаковапопятницам", active: false },
  { text: "#субботниепёсики", active: false },
  { text: "#субботнеефотодлядуши", active: false },
];

// функция для открытия и закрытия модального окошка
function initModal() {
  const openModal = document.querySelector(".openModal");
  const closeModal = document.querySelector(".closeModal");
  const modal = document.querySelector(".modal");

  openModal.addEventListener("click", () => {
    modal.classList.add("visible");
  });
  closeModal.addEventListener("click", () => {
    modal.classList.remove("visible");
  });
}

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
    console.log(option);
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
        console.log(option);
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

  updateSelectOptionList();

  dropdownButton.addEventListener("click", () => {
    selectElement.classList.toggle("focus");
  });
  selectInput.addEventListener("click", () => {
    selectElement.classList.toggle("focus");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  changeTheme();
  initModal();
  initSwitch();
  initSelect();
  initMultiSelect();
});
