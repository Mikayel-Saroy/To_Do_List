import React, {Component} from 'react';
import classes from './App.module.css';
import Items from './components/Items/Items';
import ItemsCompleted from "./components/ItemsCompleted/ItemsCompleted";
import AddTask from "./components/AddTask/AddTask";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTask: '',
            newId: '0001',
            currentIdNum: 2,
            tasks: [],
            tasksDone: [],
            styles: {
                addTaskStyles: {
                    inputStyle: {
                        width: '350px',
                        marginLeft: '25px',
                        marginBottom: '5px',
                        fontFamily: 'Times New Roman',
                        fontSize: '20px',
                    },
                    buttonStyle: {
                        width: '100px',
                        marginBottom: '5px',
                    },
                },
                itemsStyles: {
                    itemText: {
                        width: '330px',
                    },
                    editButton: {
                        width: '40px',
                        height: '30px',
                        marginTop: '16px',
                        marginLeft: '348px',
                        position: 'absolute',
                    },
                    deleteButton: {
                        width: '50px',
                        height: '50px',
                        marginTop: '7px',
                        marginLeft: '415px',
                        position: 'absolute',
                    },
                }
            },
        }
    }

    rerender = (arr) => arr.map(arrElem => <Items elem={arrElem.task}
                                                  elemId={arrElem.uniqueId}
                                                  removeTask={this.removeTask}
                                                  completeTask={this.completeTask}
                                                  styles={this.state.styles.itemsStyles}
                                                  editTask={this.editTask}/>);
    rerenderComplete = (arr) => arr.map(arrElem => <ItemsCompleted elem={arrElem.task}
                                                                   elemId={arrElem.uniqueId}
                                                                   removeTask={this.removeTask}/>);

    handleChange = (e) => {
        this.setState({currentTask: e.target.value});
    }
    onSubmit = () => {
        let stringFilter = '';
        for (let i = 0; i < 100; i++) {
            if (this.state.currentTask === stringFilter) {
                stringFilter = '';
                break;
            }
            stringFilter += ' ';
        }
        if (stringFilter !== '') {
            let id = this.state.currentIdNum;
            if (id < 10) {
                id = `000${id}`;
            } else if (id < 100) {
                id = `00${id}`;
            } else if (id < 1000) {
                id = `0${id}`;
            } else {
                id = `${id}`;
            }
            this.setState(() => {
                return {
                    currentIdNum: this.state.currentIdNum + 1,
                    newId: id,
                    tasks: [{uniqueId: this.state.newId, task: this.state.currentTask}, ...this.state.tasks],
                    currentTask: '',
                }
            })
        }
    }
    removeTask = (uniqueId, source) => {
        if (source === 'list') {
            for (let i = 0; i < this.state.tasks.length; i++) {
                if (this.state.tasks[i].uniqueId === uniqueId) {
                    let newArr = this.state.tasks;
                    newArr.splice(i, 1);
                    this.setState({
                        tasks: newArr,
                    });
                }
            }
        } else if (source === 'completed') {
            for (let i = 0; i < this.state.tasksDone.length; i++) {
                if (this.state.tasksDone[i].uniqueId === uniqueId) {
                    let newArr = this.state.tasksDone;
                    newArr.splice(i, 1);
                    this.setState({
                        tasksDone: newArr,
                    });
                }
            }
        }
    }
    completeTask = (uniqueId) => {
        for (let i = 0; i < this.state.tasks.length; i++) {
            if (this.state.tasks[i].uniqueId === uniqueId) {
                let newArr = this.state.tasks;
                let element = this.state.tasks[i];
                newArr.splice(i, 1);
                this.setState(() => {
                    return {
                        tasksDone: [element, ...this.state.tasksDone],
                        tasks: newArr,
                    }
                });
            }
        }
    }
    editTask = (uniqueId) => {
        let stringFilter = '';
        for (let i = 0; i < 100; i++) {
            if (this.state.currentTask === stringFilter) {
                stringFilter = '';
                break;
            }
            stringFilter += ' ';
        }
        if (stringFilter !== '') {
            let arrEdit = [];
            let editedElement = {};
            for (let i = 0; i < this.state.tasks.length; i++) {
                if (this.state.tasks[i].uniqueId === uniqueId) {
                    editedElement.uniqueId = this.state.tasks[i].uniqueId;
                    editedElement.task = this.state.currentTask;
                    arrEdit.push(editedElement);
                } else {
                    arrEdit.push(this.state.tasks[i]);
                }
            }
            this.setState(() => {return {
                tasks: arrEdit,
                currentTask: '',
            }});
        }
    }

    render() {
        return (
            <div className={classes.app}>
                <h1 className={classes.header}>To Do List</h1>
                <AddTask inputValue={this.state.currentTask}
                         inputOnChange={this.handleChange}
                         inputStyle={this.state.styles.addTaskStyles.inputStyle}
                         buttonFunc={this.onSubmit}
                         buttonStyle={this.state.styles.addTaskStyles.buttonStyle}/>
                {this.rerender(this.state.tasks)}
                {this.rerenderComplete(this.state.tasksDone)}
            </div>
        );
    }
}

export default App;