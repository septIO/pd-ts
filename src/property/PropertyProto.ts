import {Prop} from "vue/types/options";

export function applyPrototype(obj1: Object, obj2: PropertyPrototype): Object {
    return {...obj2, ...obj1}
}

const allFalse = {nullable: false, index: false, unique: false}
export const PropertyPrototypes: { [s: string]: PropertyPrototype } = {
    "string": {
        length: 250,
        ...allFalse,
        resolve: () => {

            return {}
        }
    },
    "text": {
        length: 65535,
        ...allFalse
    },
    "int8": {
        length: 4,
        ...allFalse
    },
    "uint8": {
        length: 4,
        ...allFalse
    },
    "int16": {
        length: 6,
        ...allFalse
    },
    "uint16": {
        length: 6,
        ...allFalse
    },
    "int32": {
        length: 11,
        ...allFalse
    },
    "uint32": {
        length: 11,
        ...allFalse
    },
    "int64": {
        length: 19,
        ...allFalse
    },
    "uint64": {
        length: 19,
        ...allFalse
    },
    "float": {
        length: 11,
        precision: 2,
        ...allFalse
    },
    "date": {
        ...allFalse
    },
    "datetime": {
        ...allFalse
    },
    "timestamp": {
        ...allFalse
    },
    "time": {
        ...allFalse
    },
    "year": {
        ...allFalse
    },
    "boolean": {
        length: 1,
        ...allFalse
    },
    "bit": {
        length: 1,
        ...allFalse
    }
}

export interface PropertyPrototype {

    /**
     * Max length this property's value can be
     * This is not used for date/timestamps
     */
    length?: number

    resolve?(): {}

    /**
     * This property's default value
     */
    defaultValue?: Primitive

    /**
     * Whether or not this property can be null
     */
    nullable: boolean

    /**
     * Setting index to true will create a `key` on the SQL table for this column
     */
    index: boolean

    /**
     * Is this property the primary key?
     */
    primary?: boolean

    /**
     * Is this property's value unique?
     */
    unique: boolean

    /**
     * Multiple properties can be unique within each other
     * eg.
     * 1-1 = Valid
     * 1-2 = Valid
     * 2-1 = Valid
     * 2-2 = Valid
     * 1-1 = Invalid
     */
    uniqueGroup?: []

    /**
     * Only used in float, double and decimal types
     */
    precision?: number
}
