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

const sliderSpeed = "0.75s";
const headerBaseText = ">$ Ben Lonc / ";
let transitionEndEventName;
let circleSlider;
let clickedButtonId;

function onLoad() {
    transitionEndEventName = getTransitionEndEventName();
    circleSlider = document.getElementById("circleSlider");
}

function gotoPage(event, destination, buttonId) {

    window.requestAnimationFrame(function(){
        
        circleSlider.style.transition = "0s";
        circleSlider.style.background = getComputedStyle(document.getElementById(buttonId)).getPropertyValue("background");
        circleSlider.style.left = event.clientX + "px";
        circleSlider.style.top = event.clientY + "px";
        
        window.requestAnimationFrame(function(){

            circleSlider.style.transition = sliderSpeed;
    
            radius = 2 * Math.sqrt(Math.pow(event.clientX, 2) + Math.pow(window.innerHeight - event.clientY, 2))

            circleSlider.style.height = 1.2 * radius + "px";
            circleSlider.style.width = 1.2 * radius + "px";
        });
    });

    circleSlider.destination = destination;
    circleSlider.buttonId = buttonId;
    circleSlider.addEventListener(transitionEndEventName, onSliderCoverage);
}

function onSliderCoverage(event) {

    circleSlider.removeEventListener(transitionEndEventName, onSliderCoverage);

    let iframe = document.getElementById("bodyFrame");

    iframe.remove();
    iframe.src = event.currentTarget.destination;
    document.getElementById("pageContainer").appendChild(iframe);

    buttonStyle = getComputedStyle(document.getElementById(event.currentTarget.buttonId));

    document.getElementById("header").style.background = buttonStyle.getPropertyValue("background"); 
    document.getElementById("headerFlash").style.color = buttonStyle.getPropertyValue("color"); 

    let headerText = headerBaseText + document.getElementById(circleSlider.buttonId).getElementsByTagName("p")[0].innerHTML;
    document.getElementById("headerFlash").getElementsByTagName("p")[0].innerHTML = headerText;

    window.requestAnimationFrame(function(){
        circleSlider.style.height = "0px";
        circleSlider.style.width = "0px";
    });
}