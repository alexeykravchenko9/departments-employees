const validate = (values) => {

    const errors = {};
    const regSpecChars = /[^A-Za-z0-9_., ]/i;
    const regSpecLinks = /www./i;

    const fields = ['name', 'description'];

    fields.forEach( field => {

        if (!values[ field ]) {
            errors[ field ] = "Required"

        } else if ( regSpecChars.test( values[field] ) ) {
            errors[ field ] = "Not allow use any special chars"

        } else if ( regSpecLinks.test( values[field] ) ) {
            errors[ field ] = "Not allow use any links"

        } else if ( values[ field ].length < 2) {
            errors[ field ] = "Min. length 2 characters"

        }

    });


    return errors;
};

export default validate;