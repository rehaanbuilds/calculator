let num1 = 0;
let num2 = 0;
let operator = "";

let startNewNum = false;
let calculated = false;

const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
} 

function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

function updateDisplay() {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (value === "C") {
                screen.textContent = "0";
                num1 = 0;
                num2 = 0;
                operator = "";
                startNewNum = false;
            } 
            else if (value === "=") {
                handleEquals();
            } 
            else if (value === "+" || value === "-" 
                || value === "*" || value === "/") {
                    handleOperator(value);
            } 
            else {
                handleNumber(value);
            }
        })
    })
}

function handleNumber(value) {
    if (screen.textContent === "0" || startNewNum) {
        screen.textContent = value;
        startNewNum = false;
    } else {
        screen.textContent += value;
    }
}

function handleOperator(value) {
    if (operator !== "" && startNewNum) {
        operator = value;
        screen.textContent = `${num1} ${value}`;
        return;
    }

    if (operator !== "") {
        num2 = Number(screen.textContent);
        num1 = operate(operator, num1, num2);
        screen.textContent = num1;
    } else {
        num1 = Number(screen.textContent);
    }

    screen.textContent += ` ${value}`;
    operator = value;
    startNewNum = true;
}

function handleEquals() {
    if ((operator === "/" && num2 === 0) || operator === "") {
        screen.textContent = "Error";
        return;
    }

    num2 = Number(screen.textContent);

    const result = Math.round(operate(operator, num1, num2));

    screen.textContent = result;
    startNewNum = true;
    operator = "";
}

updateDisplay();