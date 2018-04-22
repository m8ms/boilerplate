import moment from 'moment';

export default {

    /**
     * Generates (sub)component class + modifier classes.
     *
     * @param {string} componentName - component name, can be subcomponent name
     * @param {string[]|string} modifiers - array, or sting with space-separated modifiers
     * @return {string} - ex. 'componentName componentName--modifier1 componentName--modifier2'
     */
    bemClasses(componentName, modifiers = []) {
        let classes = componentName;

        if (modifiers.length) {
            if (typeof modifiers === 'string' && modifiers.trim().length) {
                modifiers = modifiers.trim().split(' ');
            }

            for (const modifier of modifiers) {
                classes += ` ${componentName}--${modifier}`;
            }
        }

        return classes;
    },

    /**
     * Makes sure given timestamp is valid and returns formatted date. Otherwise just returns empty string.
     *
     * @param {number} posix - posix format timestamp (seconds)
     * @param {string} format='LLL' - moment lib format to use
     * @return {string} - formatted date or empty string.
     */
    printDate(posix, format = 'LLL') {

        if (posix) {
            const date = moment(posix * 1000);

            if (date.isValid()) {
                return date.format(format);
            }
        }
        return '';
    }

}
