const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdownSelect = document.querySelectorAll(".dropdown select");
const buttonVal = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");
// console.log(dropdownSelect);

// for (code in countryList) {
//   console.log(code, countryList[code]);
// }

for (select of dropdownSelect) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue == "" || amountValue < 1) {
    amountValue = 1;
    amount.value = 1;
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let toCurrVal = toCurr.value.toLowerCase();
  let fromCurrVal = fromCurr.value.toLowerCase();
  let rate = data[fromCurrVal][toCurrVal];

  let finalAmount = rate * amountValue;
  message.innerText = `${amountValue}  ${
    fromCurr.value
  } = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

buttonVal.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
