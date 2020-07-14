import React, {Component} from "react";
import classes from './ItemsCompleted.module.css';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

class ItemsCompleted extends Component {
    render() {
        return (
            <div className={classes.itemsCompleted}>
                <p className={classes.task}><del>{`${this.props.elem}`}</del></p>
                <IconButton className={classes.deleteButton} onClick={() => this.props.removeTask(this.props.elemId, 'completed')}>
                    <DeleteIcon color='secondary'/>
                </IconButton>
            </div>
        )
    }
}

export default ItemsCompleted;