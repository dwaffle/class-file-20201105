import React, { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ITask, taskListState } from '../data/TaskList.recoil';
import {Button, Form, InputGroup, Card} from 'react-bootstrap/';


function TaskList(){

    const [ taskList, setTaskList ] = useRecoilState(taskListState);
    const [ newTaskDescription, setNewTaskDescription ] = useState<string>("");
    

    function onClickAdd(){
        
        const tasks:ITask[] = newTaskDescription.split("\n").filter(d=>!!d).map(( description:string ) => ({ done: false, description }));
        
        // const task:ITask = { done: false, description: newTaskDescription };
        setTaskList([ ...taskList, ...tasks ]);
        setNewTaskDescription("");
    }

    function onChangeNewTaskDescription( event:ChangeEvent<HTMLTextAreaElement> ){
        setNewTaskDescription(event.target.value);
    }

    function onCheckTaskHandler( index:number ){
        
        return function( event:ChangeEvent<HTMLInputElement> ){
            
            const newTask = { ...taskList[index] };
            const newList = [ ...taskList ];

            newTask.done = event.target.checked;
            newList[index] = newTask;
            
            setTaskList( newList );
        }

    }

    function onDeleteTaskHandler( index:number ){
        return function(){
            setTaskList(taskList.filter((task, i) => i !== index));
        }
    }

    function onUpdateDescriptionHandler( index:number ){
        return function( event:ChangeEvent<HTMLInputElement> ){
            const newTask = { ...taskList[index] };
            const newList = [ ...taskList ];

            newTask.description = event.target.value;
            newList[index] = newTask;
            
            setTaskList( newList );
        }
    }

    return (
        <div className="task-list-container">
            <h1>To Do List</h1>
            <div className="task-list">
                { taskList.map(( task, index ) => <Card className="task-card" key={index} style={{ textAlign: 'left', margin: "5px", padding: "5px" }}>
                            <InputGroup>
                            <div className="newline">
                            <Form.Control type="text" value={task.description} onChange={onUpdateDescriptionHandler(index)} placeholder="Your task here" />
                            <Form.Text className="text-muted">You may change your task here</Form.Text>
                            </div>
                            <InputGroup.Checkbox onChange={onCheckTaskHandler(index)}/> Complete!
                            </InputGroup>
                            <Button  variant="warning" size="sm" onClick={onDeleteTaskHandler(index)}>Delete Item</Button>
                     
                </Card> )}
            </div>

            <div className="task-create-form">
                <Form>
                    <Form.Label>Create ToDo List Item</Form.Label>
                    <textarea value={newTaskDescription} style={{ width: '100%', height:"150px" }} onChange={onChangeNewTaskDescription} />
                    <Form.Text className="text-muted">Enter your items to do here.<br /> You can enter new items on multiple lines.</Form.Text>
                </Form>
                <Button variant='primary' onClick={onClickAdd}>Add to Task List</Button>
            </div>
        </div>
    );


}

export default TaskList;