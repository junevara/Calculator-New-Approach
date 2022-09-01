const interface = document.querySelector('.grid-container');
const buttons = interface.querySelectorAll('button');
const calcDisplayBottom = interface.querySelector('#display-bottom');
const calcDisplayTop = interface.querySelector('#display-top');

let input = '';
let operant = '';
let operant1 = '';
let operant2 = '';
let operatorDisplay = '';
let operator = '';
let operator1 = '';
let operator2 = '';
let result = null;
let followResult = 0;
let readyToCalculate = false;
let changeOperator = false;

let countOperator = 0;



function getInput(x){
    changeOperator = false;
    input += x;
    if (!isNaN(x) || x === '.'){
        
        operant += x;
        
        
    }
    else if (isNaN(x) && x !== '.'){
        operator = x;
        countOperator++;
        if(isNaN(+input.slice(-1)) && isNaN(+input.slice(-2, -1))){
            countOperator--;
            changeOperator = true;
        }
        operatorDisplay = operator;
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

function operate(operantFirst, operator, operantSecond){
    
    if (operator === '/'){
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
    
    operant1 = result;
    operator1 = operator2;
    countOperator = 1;
    
    operant = '';
    operator = '';
    operator2 = '';
    
    
}

buttons.forEach(button => button.addEventListener('click', function(){
    
    let lastCharacter = this.textContent;
    getInput(lastCharacter);
    
    displayBottom();

    if(countOperator == 2){
        
        operate(operant1, operator1, operant2);
    }

    if(countOperator === 1){
        
        displayTop();
    }

    
}));

