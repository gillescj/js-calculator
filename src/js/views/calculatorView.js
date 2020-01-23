import { elements } from './base.js';

const getDisplayNumber = number => {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
};

export const updateDisplay = (currentOperand, previousOperand, operation) => {
    elements.currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
        elements.previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
        elements.previousOperandTextElement.innerText = '';
    }
};