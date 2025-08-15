import { gotoPage } from './navigation.js';
import { onThemeButtonClick } from './themes.js';
import { bootstrap } from './util.js';

function topLevelStartup() {
    bootstrap();
}

window.topLevelStartup = topLevelStartup;
window.gotoPage = gotoPage;
window.onThemeButtonClick = onThemeButtonClick;
