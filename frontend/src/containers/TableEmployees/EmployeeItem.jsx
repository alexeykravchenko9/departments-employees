import React, { Component } from 'react';

// Material UI
import { TableCell, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

class EmployeeItem extends Component {
    constructor(props){
        super(props);
        this.handleCheckbox = this._handleCheckbox.bind(this);
    }

    _handleCheckbox(e){
       this.props.checkedItem(this.props.data);

    }

    render(){
        const { uuid, firstName, lastName, age, phone, fullAddress } = this.props.data;
        const { selected } = this.props;

        return(
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        id={`row-checkbox-${uuid}`}
                        onChange={ this.handleCheckbox }
                        checked={ selected === uuid }
                    />
                </TableCell>
                <TableCell>{firstName}</TableCell>
                <TableCell>{lastName}</TableCell>
                <TableCell>{age}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{fullAddress}</TableCell>
            </TableRow>
        );
    }
}

export default EmployeeItem;