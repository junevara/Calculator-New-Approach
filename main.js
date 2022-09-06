const interface = document.querySelector('.grid-container');
const buttons = interface.querySelectorAll('button');
const calcDisplayBottom = interface.querySelector('#display-bottom');
const calcDisplayTop = interface.querySelector('#display-top');
const commaButton = interface.querySelector('#comma');
const equalsButton = interface.querySelector('#equals');

calcDisplayBottom.textContent = '0';
let input = '';
let operant = '';
let operant1 = '';
let operant2 = '';
let operatorDisplay = '';
let operator = '';
let operator1 = '';
let operator2 = '';
let result = null;
let changeOperator = false;
let countOperator = 0;
let resultEvaluated = false;
let commaSet = false;
let zeroDivision = false;
commaButton.setAttribute('disabled', '');
equalsButton.setAttribute('disabled', '');
let charCount = 0;
let operantWithBreaks = '';

function getInput(x){
    changeOperator = false;
    input += x;
    
    if(input === '' || (isNaN(+input.slice(-1)) && input.slice(-1) !== '.' && x !== 'backspace') || (!operator1)){
        equalsButton.style.border = '1px solid black';
        equalsButton.style.padding = '20px';
        equalsButton.setAttribute('disabled', '');

    }
    else {
        equalsButton.removeAttribute('disabled');
    }

    if ((!isNaN(x) || x === '.')){    
        operant += x; 
        
        
    }
    
    if (isNaN(x) && x !== '.' && x !== 'backspace'){
        operator = x;
        
        countOperator++;
        
        if(isNaN(+input.slice(-1)) && isNaN(+input.slice(-2, -1)) && input.slice(-1) !== '.' && input.slice(-2, -1) !== '.'){
            countOperator--;
            changeOperator = true;
        }
        operatorDisplay = operator;
    }  
    
    if (operant.indexOf('.') === -1 && operant !== ''){
        commaButton.removeAttribute('disabled');
        
    }
    else {
        commaButton.style.border = '1px solid black';
        commaButton.style.padding = '20px';
        commaButton.setAttribute('disabled', '');
        
    }

    if (operator && operant1 === ''){
        
        operant1 = operant;
        operator1 = operator;
        operatorDisplay = operator;
        operant = '';
        operator = '';
    }
    
    if (changeOperator === true){
        operator1 = operator;
    }
    

    if (countOperator === 2){
        
        operant2 = operant;
        operator2 = operator;  
    }
}

function displayBottom(){
        calcDisplayBottom.textContent = operant;
    
}

function displayTop(){
    calcDisplayTop.textContent = `${operant1} ${operatorDisplay} ${operant}`;
}

function displayResult(){
    calcDisplayBottom.textContent = result;
    calcDisplayTop.textContent = `${operant1} ${operator1} ${operant} =`;
    operant1 = result;
    operator1 = operator2;
    countOperator = 1;
    
    operant = '';
    operator = '';
    operator2 = '';
}


function clear(){
    
    calcDisplayBottom.textContent = '0';
    input = '';
    operant = '';
    operant1 = '';
    operant2 = '';
    operatorDisplay = '';
    operator = '';
    operator1 = '';
    operator2 = '';
    result = null;
    changeOperator = false;
    countOperator = 0;
    resultEvaluated = false;
    calcDisplayTop.textContent = '';
    commaButton.setAttribute('disabled', '');
    equalsButton.setAttribute('disabled', '');

}


function backspace(x){
    if (resultEvaluated && x === 'backspace' && input.slice(-10, -9) === '='){
        
        clear();
        
        return;
    }
    operant = operant.substring(0, operant.length - 1);
    
    input = input.substring(0, input.length - 9);
    
    if (operant.indexOf('.') === -1 && operant !== ''){
        commaButton.removeAttribute('disabled');
    }
    else {
        commaButton.style.border = '1px solid black';
        commaButton.style.padding = '20px';
        commaButton.setAttribute('disabled', '');
    }
    if (operant === ''){
        equalsButton.style.border = '1px solid black';
        equalsButton.style.padding = '20px';
        equalsButton.setAttribute('disabled', '');
    }
}

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}


function operate(operantFirst, operator, operantSecond){
    console.log(operantSecond);
    if (operator === '/'){
        if (+operantSecond === 0){
            calcDisplayBottom.textContent = "You can't divide by zero!";
            zeroDivision = true;
            return;
        }
        result = (+operantFirst) / (+operantSecond);
    }
    if (operator === 'x'){
        result = (+operantFirst) * (+operantSecond);
    }
    if (operator === '-'){
        result = (+operantFirst) - (+operantSecond);
    }
    if (operator === '+'){
        result = (+operantFirst) + (+operantSecond);
    }

    result = precisionRound(result, 20);
    
    if(operator2 !== '='){
        operant1 = result;
        operator1 = operator2;
        countOperator = 1;
        
        operant = '';
        operator = '';
        operant2 = '';
        operator2 = '';
        calcDisplayBottom.textContent = '0';
    }
    
}

buttons.forEach(button => button.addEventListener('click', function(){
    if (zeroDivision){
        clear();
        zeroDivision = false;
    }
    
    let lastCharacter = this.textContent;
    getInput(lastCharacter);
    
    if (lastCharacter === 'backspace'){
        backspace(lastCharacter);
    }
    
    if(input){
        displayBottom();
    }
    
    if(countOperator == 2){
        
        operate(operant1, operator1, operant2);
    }

    if(countOperator === 1){
        
        displayTop();
    }

    if (lastCharacter === '=' && calcDisplayBottom.textContent !== "You can't divide by zero!" ){
        
        resultEvaluated = true;
        displayResult();
    }

    if (resultEvaluated && !isNaN(+lastCharacter) && input.slice(-2, -1 ) === '='){
        
        clear();
        operant = lastCharacter;
        displayBottom();
    }

    if (lastCharacter === 'clear'){
        clear();
    }
    
}));

function buttonHover() {
    this.style.border = '3px solid white';
    this.style.padding = '18px';
}

function buttonStandard(){
    this.style.border = '1px solid black';
    this.style.padding = '20px';
}

buttons.forEach(button => button.addEventListener('mouseover', buttonHover));
buttons.forEach(button => button.addEventListener('mouseout', buttonStandard));

