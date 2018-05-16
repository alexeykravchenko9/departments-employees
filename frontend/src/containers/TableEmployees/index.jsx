import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Components
import BottomControls from './BottomControls/index.jsx';
import EmployeeItem from './EmployeeItem.jsx';

//Action Creators
import selectEmployee from '../../actions/employees/selectEmployee';
import fetchEmployee from '../../actions/employees/fetchEmployees';

// Material UI
import Table, { TableHead, TableBody, TableCell, TableRow } from 'material-ui/Table';

const styles = {
    tableHead: {
        backgroundColor: '#ccc'
    },
    message: {
        textAlign: 'center',
        fontSize: '1.5rem',
        opacity: '0.4',
        margin: '10%'
    }
};

const mapStateToProps = state => {
    return {
        employees: state.employees,
        departments: state.departments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        selectEmployee: bindActionCreators(selectEmployee, dispatch),
        fetchEmployee: bindActionCreators(fetchEmployee, dispatch)
    }
};


@withStyles(styles)
@connect(mapStateToProps, mapDispatchToProps)

export default class TableEmployees extends Component {
    constructor(props){
        super(props);
        this.handleCheckedEmployee = this._handleCheckedEmployee.bind(this);
    }

    _handleCheckedEmployee(item){
        this.props.selectEmployee(item);
    }

    render(){
        const { departments: { selectedDepartment }, classes, employees } = this.props;

        let selectedEmployee = (Object.getOwnPropertyNames(selectedDepartment).length < 1) ? {} : employees.selectedEmployee;

        const renderEmployees = () => {

            if ( Object.keys(selectedDepartment).length > 0) {

                return this.props.employees.items.map( item =>
                    <EmployeeItem
                        checkedItem={ this.handleCheckedEmployee }
                        selected={ selectedEmployee.uuid }
                        key={item.uuid}
                        data={ item }
                    />
                );

            }
        };

        return (
            <section>
                <h3>{ (selectedDepartment.name) ? `${selectedDepartment.name }'s Employees` : ''}</h3>

                <Table>
                    <TableHead className={ classes.tableHead }>
                        <TableRow>
                            <TableCell> </TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Full Address</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                         {renderEmployees()}

                     </TableBody>
                </Table>

                {employees.items.length < 1 && selectedDepartment.name ? <p className={ classes.message }>There are no any employees of selected department</p> : ''}

                {!selectedDepartment.name && <p className={ classes.message }>Please, select Department for showing employees</p>}

                <BottomControls />

            </section>
        )
    }
}