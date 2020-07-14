import React, {Component} from "react";
import classes from './Items.module.css';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";

class Items extends Component {
    render() {
        return (
            <div className={classes.items}>
                <p className={classes.task}
                   onClick={() => this.props.completeTask(this.props.elemId)}
                   style={this.props.styles.itemText}>{this.props.elem}</p>
                <Button className={classes.editButton}
                        color="default"
                        style={this.props.styles.editButton}
                        onClick={() => this.props.editTask(this.props.elemId)}>Edit</Button>
                <IconButton className={classes.deleteButton}
                            onClick={() => this.props.removeTask(this.props.elemId, 'list')}
                            style={this.props.styles.deleteButton}>
                    <DeleteIcon color='secondary'/>
                </IconButton>
            </div>
        )
    }
}

export default Items;