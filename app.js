const buttons = document.querySelectorAll('button');
const calculatorDisplay = document.getElementById('display');

// Variables to store calculator state
let num1 = '';
let num2 = '';
let operator = '';

// Updates display with current user input
function updateDisplay() {
    calculatorDisplay.textContent = num1 + operator + num2;
}

buttons.forEach(function(button) {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if(!isNaN(value)) {
            if (!operator) {
                // If operator has yet to be chosen, update first number
                num1 += value;
            } else {
                // If operator has been chosen, update second number
                num2 += value;
            }
        }

        if (['+', '-', '*', '/',].includes(value)) {
            // Check if operator already selected
            if (operator) {
                // Calculate result if both numbers and operator are present
                num1 = operate(operator, parseFloat(num1), parseFloat(num2));
                num2 = ''; // Reset number 2 for the next calculation
            }
            operator = value; // Set the new operator
        }

        if (value === '=') {
            if(num1 && operator && num2) {
                // Perform calculation & update state
                num1 = operate(operator, parseFloat(num1), parseFloat(num2));
                num2 = ''; // Reset num2 for next calculation
                operator = ''; // Reset operator
            }
        }

        if (value === 'clear') {
            num1 = '';
            num2 = '';
            operator = '';
        }

        updateDisplay();
    });
});

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
    if (num2 === 0) {
        return 'Error';
    }
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1,num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            console.log('Invalid operator');
    }
}