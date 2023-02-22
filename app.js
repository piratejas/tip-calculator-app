const billTotal = document.getElementById("bill");
const customTipPercentage = document.getElementById("tip");
const buttons = document.querySelectorAll(".tip-btns button");
const numOfPeople = document.getElementById("people");
const tipAmountPerPerson = document.getElementById("tipAmount");
const totalToPayPerPerson = document.getElementById("totalAmount");
const resetButton = document.getElementById("resetBtn");
const cantBeZero = document.querySelector(".prompt");
let tipValue = 0;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    customTipPercentage.value = "";

    // button.classList.add("active");

    tipValue = e.target.innerText;
    tipValue = tipValue.substr(0, tipValue.length - 1);

    calculateTip(
      parseFloat(billTotal.value),
      parseInt(tipValue),
      parseInt(numOfPeople.value)
    );
  });
});

customTipPercentage.addEventListener("keyup", (e) => {
  tipValue = e.target.value;

  calculateTip(
    parseFloat(billTotal.value),
    parseFloat(tipValue),
    parseInt(numOfPeople.value)
  );
});

numOfPeople.addEventListener("keyup", (e) => {
  if (e.target.value == 0) {
    cantBeZero.hidden = false;
  } else if (e.target.value !== 0 && cantBeZero.hidden == false) {
    cantBeZero.hidden = true;
  }

  calculateTip(
    parseFloat(billTotal.value),
    parseFloat(tipValue),
    parseInt(numOfPeople.value)
  );
});

function calculateTip(billTotal, tipPercentage, numberOfPeople) {
  if (!billTotal || !tipPercentage || !numberOfPeople) {
    tipAmountPerPerson.innerHTML = "$0.00";
    totalToPayPerPerson.innerHTML = "$0.00";
    return;
  }

  let tipAmount = (billTotal * (tipPercentage / 100)) / numberOfPeople;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * numberOfPeople + billTotal) / numberOfPeople;
  totalAmount = totalAmount.toFixed(2);

  tipAmountPerPerson.innerHTML = `$${tip}`;
  totalToPayPerPerson.innerHTML = `$${totalAmount}`;

  resetButton.classList.add("completed");
}

resetButton.addEventListener("click", reset);

function reset() {
  tipAmountPerPerson.innerHTML = `$0.00`;
  totalToPayPerPerson.innerHTML = `$0.00`;
  billTotal.value = "";
  numOfPeople.value = "";
  customTipPercentage.value = "";
  cantBeZero.hidden = true;
  resetButton.classList.remove("completed");
}
