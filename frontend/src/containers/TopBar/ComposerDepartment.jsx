import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material UI
import Grid from 'material-ui/Grid';

// Material UI
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Tooltip from 'material-ui/Tooltip';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';
import {withStyles} from "material-ui/styles/index";

const styles = {
    parentManageButtons: {
        display:'flex',
        justifyContent: 'space-between'
    }
};

@withStyles(styles)
class ComposerDepartment extends Component {

    constructor(props){
        super(props);
        this.handleButtonEvent = this._handleButtonEvent.bind(this);
    }

    _handleButtonEvent(e){
        this.props.getNameShowedForm(e.currentTarget.getAttribute('aria-label'));
    }

    render(){
        const { classes, selectedDepartment } = this.props;
        const disabledStatus = (!Object.entries(selectedDepartment).length > 0);

        return(
            <Grid item xs={3}  md={2} align="right" className={ classes.parentManageButtons }>

                <Tooltip id="tooltip-fab" title="Add Department">
                    <Button variant="fab" mini color="primary" aria-label="Add" className="addButton" onClick={ this.handleButtonEvent } >
                        <AddIcon />
                    </Button>
                </Tooltip>

                <Tooltip id="tooltip-fab2" title="Edit Department">
                    <Button variant="fab" mini color="secondary" aria-label="Edit" disabled={ disabledStatus } onClick={ this.handleButtonEvent } >
                        <Icon>edit_icon</Icon>
                    </Button>
                </Tooltip>


                <Tooltip id="tooltip-fab3" title="Remove Department">
                    <Button variant="fab" mini aria-label="Remove"  disabled={ disabledStatus } onClick={ this.handleButtonEvent } >
                        <DeleteIcon />
                    </Button>
                </Tooltip>

            </Grid>
        )
    }
}

ComposerDepartment.propTypes = {
    getNameShowedForm: PropTypes.func.isRequired
};

export default ComposerDepartment;