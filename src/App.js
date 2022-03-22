import React,{ Component } from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Home } from "./Components/Home";
import { InvalidRoute } from "./Components/InvalidRoute";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { auth,db } from "./Config/Config";
export class App extends Component{
  state={
    currentUser:null,
    todos:[],
    editTodoValue:null,
  }
  //populate the state by retreiving data from firebase
  componentDidMount(){
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('users').doc(user.uid).get().then(snapshot=>{
          this.setState({
            currentUser:snapshot.data().FullName
          })
        })
      }
      else{
        console.log('user is not signed in')
      }
    })
    auth.onAuthStateChanged(user=>{
      if(user){
        const todoList = this.state.todos;
        db.collection('todos of ' + user.uid).onSnapshot(snapshot=>{
          let changes = snapshot.docChanges();
          changes.forEach(change=>{
            if(change.type==='added'){
              todoList.push({
                id: change.doc.id,
                Todo: change.doc.data().Todo
              })
            }
            if(change.type==='removed'){
              for(var i=0;i<todoList.length;i++){
                if(todoList[i].id===change.doc.id){
                  todoList.splice(i,1);
                }
              }
            }
            this.setState({
              todos: todoList
            })
          })
        })
      }
      else{
        console.log('user is not signed in to retrive todos');
      }
    })
    console.log(this.state.todos) 
  }
  deleteTodo=(id)=>{
    // console.log(id);
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('todos of ' + user.uid).doc(id).delete();
      }
      else{
        console.log('user is not signed in to delete todos');
      }
    })
  }
  editModal=(obj)=>{
    this.setState({
      editTodoValue: obj
    })
  }
  updateTodoHandler=(editTodo, id)=>{
    // console.log(editTodo, id);
    const todoList = this.state.todos;
    for(var i = 0; i<todoList.length; i++){
      if(todoList[i].id===id){
        todoList.splice(i,1,{id,Todo: editTodo});
      }
      this.setState({
        todos: todoList
      })
    }
  }
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={()=><Home
          currentUser={this.state.currentUser}
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
          editTodoValue={this.state.editTodoValue}
          editModal={this.editModal}
          updateTodoHandler={this.updateTodoHandler}/>}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
          <Route component={InvalidRoute}/>
        </Switch> 
      </Router>
    )
  }
}

export default App;
