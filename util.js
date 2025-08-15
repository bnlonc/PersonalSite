import { setTheme, currentTheme } from "./themes.js";

export const sliderSpeed = 0.75;

// Find out what the user's browser calls CSS transition-end events for browser compatibility. 
// Code adapted from educative: https://www.educative.io/answers/how-to-detect-the-end-of-css-transition-events-in-javascript
function getTransitionEndEventName() {
    var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }
    
    let bodyStyle = document.body.style;
    
    for(let transition in transitions) {
        if(bodyStyle[transition] != undefined) {
            return transitions[transition];
        } 
    }
}

export const circleSlider = document.getElementById("circleSlider");
export let transitionEndEventName;

export function bootstrap() {
    transitionEndEventName = getTransitionEndEventName();
}

export function requestCircleSliderGrowAnimation(event, buttonId, circleSlider) {
    window.requestAnimationFrame(function(){
    
        circleSlider.style.transition = "0s";
        circleSlider.style.background = getComputedStyle(document.getElementById(buttonId)).getPropertyValue("background");
        circleSlider.style.left = event.clientX + "px";
        circleSlider.style.top = event.clientY + "px";
        
        window.requestAnimationFrame(function(){

            circleSlider.style.transition = sliderSpeed.toString() + "s";
    
            let radius = 2 * Math.sqrt(Math.pow(event.clientX, 2) + Math.pow(window.innerHeight - event.clientY, 2))

            circleSlider.style.height = 1.2 * radius + "px";
            circleSlider.style.width = 1.2 * radius + "px";
        });
    });
}

export function requestCircleSliderShrinkAnimation(circleSlider) {
    window.requestAnimationFrame(function(){
        circleSlider.style.height = "0px";
        circleSlider.style.width = "0px";
    });
}