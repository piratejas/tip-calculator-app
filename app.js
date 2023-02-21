const billTotal = document.getElementById("bill");
const customTipPercentage = document.getElementById("custom");
const buttons = document.querySelectorAll(".tip-btns button");
const numOfPeople = document.getElementById("people");
const tipAmountPerPerson = document.getElementById("tipAmount");
const totalToPayPerPerson = document.getElementById("totalAmount");
const resetButton = document.getElementById("resetBtn");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let tipValue = e.target.innerText;
    tipValue = tipValue.substr(0, tipValue.length - 1);

    if (billTotal.value === "") {
      return;
    }
    if (numOfPeople.value === "") {
      numOfPeople.value = 1;
    }

    calculateTip(
      parseFloat(billTotal.value),
      parseInt(tipValue),
      parseInt(numOfPeople.value)
    );
    console.log(tipValue);
  });
});

customTipPercentage.addEventListener("blur", (e) => {
  if (billTotal.value === "") {
    reset();
    return;
  }
  if (numOfPeople.value === "") {
    numOfPeople.value = 1;
  }

  calculateTip(
    parseFloat(billTotal.value),
    parseFloat(e.target.value),
    parseInt(numOfPeople.value)
  );
});

function calculateTip(billTotal, tipPercentage, numberOfPeople) {
  let tipAmount = (billTotal * (tipPercentage / 100)) / numberOfPeople;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * numberOfPeople + billTotal) / numberOfPeople;
  totalAmount = totalAmount.toFixed(2);

  tipAmountPerPerson.innerHTML = `$${tip}`;
  totalToPayPerPerson.innerHTML = `$${totalAmount}`;

  console.log(tip, numberOfPeople, totalAmount);
}

resetButton.addEventListener("click", reset);

function reset() {
  tipAmountPerPerson.innerHTML = `$0.00`;
  totalToPayPerPerson.innerHTML = `$0.00`;
  billTotal.value = "";
  numOfPeople.value = "";
  customTipPercentage.value = "";
}
