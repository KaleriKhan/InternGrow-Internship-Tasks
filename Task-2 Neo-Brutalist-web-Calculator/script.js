const copyBtn = document.getElementById("copyBtn");
const screen = document.getElementById("screen");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".buttons button");
const themeToggle = document.getElementById("themeToggle");
const calculatorMode = document.getElementById("calculatorMode");
const hexValue = document.getElementById("hexValue");
const dexValue = document.getElementById("dexValue");
const binValue = document.getElementById("binValue");
const programmerPanel = document.querySelector(".programmer-panel");



let expression = "";
let result = 0;

programmerPanel.style.display = "block";


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        handleInput(value);
    });
});

//======================
// Main Function
//======================

function handleInput(value) {
    if (value === "AC") {
        expression = "";
        history.textContent = "";
        screen.textContent = "0";
        return;
    };

    if (value === "DEL") {
        expression = expression.slice(0, -1);
        screen.textContent = expression || "0";
        return;
    };

    if (value === "=") {
        calculate();
        return;
    };

    expression += value;
    screen.textContent = expression;
};

//==============
// calculate
//==============

function calculate() {
    try {
        history.textContent = expression;
        result = eval(expression);
        if (!isFinite(result)) {
            throw Error();
        };
        screen.textContent = result;
        expression = result.toString();
        updateConversions();
    }

    catch {
        screen.textContent = "Error";
        expression = "";
    };
};

//=======================
// Calculator Mode 
//=======================

calculatorMode.addEventListener("change", () => {
    if (calculatorMode.value === "programmer") {
        programmerPanel.style.display = "block";
        updateConversions();
    } else {
        programmerPanel.style.display = "none";
    };
});

//=======================
// Programmer Conversion
//=======================

function updateConversions() {
    let number = parseInt(result);
    if (isNaN(number)) number = 0;
    hexValue.textContent = number.toString(16).toUpperCase();
    decValue.textContent = number;
    binValue.textContent = number.toString(2);
};


//========================
// Dark Mode 
//========================

let dark = true;

themeToggle.addEventListener("click", () => {
    if (dark) {
        document.body.style.background = "#F8FAFC";
        document.body.style.color = "black";
        themeToggle.innerHTML = "☀️ Light Mode";
    } else {
        document.body.style.background = "#0F172A";
        document.body.style.color = "white";
        themeToggle.innerHTML = "🌙 Dark Mode";
    };

    dark = !dark;
});

//============================
// Keyword Support 
//============================

document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Numbers
    if (!isNaN(key)) {
        handleInput(key);
    }

    // Operators
    else if (["+", "-", "*", "/", "."].includes(key)) {
        handleInput(key);
    }

    // Enter
    else if (key === "Enter") {
        handleInput("=");
    }

    // Backspace
    else if (key === "Backspace") {
        handleInput("DEL");
    }

    // Escape
    else if (key === "Escape") {
        handleInput("AC");
    }
});


copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(screen.textContent);

    copyBtn.textContent = "✅ Copied!";

    setTimeout(() => {

        copyBtn.textContent = "📋 Copy";

    }, 1500);

});