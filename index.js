const inputButtons = document.querySelectorAll('.input');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equals');
const delButton = document.querySelector('#del');
const clearButton = document.querySelector('#clear');
const primaryDisplay = document.querySelector('#primary')
const secondaryDisplay = document.querySelector('#secondary');
const viewArea = document.querySelector('.view-area');

const state = {
    firstVal: null, 
    secondVal: null,
    operator: null,
    isNewLine: true,
}


function add(first, second) {
    return cleanFloat(Number(first) + Number(second));
}

function subtract(first, second) {
    return cleanFloat(Number(first) - Number(second));
}

function multiply(first, second) {
    return cleanFloat(Number(first) * Number(second));
}

function divide(first, second) {
    if(second == 0) {
        return 'ERROR!';
    }

    return cleanFloat(Number(first) / Number(second));
}

function operate(operator, arr) {
    switch(operator) {
        case '+':
            return add(arr[0], arr[1]); 
        case '−':
            return subtract(arr[0], arr[1]);
        case '×':
            return multiply(arr[0], arr[1]);
        case '÷':
            return divide(arr[0], arr[1]);
        default:
            return arr[0];
    }
}

function cleanFloat(num, precision=12) {
    return parseFloat(num.toPrecision(precision));
}


/* Button functions */

function inputNumbersToDisplay(buttons, display, secondary_display, state) {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if(display.innerText == 'ERROR!') {
                clearBtnFunc(display, secondary_display, state)
            }
            if((display.innerText == '0' && !button.classList.contains('period')) || state.isNewLine) display.innerText = '';
            if(display.innerText.includes('.') && button.classList.contains('period')) return;
            else {
                display.innerText += button.innerText;
                state.isNewLine = false;
            }
        });
    })
}

function inputOperator(buttons, display, secondary_display, state){
    buttons.forEach((button) => {
        button.addEventListener('click', () => { 
            state.firstVal == null ? state.firstVal = display.innerText : state.secondVal = display.innerText;
            //if the user enters an equation, but follows it up with another operator instead of equals.
            if(state.firstVal != null && state.secondVal != null && state.operator != null){
                new_operator = button.innerText;
                showContinuousEquation(display, secondary_display, state, new_operator);
            }else {
                state.operator = button.innerText; 
                showHalfCompleteEquation(display, secondary_display, state);
            }
            console.log(state);
        });
    });
}

function inputEquals(equal_btn, display, secondary_display, state) {
    equal_btn.addEventListener('click', () => {
        if(state.operator == null) return;
        state.secondVal = display.innerText;
        showCompleteEquation(display, secondary_display, state);
    })
}

function deleteBtnFunc(del_button, display) {
    del_button.addEventListener('click', () => {
        display.innerText = display.innerText.slice(0, display.innerText.length-1);
        if(display.innerText.length == 0) setDisplayToZero(display);
    });
}

function clearBtn(clr_button, display, secondary_display, state) {
    clr_button.addEventListener('click', () => clearBtnFunc(display, secondary_display, state));
}

function clearBtnFunc(display, secondary_display, state) {
    state.firstVal = null;
    state.secondVal = null;
    state.operator = null;
    state.isNewLine = true;
    setDisplayToZero(display);
    setSecondaryDisplayToEmpty(secondary_display);
}

/* Display Manipulation */
function setDisplayToZero(display) {
    display.innerText = '0';
}

function setSecondaryDisplayToEmpty(display) {
    display.innerText = '';
}

function showHalfCompleteEquation(display, secondary_display, state) {
    secondary_display.innerText = `${state.firstVal} ${state.operator}`;
    setDisplayToZero(display);
    state.isNewLine = true;
}

function showCompleteEquation(display, secondary_display, state) {
    let result = operate(state.operator, [state.firstVal, state.secondVal])
    secondary_display.innerText = `${state.firstVal} ${state.operator} ${state.secondVal} =`
    display.innerText = result;
    state.firstVal = result;
    state.isNewLine = true;
    state.operator = null;
}

function showContinuousEquation(display, secondary_display, state, new_operator) {
    if(state.firstVal == display.innerText) {
        state.operator = new_operator;
        secondaryDisplay.innerText = `${state.firstVal} ${state.operator}`;
        return;
    }
    let result = operate(state.operator, [state.firstVal, state.secondVal]);
    secondary_display.innerText = `${result} ${new_operator}`;
    

    display.innerText = result;
    state.isNewLine = true;
    state.operator = new_operator;
    state.firstVal = result;
    console.log(state);
}






setDisplayToZero(primaryDisplay);
inputNumbersToDisplay(numberButtons, primaryDisplay, secondaryDisplay, state);
inputOperator(operatorButtons, primaryDisplay, secondaryDisplay, state);
inputEquals(equalButton, primaryDisplay, secondaryDisplay, state);
deleteBtnFunc(delButton, primaryDisplay);
clearBtn(clearButton, primaryDisplay, secondaryDisplay, state);







