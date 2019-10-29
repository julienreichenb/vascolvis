/**
 * Existing options for getDataFromContainer
 * @prop {string} method the method used to get data from the container. Possible choices: vega (default), d3, manual
 * @prop {string} filter a string representing a datum's property that must be set to true for the datum to be valid
 * @interface
 */
export interface GetDataFromContainerOptions {
    id?: string;
    method?: string;
    filter?: string;
    allResults?: boolean;
}

export interface SelectionCoordinates {
    height: number;
    width: number;
    x: number;
    y: number;
}
