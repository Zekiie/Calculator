const calculator = {
        displayValue: "0",
        firstOperand: null,
        waitsecondOperand: false,
        operator: null,
    },
    keys = el(".calc_keys"),
    pressNum = document.addEventListener('keypress', pressKey);
performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

    'x': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '=': (firstOperand, secondOperand) => secondOperand
};
console.log(pressNum)
keys.addEventListener('click', (event) => {
    const {target} = event;
    if (target.classList.contains('main__row-operation')) {
        handlerOperation(target.innerText);
        updateDisplay();
        return;
    } else if (target.classList.contains('main__row-sign')) {
        inputDecimal(target);
        updateDisplay();
        return;
    } else if (target.classList.contains('main__row-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    } else if (target.classList.contains('main__row-options')) {
        console.log('options', target.innerText);
        return;
    } else if (target.classList.contains('main__row-number') || target.classList.contains('main__row-number0')) {
        inputDigit(target.innerText);
        changeClear();
        updateDisplay();
        return;
    } else (
        console.log('none'));


});

function el(id) {
    return document.querySelector(id);
}

function updateDisplay() {
    const display = el('#display');
    if (calculator.displayValue.length >= 9) {
        calculator.displayValue = display.value;
        // if (calculator.waitsecondOperand === true) {
        //     calculator.displayValue = calculator['firstOperand'].toPrecision(6);
        //     display.value = calculator['firstOperand'].toPrecision(6);
        //
        // }
    } else {
        display.value = calculator.displayValue;
    }
}

function changeClear() {
    if (calculator.displayValue) {
        el('#AC').innerHTML = "C";
    }
}

function inputDigit(digit) {
    const {displayValue, waitsecondOperand} = calculator;
    if (waitsecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitsecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(calculator);
    console.log(parseFloat(calculator.displayValue));
}

function inputDecimal(dot) {

    if (calculator.waitingForSecondOperand === true) return;
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot.dataset.sign;
        console.log(dot);
        console.log(parseFloat(calculator.displayValue))
    }
}

function handlerOperation(nextOperator) {
    const {firstOperand, displayValue, operator} = calculator,
        inputValue = parseFloat(displayValue);
    if (operator && calculator.waitsecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }
    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
        console.log(firstOperand);
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
    calculator.waitsecondOperand = true;
    calculator.operator = nextOperator;
}

function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitsecondOperand = false;
    calculator.operator = null;
    el('#AC').innerHTML = "AC";
}

function pressKey(event) {
    var key = "";
    key += event.key;

    console.log(key);
}


// handlerOperation();
updateDisplay();