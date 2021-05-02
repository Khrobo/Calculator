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
    e.preventDefault();
    
    console.log(Math.sign(interface.innerText))
    console.log(Number(fValue.value) + Number(sValue.value));
    if (sign === "Divide") {
        console.log(sign)
        interface.innerText = Number(fValue.value) / Number(sValue.value);
        calculated = true;
    }
    if (sign === "Multiply") {
        console.log(sign)
        interface.innerText = Number(fValue.value) * Number(sValue.value);
        calculated = true;
    }
    if (sign === "Subtract") {
        console.log(sign)
        interface.innerText = Number(fValue.value) - Number(sValue.value);
        calculated = true;
    }
    if (sign === "Addition") {
        console.log(sign)
        interface.innerText = Number(fValue.value) + Number(sValue.value);
        calculated = true;
    }
}
function numKeys(keys) {
    if (Number(keys.key)) {
      console.log(keys.keyCode)  
    }
    if (interface.innerText == "0") {
        interface.innerText = keys.key;
        fValue.value += keys.key;
    } else if (!interface.innerText == "0" && switchFunc == false) {
        interface.innerText += keys.key;
        fValue.value += keys.key;
    }
    else if (sValue.value === "" && keys.keyCode >= 49 && keys.keyCode <= 57) {
        interface.innerText = keys.key;
        sValue.value += keys.key;
        valueBtns.forEach((btns) => {
            btns.removeEventListener("click", valueInputs);
            console.log("First Removed");
            switchFunc = true;
            secondBtns.forEach((btns) => {
            btns.addEventListener("click", sValueBtns);
            })
        })
    } else {
        interface.innerText += keys.key;
        sValue.value += keys.key;
    }

    if (interface.innerText.length > 22) {
        document.removeEventListener("keydown", numKeys)
    } else {
        document.addEventListener("keydown", numKeys)
    }
}
function round() {
    
    if (!interface.innerText) {
        return
    } else {
        console.log("Test")
        Number(Math.round(interface.innerText));
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
    if (interface.innerText.length > 22) {
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
        console.log("Second Listener")
        interface.innerText += `${values}`; // Adds values from users input into interface
        sValue.value += `${values}`; // Stores input values into the second variable
    } else if (operator == true && sValue.value === "") {
        interface.innerText = "";
        console.log("Display is refreshed")
        interface.innerText += `${values}`;
        sValue.value += `${values}`;
        
    } else {
        console.log("Changes sign after clicking sign")
        interface.innerText += `${values}`;
        sValue.value += `${values}`;
    }
    if (interface.innerText.length > 22) {
        for (let i=0; i<valueBtns.length; i++) {
            valueBtns[i].style.pointerEvents = "none"
        }
    }
}
function division(e) {
    
    
    
    if (sign === "" && sValue.value === "" && switchFunc == false) {
        console.log("Sign change");
        sign = "Divide"; // Change sign to divide
            valueBtns.forEach((btns) => {
                btns.removeEventListener("click", valueInputs);
                console.log("First Removed");
                switchFunc = true;
                secondBtns.forEach((btns) => {
                btns.addEventListener("click", sValueBtns);
            })
        })
    } else if (sign === "Divide" && sValue.value !== "") { // If the sign is Divide again when clicked, solve
        console.log("Second execute")
        interface.innerText = Number(fValue.value) / Number(sValue.value).toFixed(2);
        fValue.value = interface.innerText;
        sValue.value = "";
    } else if (sign !== "Divide" && sValue.value !== "") { // If the sign is not divide, then use a switch to find it
        console.log("Checking for sign");
        switch (sign) { 
            case "Multiply":
                console.log("Switch Multiply", sign)
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
        console.log("Sign change")
        sign = "Multiply";
            valueBtns.forEach((btns) => {
                btns.removeEventListener("click", valueInputs);
                console.log("First Removed");
                switchFunc = true;
                secondBtns.forEach((btns) => {
                btns.addEventListener("click", sValueBtns);
            })
        })
    } else if (sign === "Multiply" && sValue.value !== "") {
        console.log("Third Multiply");
        interface.innerText = Number(fValue.value) * Number(sValue.value);
        fValue.value = interface.innerText;
        sValue.value = "";
    } else if (sign !== "Multiply" && sValue.value !== "") {
        console.log("Checking for sign");
        switch (sign) {
            case "Divide":
                console.log("Switch Multiply")
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
        console.log("Sign change")
        sign = "Subtract";
            valueBtns.forEach((btns) => {
                btns.removeEventListener("click", valueInputs);
                console.log("First Removed");
                switchFunc = true;
                secondBtns.forEach((btns) => {
                btns.addEventListener("click", sValueBtns);
            })
        })
    } else if (sign === "Subtract" && sValue.value !== "") {
        console.log("Third Subtract");
        interface.innerText = Number(fValue.value) - Number(sValue.value);
        fValue.value = interface.innerText;
        sValue.value = "";
    } else if (sign !== "Subtract" && sValue.value !== "") {
        console.log("Checking for sign");
        switch (sign) {
            case "Divide":
                console.log("Switch Multiply")
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
        console.log("Sign change")
        sign = "Addition";
            valueBtns.forEach((btns) => {
                btns.removeEventListener("click", valueInputs);
                console.log("First Removed");
                switchFunc = true;
                secondBtns.forEach((btns) => {
                btns.addEventListener("click", sValueBtns);
            })
        })
    } else if (sign === "Addition" && sValue.value !== "") {
        console.log("Third Addition");
        interface.innerText = Number(fValue.value) * Number(sValue.value);
        fValue.value = interface.innerText;
        sValue.value = "";
    } else if (sign !== "Addition" && sValue.value !== "") {
        console.log("Checking for sign");
        switch (sign) {
            case "Divide":
                console.log("Switch Multiply")
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
            btns.addEventListener("click", valueInputs)
        })
    })
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


