const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let input = "";

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === "C") {
      input = "";
      display.innerText = "0";
    } else if (value === "←") {
      input = input.slice(0, -1);
      display.innerText = input || "0";
    } else if (value === "=") {
      try {
        let result = evaluateExpression(input);
        display.innerText = result;
        input = result.toString();
      } catch (e) {
        display.innerText = "Error";
        input = "";
      }
    } else {
      if (isOperator(value) && isOperator(input.slice(-1))) {
        input = input.slice(0, -1) + value;
      } else {
        input += value;
      }
      display.innerText = input;
    }
  });
});

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

function evaluateExpression(expression) {
  if (!expression || /[^0-9+\-*/.()]/.test(expression)) {
    throw new Error("Invalid input");
  }
  return eval(expression);
}
