import './App.css';
import Header from './myComponents/Header';
import {Todos} from './myComponents/Todos';
import { AddTodo } from './myComponents/AddTodo';
import {Footer} from './myComponents/Footer';
import React, {useState,useEffect} from 'react';
import {About} from './myComponents/About';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo)=>{
    console.log("i am on delete of todo",todo);

    //deleting this way does not work in react
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const addTodo = (title,desc)=>{
    console.log("i am adding this todo",title,desc);
    let sno;
    if(todos.length===0){
      sno = 0;
    }
    else{
      sno = todos[todos.length-1].sno+1;
    }
    const myTodo = {
        sno:sno,
        title:title,
        desc:desc,
    }
    setTodos([...todos,myTodo]);
    console.log(myTodo);
  }


const [todos, setTodos] = useState(initTodo);

useEffect(() =>{
  localStorage.setItem("todos",JSON.stringify(todos));
},[todos]);

  return (
    <>
    <Router>
      <Header title="MyTodo" searchBar={true}/>
      <AddTodo addTodo={addTodo}/>
      <Todos todos={todos} onDelete={onDelete}/>
      <Routes>
        {/* <Route exact path='/' render={()=>{
          return(
            <>
                <AddTodo addTodo={addTodo}/>
                <Todos todos={todos} onDelete={onDelete}/>
            </>
          );
        }}></Route> */}
        <Route path="/about" element={<About/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
