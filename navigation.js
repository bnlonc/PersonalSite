import { applyCurrentTheme } from "./themes.js";
import { 
    circleSlider, 
    requestCircleSliderGrowAnimation, 
    requestCircleSliderShrinkAnimation, 
    transitionEndEventName 
} from "./util.js";

const headerBaseText = ">$ Ben Lonc / ";

export function gotoPage(event, destination, buttonId) {

    requestCircleSliderGrowAnimation(event, buttonId, circleSlider);

    circleSlider.destination = destination;
    circleSlider.buttonId = buttonId;
    circleSlider.addEventListener(transitionEndEventName, onSliderCoverage);
}

const iframe = document.getElementById("bodyFrame");
iframe.addEventListener('load', onIframeLoad);

export let lastClickedButtonId = "homeButton";

function onSliderCoverage(event) {

    circleSlider.removeEventListener(transitionEndEventName, onSliderCoverage);

    iframe.src = event.currentTarget.destination;

    lastClickedButtonId = event.currentTarget.buttonId;
    let buttonStyle = document.getElementById(lastClickedButtonId).style;

    document.getElementById("header").style.backgroundColor = buttonStyle.backgroundColor;
    document.getElementById("headerFlash").style.color = buttonStyle.color;

    let headerText = headerBaseText + document.getElementById(circleSlider.buttonId).firstElementChild.innerHTML;
    document.getElementById("headerFlash").firstElementChild.innerHTML = headerText;

    requestCircleSliderShrinkAnimation(circleSlider);
}

function onIframeLoad() {
    applyCurrentTheme();
}
