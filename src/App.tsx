import React from 'react';
import SimpleCounter from './components/SimpleCounter';
import TaskList from './components/TaskList';
import {Button, Container, Col} from 'react-bootstrap'; 
import TaskListSummary from './components/TaskListSummary';

function App() {
    
    return (
        <Container className="App">
            <Container style={{ width:"25%", float:"right" }}>{" "}</Container>
            <Col style={{ width:"50%", float:"right" }}>
                <TaskListSummary />
            </Col>
            <Col className="col-32" style={{ width:"25%", float:"left" }}>
                <TaskList />
            </Col>
        </Container>
    );
}

export default App;
