import "./jsbasic.css";

//функция для вызова модального окошка
// function hello() {
//   alert("Hello!");
// }

//функция для замены содержимого html
// function hello() {
//   if (document.querySelector("h1").innerHTML === "Hello!") {
//     document.querySelector("h1").innerHTML = "Bye!";
//   } else {
//     document.querySelector("h1").innerHTML = "Hello!";
//   }
// }

//функция для замены содержимого html v2
// function hello() {
//   const heading = document.querySelector("h1");

//   if (heading.innerHTML === "Hello!") {
//     heading.innerHTML = "Bye!";
//   } else {
//     heading.innerHTML = "Hello!";
//   }
// }

//функция счётчика и вывода в элемент
// let counter = 0;
// function count() {
//   document.querySelector("h1").innerHTML = counter;
//   // counter = counter + 1;
//   // counter += 1;
//   counter++;
// }

//функция счётчика v2
// let counter = 0;
// function count() {
//   counter++;
//   document.querySelector("h1").innerHTML = counter;

//   if (counter % 10 === 0) {
//     alert(`Count is now ${counter}`);
//   }
// }

//функция формы
// document.querySelector("form").onsubmit = function () {
//   const name = document.querySelector("#name").value;
//   alert(`Hello, ${name}!`);
// };

// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelector("button").onclick = count;
// });

// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelector("button").addEventListener("click", count);
// });

// функция для перекрашивания текста
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelector("#red").onclick = function () {
//     document.querySelector("h1").style.color = "red";
//   };
//   document.querySelector("#blue").onclick = function () {
//     document.querySelector("h1").style.color = "blue";
//   };
//   document.querySelector("#green").onclick = function () {
//     document.querySelector("h1").style.color = "green";
//   };
// });

// функция для перекрашивания текста v2
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll("button").forEach(function (button) {
//     button.onclick = function () {
//       document.querySelector("h1").style.color = button.dataset.color;
//     };
//   });
// });

let divRed = document.querySelector(".red");
let divBlue = document.querySelector(".blue");
let divGold = document.querySelector(".gold");
document.addEventListener("DOMContentLoaded", function () {
  divRed.onclick = function () {
    divRed.classList.add("none");
  };
  divBlue.onclick = function () {
    divBlue.classList.toggle("gold");
  };
  divGold.onclick = function () {
    divGold.classList.remove("border");
  };
});

console.error("===================================");
console.log(document.querySelectorAll("button"));
let array = ["Ron", "Germiona", "Harry"];
console.log(array[1]);
console.error("===================================");
