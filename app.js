const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;



let sendNumberValue = number =>{
    //  if the current display value is 0, replace it if not add number
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }else{
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    resetBtn();
    }
};
let addDecimal = () =>{
    //  if operator press don't add decimal
    if(awaitingNextValue){
        return;
    }
    // if no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
};
//  Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '=': (firstNumber, secondNumber) =>  secondNumber,
}

let useOperator = (operator) =>{
    //  to prevent multiple operators
    if(operatorValue && awaitingNextValue){
        operatorValue = operator
       return;
    };

    const currentValue = Number(calculatorDisplay.textContent);
    // Assign firstValue if no value
    if (!firstValue){
        firstValue = currentValue;
    }else{
        const calculation =  calculate[operatorValue](firstValue, currentValue)
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;

    }
    // ready for next value
    awaitingNextValue = true;
    operatorValue = operator;
} 

//add Event lisitener for numbers, operators , decimal buttons

inputBtns.forEach((inputBtn) =>{
   if(inputBtn.classList.length === 0){
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    
   }else if (inputBtn.classList.contains('operator')){
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));

   }else if (inputBtn.classList.contains('decimal')){
    inputBtn.addEventListener('click', () => addDecimal());
   }
}); 

// reset all value
let resetBtn = () =>{
 firstValue = 0;
 operatorValue = '';
 awaitingNextValue = false;
   clearBtn.addEventListener('click', () =>{
    calculatorDisplay.textContent = 0;
   })
}