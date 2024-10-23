import { backend } from 'declarations/backend';

let currentInput = '0';
let previousInput = '0';
let operation = null;
const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput;
}

function handleNumberClick(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function handleDecimalClick() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function handleOperatorClick(op) {
    previousInput = currentInput;
    currentInput = '0';
    operation = op;
}

async function handleEqualsClick() {
    if (operation) {
        const x = parseFloat(previousInput);
        const y = parseFloat(currentInput);
        let result;

        switch (operation) {
            case '+':
                result = await backend.add(x, y);
                break;
            case '-':
                result = await backend.subtract(x, y);
                break;
            case '*':
                result = await backend.multiply(x, y);
                break;
            case '/':
                const divisionResult = await backend.divide(x, y);
                result = divisionResult[0] !== null ? divisionResult[0] : 'Error';
                break;
        }

        currentInput = result.toString();
        previousInput = '0';
        operation = null;
        updateDisplay();
    }
}

function handleClearClick() {
    currentInput = '0';
    previousInput = '0';
    operation = null;
    updateDisplay();
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => handleNumberClick(button.textContent));
});

document.querySelector('.decimal').addEventListener('click', handleDecimalClick);

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => handleOperatorClick(button.textContent));
});

document.querySelector('.equals').addEventListener('click', handleEqualsClick);

document.querySelector('.clear').addEventListener('click', handleClearClick);

updateDisplay();
