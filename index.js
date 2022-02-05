const containerNumber = document.querySelector("#number");
const inputMinValue = document.querySelector("#minValue")
const inputMaxValue = document.querySelector("#maxValue")
const inputStep = document.querySelector("#step")
const btnAddOne = document.querySelector("#btnAddOne")
const btnRemoveOne = document.querySelector("#btnRemoveOne")
const form = document.querySelector("form")

let starterNumber;
let maxValue;
let minValue;
let step;

const updateNumber = () => containerNumber.textContent = starterNumber;


const checkStep = function (stepAmount) {
    // input is empty
    if (!stepAmount) return "isEmpty";
    // input have no problem
    if (stepAmount >= 0) return true;
    // there is problem
    alert("number must be positive")
    return false;
}

const checkRange = function (min, max) {
    let message;
    // setting error message
    if (max <= min) message = "max value should be greater then the min value";
    if (min < 0 || max < 0) message = "numbers must be positive";
    if (!min || !max) message = "please enter a valid number";
    // if OK
    if (!message) return true;
    // if NOT OK
    alert(message);
    return false
}

const descendingInterval = () => setInterval(remove, 1500);

const setValues = function (min, max, stepAmount) {
    // three possible results :
    //    true | false | "isEmpty"
    // case it was "isEmpty" step values will be set to 1
    const stepState = checkStep(stepAmount)

    if (!checkRange(min, max)) return;
    if (stepState === false) return;
    // range is OK and steps have a non-zero value
    maxValue = max;
    minValue = min;
    step = stepAmount;
    starterNumber = max;

    // inputs are empty => steps = 1
    if (stepState === "isEmpty") step = 1;
}

const getValues = function () {
    const max = +inputMaxValue.value;
    const min = +inputMinValue.value;

    const step = +inputStep.value;

    setValues(min, max, step)
}

const submitHandler = function (e) {
    e.preventDefault();
    getValues();
    updateNumber()
    descendingInterval();
}

const isResultInRange = num => (minValue <= num) && (num <= maxValue);


const remove = function () {
    const result = starterNumber - step;
    // if result is in range
    if (!isResultInRange(result)) return clearInterval(descendingInterval);
    
    starterNumber = result;
    updateNumber()
}

updateNumber()

form.addEventListener("submit", submitHandler)


// const disableBtn = function (btnType) {
//     switch (btnType) {
//         case "add":
//             btnAddOne.setAttribute("disabled", "true")
//             break;
//         case "remove":
//             btnRemoveOne.setAttribute("disabled", "true")
//         default:
//             btnAddOne.setAttribute("disabled", "true");
//             btnRemoveOne.setAttribute("disabled", "true");
//             break;
//     }
// }

// const ableBtn = function (btnType) {
//     switch (btnType) {
//         case "add":
//             btnAddOne.removeAttribute("disabled")
//             break;
//         case "remove":
//             btnRemoveOne.removeAttribute("disabled")
//         default:
//             btnAddOne.removeAttribute("disabled");
//             btnRemoveOne.removeAttribute("disabled");
//             break;
//     }
// }