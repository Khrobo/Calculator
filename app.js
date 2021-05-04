// Variables
const valueBtns = document.querySelectorAll(".btn"); // Collects all buttons for first time
const secondBtns = document.querySelectorAll(".btn"); // Collects all the buttons for second time
const signBtns = document.querySelectorAll(".signs"); // All number values
const clearBtn = document.querySelector(".clear"); // Clears the calculator
const negPos = document.querySelector(".negative"); // Negative or positive sign
const divide = document.querySelector(".divide"); // Divide sign
const multiply = document.querySelector(".times"); // Multiply sign
const subtract = document.querySelector(".minus"); // Subtract sign
const add = document.querySelector(".plus"); // Addition sign
const decimal = document.querySelector(".point"); // Decimal point
const equal = document.querySelector(".equal"); // Equal sign
let decimalTrue = false; // Checks for whether decimal is present
let switchFunc = false; // Checks for whether function switch was made
let sTransition = false; // Checks for whether second transition was made
let calculated = false; // Checks to see if its calculated
let operator = false; // Checks for the sign of choice
let fValue = document.querySelector(".start"); // First entered value
let sValue = document.querySelector(".end"); // Second entered value
let interface = document.querySelector(".input-interface"); // Puts the value into the interface
let sign = ""; // Checks which sign is present

// Event Listeners
valueBtns.forEach((btns) => {
    btns.addEventListener("click", valueInputs)
});
document.addEventListener("keydown", numKeys);
decimal.addEventListener("click", addDecimal);
equal.addEventListener("click", operate);
clearBtn.addEventListener("click", clear);
negPos.addEventListener("click", changeSign);
divide.addEventListener("click", division);
multiply.addEventListener("click", multiplication);
subtract.addEventListener("click", subtraction);
add.addEventListener("click", addition);

// Functions
function operate(e) {
    if (sign === "Divide") {
        interface.innerText = Math.round(Number(fValue.value) / Number(sValue.value) * 1000) / 1000; // Rounds numbers to the third place
        calculated = true;
    }
    if (sign === "Multiply") {
        interface.innerText = Math.round(Number(fValue.value) * Number(sValue.value) * 1000) / 1000;
        calculated = true;
    }
    if (sign === "Subtract") {
        interface.innerText = Number(fValue.value) - Number(sValue.value);
        calculated = true;
    }
    if (sign === "Addition") {
        interface.innerText = Number(fValue.value) + Number(sValue.value);
        calculated = true;
    }
}
function numKeys(keys) {
    if (interface.innerText == "0" && keys.keyCode > 48 && keys.keyCode < 58) {
        interface.innerText = keys.key;
        fValue.value += keys.key;
    } else if (!interface.innerText == "0" && switchFunc == false && keys.keyCode > 48 && keys.keyCode < 58) {
        interface.innerText += keys.key;
        fValue.value += keys.key;
    } else if (sValue.value === "" && switchFunc == true && keys.keyCode > 48 && keys.keyCode < 58) {
        interface.innerText = keys.key;
        sValue.value += keys.key;
        valueBtns.forEach((btns) => {
            btns.removeEventListener("click", valueInputs);
            switchFunc = true;
            secondBtns.forEach((btns) => {
            btns.addEventListener("click", sValueBtns);
            })
        })
    } else if (keys.keyCode > 48 && keys.keyCode < 58) {
        interface.innerText += keys.key;
        sValue.value += keys.key;
    }

    if (keys.keyCode === 13 && fValue.value !== "" && sValue.value !== "") {
        switch (sign) { 
            case "Multiply":
                interface.innerText = Math.round(Number(fValue.value) * Number(sValue.value) * 1000) / 1000;
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = multiply.value;
                sTransition = false;
                break;
            case "Subtract":
                interface.innerText = Number(fValue.value) - Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = subtract.value;
                sTransition = false;
                break;
            case "Addition":
                interface.innerText = Number(fValue.value) + Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = add.value;
                sTransition = false;
                break;
            case "Divide":
                interface.innerText = Math.round(Number(fValue.value) / Number(sValue.value) * 1000) / 1000;
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = divide.value;
                sTransition = false;
                break;
            default:
                return null;
        }
    }
    if (interface.innerText.length > 21) {
        document.removeEventListener("keydown", numKeys)
    } else {
        document.addEventListener("keydown", numKeys)
    }
}
function valueInputs(btn) {
    let values = btn.target.value; // Selects a value of the button clicked
    
    if (interface.innerText == "0") {
        interface.innerText = ""; // Sets the value at 0 to nothing
        interface.innerText += `${values}`; // Adds values intp the inner Text
        fValue.value += `${values}`; // Stores the users first inputs
    } else {
        interface.innerText += `${values}`;
        fValue.value += `${values}`;
    }
    if (interface.innerText.length > 21) {
        for (let i=0; i<valueBtns.length; i++) {
            valueBtns[i].style.pointerEvents = "none"
        }
    }
}
function sValueBtns(btn) {
    let values = btn.target.value;  
    
    if (sTransition == false) { // If false, then 
        sTransition = true; // Switch to true and make sure the transition is through.
        interface.innerText = ""; // Set to nothing
        interface.innerText += `${values}`; // Adds values from users input into interface
        sValue.value += `${values}`; // Stores input values into the second variable
    } else if (operator == true && sValue.value === "") {
        interface.innerText = "";
        interface.innerText += `${values}`;
        sValue.value += `${values}`;
        
    } else {
        interface.innerText += `${values}`;
        sValue.value += `${values}`;
    }
    if (interface.innerText.length > 21) {
        for (let i=0; i<valueBtns.length; i++) {
            valueBtns[i].style.pointerEvents = "none"
        }
    } else {
        for (let i=0; i<valueBtns.length; i++) {
            valueBtns[i].style.pointerEvents = "auto"
        }
    }
}
function division(e) {
    if (sign === "" && sValue.value === "" && switchFunc == false) {
        sign = "Divide"; // Change sign to divide
            valueBtns.forEach((btns) => {
                btns.removeEventListener("click", valueInputs);
                switchFunc = true;
                secondBtns.forEach((btns) => {
                btns.addEventListener("click", sValueBtns);
            })
        })
    } else if (sign === "Divide" && sValue.value !== "") { // If the sign is Divide again when clicked, solve
        interface.innerText = Number(fValue.value) / Number(sValue.value).toFixed(2);
        fValue.value = interface.innerText;
        sValue.value = "";
    } else if (sign !== "Divide" && sValue.value !== "") { // If the sign is not divide, then use a switch to find it
        switch (sign) { 
            case "Multiply":
                interface.innerText = Number(fValue.value) * Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            case "Subtract":
                interface.innerText = Number(fValue.value) - Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            case "Addition":
                interface.innerText = Number(fValue.value) + Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            default:
                return null;
        }
    }
}
function multiplication(e) {
    if (sign === "" && sValue.value === "" && switchFunc == false) {
        sign = "Multiply";
            valueBtns.forEach((btns) => {
                btns.removeEventListener("click", valueInputs);
                switchFunc = true;
                secondBtns.forEach((btns) => {
                btns.addEventListener("click", sValueBtns);
            })
        })
    } else if (sign === "Multiply" && sValue.value !== "") {
        interface.innerText = Number(fValue.value) * Number(sValue.value);
        fValue.value = interface.innerText;
        sValue.value = "";
    } else if (sign !== "Multiply" && sValue.value !== "") {
        switch (sign) {
            case "Divide":
                interface.innerText = Number(fValue.value) / Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            case "Subtract":
                interface.innerText = Number(fValue.value) - Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            case "Addition":
                interface.innerText = Number(fValue.value) + Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            default: 
            return null;
        }
    }
}
function subtraction(e) {
    if (sign === "" && sValue.value === "" && switchFunc == false) {
        sign = "Subtract";
            valueBtns.forEach((btns) => {
                btns.removeEventListener("click", valueInputs);
                switchFunc = true;
                secondBtns.forEach((btns) => {
                btns.addEventListener("click", sValueBtns);
            })
        })
    } else if (sign === "Subtract" && sValue.value !== "") {
        interface.innerText = Number(fValue.value) - Number(sValue.value);
        fValue.value = interface.innerText;
        sValue.value = "";
    } else if (sign !== "Subtract" && sValue.value !== "") {
        switch (sign) {
            case "Divide":
                interface.innerText = Number(fValue.value) / Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            case "Multiply":
                interface.innerText = Number(fValue.value) * Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            case "Addition":
                interface.innerText = Number(fValue.value) + Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            default:
                return null;
        }
    }
}
function addition(e) {
    if (sign === "" && sValue.value === "" && switchFunc == false) {
        sign = "Addition";
            valueBtns.forEach((btns) => {
                btns.removeEventListener("click", valueInputs);
                switchFunc = true;
                secondBtns.forEach((btns) => {
                btns.addEventListener("click", sValueBtns);
            })
        })
    } else if (sign === "Addition" && sValue.value !== "") {
        interface.innerText = Number(fValue.value) * Number(sValue.value);
        fValue.value = interface.innerText;
        sValue.value = "";
    } else if (sign !== "Addition" && sValue.value !== "") {
        switch (sign) {
            case "Divide":
                interface.innerText = Number(fValue.value) / Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            case "Subtract":
                interface.innerText = Number(fValue.value) - Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            case "Multiply":
                interface.innerText = Number(fValue.value) * Number(sValue.value);
                fValue.value = interface.innerText;
                sValue.value = "";
                sign = e.target.value
                sTransition = false;
                break;
            default:
                return null;
        }
    }
}
function addDecimal(event) {
    let values = event.target.value;

    if (decimalTrue == false && switchFunc == false) { // Checks to see if decimal is false
        decimalTrue = true; // If false, turn to true to prevent multiple clicks
        interface.innerText += `${values}`
        fValue.value += `${values}`
    } else {
        sValue.value += `${values}`
        interface.innerText += `${values}`
        return;
    }
}
function clear() {
    document.querySelector(".input-interface").innerText = 0;
    decimalTrue = false;
    switchFunc = false;
    sTransition = false;
    calculated = false;
    fValue.value = "";
    sValue.value = "";
    sign = "";
    secondBtns.forEach((btns) => {
        btns.removeEventListener("click", sValueBtns);
        switchFunc = false;
        valueBtns.forEach((btns) => {
            btns.addEventListener("click", valueInputs);
        })
    })
    for (let i=0; i<valueBtns.length; i++) {
        valueBtns[i].style.pointerEvents = "auto";
    };
    document.addEventListener("keydown", numKeys);
}
function changeSign() {
    if (Math.sign(interface.innerText) === -1 && switchFunc === false) {
        interface.innerText = `${Math.abs(Number(interface.innerText))}`
        fValue.value = `${Math.abs(fValue.value)}`;
    } else if (Math.sign(interface.innerText) === 1 && switchFunc === false) {
        interface.innerText = `${-Math.abs(Number(interface.innerText))}`
        fValue.value = `${-Math.abs(fValue.value)}`;
    } else if (Math.sign(interface.innerText) === 1 && switchFunc === true) {
        interface.innerText = `${-Math.abs(Number(interface.innerText))}`;
        sValue.value = `${-Math.abs(sValue.value)}`;
    } else if (Math.sign(interface.innerText) === -1 && switchFunc === true) {
        interface.innerText = `${Math.abs(Number(interface.innerText))}`
        sValue.value = `${Math.abs(sValue.value)}`;
    } 
}
