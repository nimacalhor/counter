const containerNumber = document.querySelector("#number");
const inputMinValue = document.querySelector("#minValue")
const inputMaxValue = document.querySelector("#maxValue")
const inputStep = document.querySelector("#step")
const form = document.querySelector("form")

let starterNumber;
let maxValue;
let minValue;
let step;
let descendingInterval;

const updateNumber = () => containerNumber.textContent = starterNumber;

// form validation ______________________________
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

const isResultInRange = num => (minValue <= num) && (num <= maxValue);

// get and set data ______________________________
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

// controllers ______________________________
const remove = function () {
    const result = starterNumber - step;
    // if result is in range
    if (!isResultInRange(result)) {
        clearInterval(descendingInterval)
        console.log("cleared")
        return;
    }

    starterNumber = result;
    updateNumber()
}

const submitHandler = function (e) {
    e.preventDefault();
    getValues();
    updateNumber()
    descendingInterval = setInterval(remove, 1500);
}

updateNumber()
form.addEventListener("submit", submitHandler)
