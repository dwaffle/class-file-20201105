import React from 'react';
import { useRecoilValue } from 'recoil';
import { completedTaskListState, remainingTaskListState, taskListState } from '../data/TaskList.recoil';
import {Row, Col, Jumbotron, Table} from 'react-bootstrap'

function TaskListSummary(){

    const taskList = useRecoilValue(taskListState);
    const completedTaskList = useRecoilValue(completedTaskListState);
    const remainingTaskList = useRecoilValue(remainingTaskListState);

    //Is there another way?  I tried using a cosnt [message, messageState] but couldn't assign to it.
    function onTaskUpdateHandler():string{
        switch(taskList.length)
        {
            case 0:
                return "No tasks yet";
            case completedTaskList.length:
                return "All tasks complete!"
            default:
                return `${completedTaskList.length} / ${taskList.length} Complete   `

        }
    }

    return (
        <Jumbotron>
            <Row>
                <Col>
                <h2>
                    {onTaskUpdateHandler()}
                </h2>

            <Table style={{ textAlign: 'left' }}>
                <th>
                Remaining Tasks:
                </th>
                    { remainingTaskList.map( task => <tbody><tr><td>{task.description}</td></tr></tbody>)}
                
            </Table>
            </Col>
            </Row>
        </Jumbotron>
    );

}

export default TaskListSummary;