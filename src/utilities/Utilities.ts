export class Utilities {

    static regexes: { [s: string]: RegExp } = {
        excessiveWhitespace: /\s+/
    }

    /**
     * Removes excessive whitespace from a string and trims it
     * @param line
     * @return {string}
     */
    static cleanLine(line: string): string {
        return line.replace(Utilities.regexes.excessiveWhitespace, ' ').trim()
    }

    /**
     * Splits a string into an array, cleans each array of excess whitespace (including multiple spaces etc.)
     * Then filters the array to remove empty values
     *
     * @param string
     * @param splitter
     * @return {string[]}
     */
    static splitAndClean(string: string, splitter: RegExp | string = ''): string[] {
        return string.split(splitter).map(arg => this.cleanLine(arg)).filter(arg => !!arg.length)
    }

    public static cleanSketch(string: string): string {
        return string
        /**
         * Sometimes JS uses \r\n for new lines. Remove the \r and use the \n for standardization
         */
            .replace(/\r/g, '')

            /**
             * Convert 3+ newlines into 2
             */
            .replace(/\n{3,}/, '\n\n')

            /**
             * Remove excessive whitespace
             */
            .replace(/\s+/, ' ')

            /**
             * Remove all comments, a comment begins either with // or #, everything after
             * on that line will be removed
             */
            .replace(/((\/\/)|(\#)).*$/gm, '')

            /**
             * Remove block comments, a block comment starts with /* and ends with *／
             * block comments can stretch through multiple lines, everything between the start
             * and ending point will be removed.
             */
            .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1')
    }

    /**
     * Tests a string for ambiguity
     * if the regex has multiple matches that aren't the same it will return true
     *
     * @param str
     * @param regex
     */
    public static isAmbiguous(str: string, regex: RegExp | string): boolean {
        if (typeof regex === "string")
            regex = new RegExp(regex, 'g')
        let m = str.match(regex)!
        if (!m)
            return false

        return !m.every(s => s === m[0])
    }
}
