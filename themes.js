import { 
    circleSlider, 
    requestCircleSliderGrowAnimation, 
    requestCircleSliderShrinkAnimation, 
    sliderSpeed, 
    transitionEndEventName 
} from "./util.js";

export const Themes = {
    DARK: {
        name: "DARK",
        topLevelReference: "common/dark-theme.css",
        iframeReference: "../common/dark-theme.css"
    }, 
    LIGHT: {
        name: "LIGHT",
        topLevelReference: "common/light-theme.css",
        iframeReference: "../common/light-theme.css"
    }, 
};

let currentTheme = Themes.LIGHT;

export function setTheme(theme) {
    currentTheme = theme;
    applyCurrentTheme();
}

export function applyCurrentTheme() {
    applyTheme(currentTheme);
}

export function applyTheme(theme) {
    document.getElementById("themeSheet").setAttribute("href", theme.topLevelReference);
    document.getElementById("bodyFrame").contentDocument.getElementById("themeSheet").setAttribute("href", theme.iframeReference);
}

function toggleTheme() {
    if (currentTheme === Themes.LIGHT) {
        setTheme(Themes.DARK);
    } else {
        setTheme(Themes.LIGHT);
    }    
}

export function onThemeButtonClick(event, buttonId) {
    circleSlider.style.zIndex = 4;

    circleSlider.addEventListener(transitionEndEventName, onSliderCoverage);
    requestCircleSliderGrowAnimation(event, buttonId, circleSlider);
}

function onSliderCoverage() {
    circleSlider.removeEventListener(transitionEndEventName, onSliderCoverage);
    toggleTheme();
    requestCircleSliderShrinkAnimation(circleSlider);
    setTimeout(() => {
        circleSlider.style.zIndex = 2;
    }, sliderSpeed * 1000);
}
