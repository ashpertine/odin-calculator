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





function inputNumbers(display, secondary_display) {
    let inputButtons = document.querySelectorAll('.input');
    display.innerText = '0';
    //numArr will hold the first and second number
    let numArr = [];
    //eventHistory will hold the last type of input entered
    let eventHistory = [];
    //operatorHistory will hold both the previous operator and the current operator
    let operatorHistory = [];
    inputButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if(button.classList.contains('operator')) {
                numArr.push(display.innerText);
                if(button.classList.contains('equals')) {
                    //when input equals operator
                    if(numArr.length == 1) {
                        display.innerText = numArr[0];
                        numArr = [];
                    }else {
                        let result = operate(operatorHistory[operatorHistory.length -1], numArr);
                        display.innerText = result;
                        secondary_display.innerText = numArr[0] + operatorHistory[operatorHistory.length - 1] + numArr[1] + button.innerText;
                        numArr = [];
                    }
                } else {
                    //when input an operator like add, subtract, multiply and divide     
                    if(eventHistory[eventHistory.length-1] == 'operator') {
                        numArr.pop();
                        operatorHistory.shift();
                        operatorHistory.push(button.innerText);
                        secondary_display.innerText = secondary_display.innerText.slice(0, secondary_display.innerText.length -1) + operatorHistory[operatorHistory.length - 1];
                    }
                    else if(numArr.length == 2) {
                        //if there are enough numbers to do a calculation 
                        operatorHistory.push(button.innerText);
                        let result = operate(operatorHistory[operatorHistory.length - 1], numArr);
                        display.innerText = result;
                        secondary_display.innerText = result + operatorHistory[operatorHistory.length - 1];
                        numArr = [result]; 
                        eventHistory.push('operator');
                        operatorHistory.shift();
                    }else {
                        //if there are not enough numbers to do a calculation
                        operatorHistory.push(button.innerText);
                        secondary_display.innerText = numArr[0] + operatorHistory[operatorHistory.length - 1];
                        eventHistory.push('operator');
                    }
                } 
            }
            else if(button.classList.contains('number')) {
                //if the display only shows 0 (either no input yet or only 0s has been input, reset the display first) {
                if((display.innerText == '0' || eventHistory[eventHistory.length-1] == 'operator') && !button.classList.contains('period')) {
                    display.innerText = '';
                    display.innerText += button.innerText;
                }else {
                    //when number is input, display on calculator
                    display.innerText += button.innerText;
                }
                eventHistory.push('number');
            }
        });
    });

    inputDeleteButtons(display, secondary_display);

}


function inputDeleteButtons(display, secondary_display) {
    let clearButton = document.querySelector('#clear');
    let delButton = document.querySelector('#del');
    delButton.addEventListener('click', () => {
        if(display.innerText.length == 1) {
            display.innerText = '0';
        }else {
            display.innerText = display.innerText.slice(0, display.innerText.length-1);
        }
    });
    
    clearButton.addEventListener('click', () => {
        display.innerText = '0';
        secondary_display.innerText = '';
        numArr = [];
        eventHistory = [];
        operatorHistory = [];
    });

}


function newInstance() {
    //create divs for view area
    let primaryDisplay = document.createElement('div');
    let secondaryDisplay = document.createElement('div');
    primaryDisplay.id = 'primary'
    secondaryDisplay.id = 'secondary'

    let viewArea = document.querySelector('.view-area');
    viewArea.append(secondaryDisplay);
    viewArea.append(primaryDisplay);
    inputNumbers(primaryDisplay, secondaryDisplay);
}

newInstance();
