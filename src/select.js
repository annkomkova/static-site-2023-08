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

function changeTheme() {
  const body = document.querySelector("body");

  if (Cookies.get("theme") === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
}

function initSelect() {
  const selectElement = document.querySelector(".O_Select");
  const optionListItem = document.querySelector(".C_SelectOptionList");
  const selectInput = document.querySelector(".A_SelectInput");
  const dropdownButton = document.querySelector(".A_SelectDropdownButton");

  selectOptions.forEach((option) => {
    const listItem = document.createElement("div");
    listItem.classList.add("A_SelectOptionListItem");
    listItem.innerText = option;

    listItem.addEventListener("click", () => {
      const listItems = document.querySelector(".A_SelectOptionListItem");

      for (let index = 0; index < listItems.length; index++) {
        const element = listItems[index];
        element.classList.remove("active");
      }
      listItems.classList.add("active");

      selectInput.value = option;
      selectElement.classList.remove("focus");
    });

    optionListItem.appendChild(listItem);
  });

  selectElement.addEventListener("click", () => {
    selectElement.classList.add("focus");
  });
  dropdownButton.addEventListener("click", () => {
    selectElement.classList.toggle("focus");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  changeTheme();
  initModal();
  initSwitch();
  initSelect();
});
