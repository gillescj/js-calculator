import { factorial } from 'mathjs';

export default class Calculator {
    constructor() {
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.instantOperation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.') {
            if (this.currentOperand.includes('.')) return;
            if (this.currentOperand === '') this.currentOperand = '0';
        }
        this.currentOperand = `${this.currentOperand}${number}`;
    }

    chooseInstantOperation(instantOperation) {
        if (this.currentOperand === '') return;
        this.instantOperation = instantOperation;
        this.compute(true);
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute(false);
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(instant) {
        let computationString;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;

        if (instant) {
            computationString = `${current}${this.instantOperation}`;
            computationString = computationString.replace(`${current}√`, `${parseFloat(current) >= 0 ? Math.sqrt(current) : 'NAN'}`).replace(`${current}( - )`, `(-1)*${current}`).replace(`${current}!`, `${parseFloat(current) >= 0 ? factorial(current) : 'NAN'}`);

        } else {
            if (isNaN(prev)) return;
            computationString = `${prev}${this.operation}${current}`;
            computationString = computationString.replace('÷', '/').replace('^', '**').replace(`EXP${current}`, `*(10**${current})`);
        }

        if (computationString.includes('NAN')) {
            this.clear();
            return;
        }

        computationString = computationString.replace('--', '+');
        const computation = eval(computationString);
        this.currentOperand = computation;

        if (!instant) {
            this.operation = undefined;
            this.previousOperand = '';
        }
    }
}