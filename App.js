"use strict";

var input           = document.getElementById("input"),             // input/output button
    number          = document.querySelectorAll(".numbers div"),    // number buttons
    operator        = document.querySelectorAll(".operators div"),  // operator buttons
    result          = document.getElementById("result"),            // equal button
    clear           = document.getElementById("clear"),             // clear button
    clearE           = document.getElementById("clearE"),           // clear last entry button (backstep)
    resultDisplayed = false;                                        // flag to keep an eye on what output is displayed

// adding click handlers to number buttons
for ( var i = 0; i < number.length; i++ ) {
  number[i].addEventListener("click", function(e) {
    // storing current input string and its last character in variables - used later
    var currentString  = input.innerHTML;
    var lastChar       = currentString[currentString.length - 1];
    var changeFont     = input.innerHTML;
    var chFontArr      = changeFont.split("");

      if ( chFontArr.length < 5 ) {
        input.style.fontSize = "70px";
        input.style.marginTop = "90px";
      }
      if ( chFontArr.length > 5 ) {
        input.style.fontSize = "30px";
        input.style.marginTop = "135px";
      } 
      if ( chFontArr.length > 10 ) {
        input.style.fontSize = "25px";
        input.style.marginTop = "140px";
      } 
      if ( chFontArr.length > 15 ) {
        input.style.fontSize = "20px";
        input.style.marginTop = "145px";
      }
      if ( chFontArr.length > 20 ) {
        input.style.fontSize = "15px";
        input.style.marginTop = "150px";
      }
      if ( chFontArr.length > 25 ) {
        input.style.fontSize = "10px";
        input.style.marginTop = "155px";
      }
    

    // if result is not diplayed, just keep adding
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      (resultDisplayed === true && lastChar === "+") ||
       lastChar === "-" ||
       lastChar === "×" ||
       lastChar === "÷"
    ) {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {
    // storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      var newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log("enter a number first");
    } else {
      // else just add the operator pressed to the input
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// on click of 'equal' button
result.addEventListener("click", function() {
  // this is the string that we will be processing eg. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  
  var changeFont     = input.innerHTML;
  var chFontArr      = changeFont.split("");

  if ( chFontArr.length < 5 ) {
    input.style.fontSize = "70px";
    input.style.marginTop = "90px";
  }

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
}); 

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
});
// clearing the input by removing last Entry
clearE.addEventListener("click", function(){

    var inputString = input.innerHTML;

    var strArr = inputString.split("");
    var last   = strArr.pop();
    var clearR = strArr.join("");
    input.innerHTML = clearR;

    console.log(strArr);
    console.log(last);
    console.log(clearR);

    
  var changeFont     = input.innerHTML;
  var chFontArr      = changeFont.split("");
  

  if ( chFontArr.length < 5 ) {
    input.style.fontSize = "70px";
    input.style.marginTop = "90px";
  }


  
});
