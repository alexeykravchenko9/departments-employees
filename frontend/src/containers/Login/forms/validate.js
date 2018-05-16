
export default (values) => {

    const errors = {};
    const fields = ['username', 'password', 'repeat_password'];

    fields.forEach( field => {

        if (!values[ field ]) {
            errors[ field ] = "Required"
        }

    });

    if (values.password !== values.repeat_password) {
        errors.repeat_password = 'Password are different';
    }

    return errors;

}