const Themes = {
    DARK: {
        name: "dark",
        reference: "../common/dark-theme.css"
    }, 
    LIGHT: {
        name: "light",
        reference: "../common/light-theme.css"
    }, 
};

function bootstrapTheme() {
    if (!localStorage.getItem("theme")) {
        setTheme(Themes.LIGHT.name);
    } else {
        currentThemeName = localStorage.getItem("theme");
        currentTheme = parseThemeName(currentThemeName);
        applyTheme(currentTheme);
    }
}
window.bootstrapTheme = bootstrapTheme;

function toggleTheme() {
    currentTheme = parseThemeName(localStorage.getItem("theme"));
    if (currentTheme === Themes.LIGHT) {
        setTheme(Themes.DARK);
    } else {
        setTheme(Themes.LIGHT);
    }
}
window.toggleTheme = toggleTheme;

function setTheme(theme) {
    localStorage.setItem("theme", theme.name);
    applyTheme(theme);
}

function applyTheme(theme) {
    window.top.document.getElementsByTagName("html")[0].setAttribute("data-theme", theme.name);
    document.getElementsByTagName("html")[0].setAttribute("data-theme", theme.name);
}

function parseThemeName(themeName) {
    if (themeName === Themes.DARK.name) {
        return Themes.DARK;
    } else if (themeName === Themes.LIGHT.name) {
        return Themes.LIGHT;
    } else {
        console.error("Cannot parse theme name: " + themeName);
        return Themes.LIGHT;
    }
}
