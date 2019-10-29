/**
 * Stringify an object, ignoring all circular references.
 * @param obj object to stringify
 */
function strfy(obj) {
    const cache = [];
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) return;
            cache.push(value);
        }
        return value;
    });
}

/**
 * Check if a given element has a parent with the same __data__ property.
 * @param el
 */
function hasSelectableParent(el, method = 'vega') {
    if (!el.parentElement || !el.parentElement.__data__) return false;
    if (method === 'vega') return strfy(el.parentElement.__data__.datum) === strfy(el.__data__.datum);
    else return strfy(el.parentElement.__data__) === strfy(el.__data__);
}

/**
 * Return an array of DataInput to be used by the AnnotationBox.
 * If using Vega, containerSelector should be a selector for the element where Vega 
 * creates the SVG. If using D3, containerSelector should be the actual selector of the SVG.
 * @param {string} containerSelector the selector used to identify where to look for data. Example: '.svgContainer'
 * @param {GetDataFromContainerOptions} options misc options
 */
export function getDataFromContainer(containerSelector, options) {
    const method = options.method || 'vega';
    const filter = options.filter || null;
    const allResults = options.allResults || false;
    const data = [];

    if (method === 'vega') {
        const d = Array.from(document.querySelectorAll(`${containerSelector} svg *`))
            .filter((el) => {
                return el.__data__ &&
                    el.__data__.datum &&
                    (!filter || el.__data__.datum[filter]) &&
                    (allResults || !hasSelectableParent(el));
            })
            .map((el, index) => new DataInput(index, el.__data__.datum, el));
        data.push(...d);
    } else if (method === 'd3') {
        const d = Array.from(document.querySelectorAll(`${containerSelector} *`))
            .filter((el) => {
                return el.__data__  &&
                (!filter || el.__data__[filter]) &&
                (allResults || !hasSelectableParent(el, 'd3'));
            })
            .map((el, index) => new DataInput(index, el.__data__, el));
        data.push(...d);
    }

    return data;
}

/**
 * Check if an element is being crossed by the rectangular selection.
 * @param {ClientRect} elBoundingRect the ClientRect of the element being checked
 * @param {SelectionCoordinates} coordinates the coordinates of the selection
 * @returns {Boolean} whether the rectangle is selected or not
 */
export function checkIfSelected(elBoundingRect, coordinates) {
    let match = true;

    // X-axis
    if (elBoundingRect.left > (coordinates.x + coordinates.width)) match = false;
    if (elBoundingRect.left + elBoundingRect.width < coordinates.x) match = false;

    // Y-axis
    if (elBoundingRect.top > (coordinates.y + coordinates.height)) match = false;
    if (elBoundingRect.top + elBoundingRect.height < coordinates.y) match = false;

    return match;
}
