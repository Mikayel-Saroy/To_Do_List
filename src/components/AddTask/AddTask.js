import React, {Component} from "react";
import classes from "./AddTask.module.css";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

class AddTask extends Component {
    addTaskWithEnterKey = (e) => {
        if (e.keyCode === 13) {
            this.props.buttonFunc();
        }
    }

    render() {
        return (
            <div>
                <div className={classes.newTask}>
                    <Input className={classes.input} value={this.props.inputValue}
                           type='input'
                           onChange={this.props.inputOnChange}
                           placeholder="Add a new task"
                           inputProps={{'aria-label': 'description'}}
                           style={this.props.inputStyle}
                           color='secondary'
                           onKeyDown={(e) => this.addTaskWithEnterKey(e)}/>
                    <Button className={classes.addButton}
                            onClick={this.props.buttonFunc}
                            color="default"
                            style={this.props.buttonStyle}>Add</Button>
                </div>
            </div>

        )
    }
}

export default AddTask;