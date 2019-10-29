import { DataInputInterface } from 'types';

/**
 * An object that links data and dom elements to which the data are bound.
 * @implements DataInputInterface
 */
export default class DataInput implements DataInputInterface {
    [key: string]: any
    public id: string | number;
    public obj: any;
    public domElement: Element | SVGGraphicsElement;

    /**
     * Creates a DataInput
     * @param id the identifier of the object, usually an id
     * @param obj an object containing the data
     * @param domElement the dom element created with the data
     */
    constructor(id: string  | number, obj: any, domElement: Element) {
        this.id = id,
        this.obj = obj;
        this.domElement = domElement;
    }
}
