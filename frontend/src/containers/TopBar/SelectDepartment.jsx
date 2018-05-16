import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import Grid from 'material-ui/Grid';

// Form UI
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from "material-ui/styles/index";


const styles = {
    formControl: {
        minWidth: 220
    }
};

@withStyles(styles)
class SelectDepartment extends Component {

    constructor(props){
        super(props);
        this.handleChange = ::this._handleChange;
    }

    state = {
        selected: '',
        open: false
    };

    _handleChange(e) {
        this.props.setDepartment( e.target.value );

        this.setState({ selected: e.target.value }, () => {
            (e.target.value) ? this.props.fetchEmployees( this.state.selected ) : this.props.resetEmployee();
        });

        this.props.selectEmployee({});
    }


    render(){


        const { classes, departments } = this.props;

        return(
            <Grid item xs={7} md={10}>
                <form autoComplete='off'>
                    <FormControl className = { classes.formControl }>
                        <InputLabel htmlFor="department-items">Departments</InputLabel>
                        <Select  value={ this.state.selected }
                                 onChange={ this.handleChange }
                                 inputProps = { {  id: 'department-items'} }>
                            <MenuItem value={ '' }>None</MenuItem>

                            { (departments.length > 0) ? departments.map(item => {
                                return (
                                    <MenuItem value={item.uuid}>{ item.name }</MenuItem>
                                ) })  : '' }



                        </Select>
                    </FormControl>
                </form>
            </Grid>
        )
    }
}

SelectDepartment.PropTypes = {
    setDepartment: PropTypes.func
};

export default SelectDepartment;