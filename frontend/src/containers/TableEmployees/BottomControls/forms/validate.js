
const validate = (values) => {

    const errors = {};
    const regCharsType = /[^A-Za-z]/i;
    const regPhoneType = /[()x\\s ][^0-9][ ]/i;

    const fields = ['firstName', 'lastName', 'age', 'phone'];

    fields.forEach( field => {

        if (!values[ field ]) {
            errors[ field ] = "Required"
        }

    });

    if ( regPhoneType.test(values.phone)) {
        errors.phone = 'Not valid phone number';
    }

    return errors;
};

export default validate;