const MAX_VALUE_PROGRESS = 100;
const MIN_VALUE_PROGRESS = 0;
const ANIMATION_TIME = 2000;

let intrevalId = 0;

const circle = document.querySelector(".circle-2");
const svg = document.querySelector(".svg");
const numberField = document.querySelector(".number-field");
const [switchAnimation, switchHide] = document.querySelectorAll(".checkbox");

const r = circle.r.baseVal.value;
const lengthCircle = 2 * Math.PI * r;

circle.style.strokeDasharray = lengthCircle;
circle.style.strokeDashoffset = lengthCircle;

const setProgress = (percent) => {
  const lengthPart = percent * lengthCircle / 100;
  circle.style.strokeDashoffset = lengthCircle - lengthPart;
};

const cycleAnimation = () => {
  circle.classList.add("animate");
  setTimeout(() => {
    circle.classList.remove("animate");
  }, ANIMATION_TIME);
};

const startRepeatAnimation = () => {
  return setInterval(() => {
    cycleAnimation();
  }, ANIMATION_TIME * 1.5);
};

switchAnimation.addEventListener("change", function (e) {
  if (e.target.checked) {
    cycleAnimation();
    intrevalId = startRepeatAnimation();
  } else {
    circle.classList.remove("animate");
    clearInterval(intrevalId);
  }
});

switchHide.addEventListener("change", function (e) {
  if (!e.target.checked) {
    circle.style.transition = "0.5s";
    svg.style.visibility = "visible";
  } else {
    circle.style.transition = "unset";
    svg.style.visibility = "hidden";
  }
});

numberField.addEventListener("input", function (e) {
  const currentValue = e.target.value;

  if (currentValue > MAX_VALUE_PROGRESS) {
    numberField.value = MAX_VALUE_PROGRESS;
    return setProgress(MAX_VALUE_PROGRESS);
  }

  if (currentValue < MIN_VALUE_PROGRESS) {
    numberField.value = "";
    return setProgress(MIN_VALUE_PROGRESS);
  }

  setProgress(currentValue);
});
