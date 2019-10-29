/**
 * An object that links data and dom elements to which the data are bound.
 * @implements DataInputInterface
 */
export default class DataInput {
    id;
    obj;
    domElement;

    /**
     * Creates a DataInput
     * @param id the identifier of the object, usually an id
     * @param obj an object containing the data
     * @param domElement the dom element created with the data
     */
    constructor(id, obj, domElement) {
        this.id = id,
        this.obj = obj;
        this.domElement = domElement;
    }
}
