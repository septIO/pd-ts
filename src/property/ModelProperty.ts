import {Property} from "./Property";
import {Utilities} from "../utilities/Utilities";
import {__GITHUB_DUMP__} from '../github-dump'
import {PropertyPrototype} from "./PropertyProto";
import {AmbiguityException} from "../exceptions/AmbiguityException";

export class ModelProperty implements PropertyPrototype {
    index: boolean = false;
    primary?: boolean | undefined;
    unique: boolean = false;
    uniqueGroup?: [];
    nullable: boolean = false;
    precision?: number | undefined;
    datatype?: string;
    length?: number;
    defaultValue?: Primitive;
    name?: string;


    constructor() {
        //
    }

    /**
     * Deserialize a string into a {Property}
     * @param string
     * @return Property
     */
    static deserialize(string: string): ModelProperty {
        let array = Utilities.splitAndClean(string, /[^\w,]/)
        let name = array[0]
        if (!name)
            throw new ModelPropertyException(`Something is wrong with the property ${string}`)

        const prop: ModelProperty = new ModelProperty()
        prop.name = name

        let propArguments = Utilities.splitAndClean(array.slice(1).join(" "), ',')

        // These should be set to true if they're present
        let trueIfSet = ["index", "primary", "nullable"]
        const overwrites: ModelProperty = new ModelProperty();

        propArguments.forEach(argument => {
            const args = argument.match(/([\w]+)\W*(\w+)?/)!
            if (!args && args[1])
                return;
            let attribute = <string>args[1]
            console.log(args[2])

            /**
             * Automatically sets "true if present" on attributes
             */
            if (trueIfSet.includes(attribute)) {
                if(Utilities.isAmbiguous(args[2]||"", '(true|false)'))
                    throw AmbiguityException
                //@ts-ignore
                overwrites[attribute] = args[2] || true
            }
        })

        console.log("isAmbiguous: ", Utilities.isAmbiguous("5 55", /(\d+)/g))
        console.log(overwrites)
        console.log(propArguments)

        return prop
    }

    static guessDataType() {
        let datatype: string = "";
        for (const [regex, type] of this.typePatterns.entries()) {
            if (regex.test(<string>this.name))
                datatype = type
        }

        if (!datatype.length) {
            // Check through git dump, or assume string
            datatype = __GITHUB_DUMP__[<string>this.name] || "string"
        }
        // set to our own aliases
        datatype = this.aliases[datatype]

        // Datatype wasn't found, maybe the user wrote something else
        /*if (!datatype) {
            if (this.value === "foreign")
                this.setupRelation()
        }*/
        return datatype
    }

    setupRelation() {
    }

    /**
     * key => value pairs for datatypes / abbreviations to standard types
     */
    private static aliases: { [s: string]: string } = {
        // Strings
        "varchar": "string",
        "string": "string",
        "str": "string",
        "text": "text",
        "char": "char",

        // Integers
        "integer": "int32",
        "int": "int32",
        "int32": "int32",
        "unsignedinteger": "uint32",
        "unsignedint": "uint32",
        "uint": "uint32",
        "uint32": "uint32",
        "int8": "int8",
        "tinyint": "int8",
        "uint8": "uint8",
        "tinyuint": "uint8",
        "int16": "int16",
        "smallint": "int16",
        "uint16": "uint16",
        "smalluint": "uint16",
        "mediumint": "mediumint", // does anyone really use 24 bit numbers?
        "bigint": "int64",
        "int64": "int64",
        "biguint": "uint64",
        "uint64": "uint64",

        // Floats
        "float": "float",
        "decimal": "float",
        "double": "float",

        // Dates
        "date": "date",
        "datetime": "datetime",
        "timestamp": "timestamp",
        "time": "time",
        "year": "year",

        // Other
        "boolean": "boolean",
        "bit": "bit"
    }

    private static typePatterns: Map<RegExp, string> = new Map<RegExp, string>([
        // foreign keys are typically uint32, and ends in _id
        [/_id$/, "uint32"],

        // timestamps typically ends in _at
        [/_at$/, "timestamp"],

        // Booleans typically start with has or is followed either by a capital letter or an underscore
        [/^(has|is)[A-Z_]/, "boolean"]
    ])
}

export class ModelPropertyException extends Error {
    constructor(msg?: string) {
        super(msg)
    }
}
