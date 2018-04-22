import moment from 'moment';

export default {

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

    printDate(posix, format = 'LLL') {
        const date = moment(posix * 1000);

        if (date.isValid()) {
            return date.format(format);
        }
        return '';
    }

}
