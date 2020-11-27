const parseHTML = require('html-react-parser');

export function renderIcon(string) {
    return parseHTML(icons[string]);
}

const icons = {
    top: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-sort-up fa-w-10 fa-2x"><path fill="currentColor" d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z" class=""></path></svg>`,
}
