import Calculator from './models/Calculator.js';
import * as calculatorView from './views/calculatorView.js'
import { elements } from './views/base.js';

const calculator = new Calculator();

// Events

elements.numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculatorView.updateDisplay(calculator.currentOperand, calculator.previousOperand, calculator.operation);
    });
});

elements.operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculatorView.updateDisplay(calculator.currentOperand, calculator.previousOperand, calculator.operation);
    });
});

elements.equalsButton.addEventListener('click', () => {
    calculator.compute(false);
    calculatorView.updateDisplay(calculator.currentOperand, calculator.previousOperand, calculator.operation);
});

elements.allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculatorView.updateDisplay(calculator.currentOperand, calculator.previousOperand, calculator.operation);
});

elements.deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculatorView.updateDisplay(calculator.currentOperand, calculator.previousOperand, calculator.operation);
});

elements.instantOperation.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseInstantOperation(button.innerText);
        calculatorView.updateDisplay(calculator.currentOperand, calculator.previousOperand, calculator.operation);
    });
});
