import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import todoStore from './todoStore';
import { observer } from 'mobx-react';
import axios from 'axios';
import './style.css'
@observer
class TodoList extends Component {

    constructor(props){
        super(props);
        this.state = {
            inputValue: '',
            list: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }

   render() {
       return(
           <Fragment>
                <div  className="container center-block">
                    <h2>TodoList</h2>
                    <input className="inputt"
                                    ref={(input)=>{this.input = input}}
                                    placeholder="What needs to be done?" 
                                    className="toInput" 
                                    value={this.state.inputValue}
                                    onChange={this.handleInputChange}
                                    />
                    <button className="btn btn-primary" onClick={this.handleBtnClick}>提交</button>
                         
                    <div className="row">
                               
                            <div className="col-md-6">
                                <ul className="list" ref={(ul)=>{this.ul = ul}}>{this.getTodoItem()}
                                </ul>
                                <a className="btn btn-link" onClick={this.getPrevPage}> 上一页 </a>
                                <a className="btn btn-link" onClick={this.getNextPage}> 下一页 </a>
                            </div> 
                            <div className="col-md-6">
                                <ul><del>{this.getTodoItem2()}</del>
                                </ul>
                                <a className="btn btn-link" onClick={this.getPrevPage2}> 上一页 </a>
                                <a className="btn btn-link" onClick={this.getNextPage2}> 下一页 </a>
                            </div>
                </div> 
            </div>
           </Fragment>
       )
   }

   handleItemDelete(id) {
       todoStore.handleItemDelete(id).then(() => {
           todoStore.getList();
       });
        
   }

   handleItemTitleChange(id,title,finished) {
       todoStore.updateTodo(id,title,finished).then(() => {
           todoStore.getList();
       });
   }

   handlestatusChange(id,title,finished) {
       todoStore.updateFinished(id,title,finished).then(() => {
            todoStore.getList();
    });
   }

   getPrevPage() {
        todoStore.getPrePage();
   }

   getPrevPage2() {
    todoStore.getPrePage2();
}


   getNextPage() {
    todoStore.getNextPage();
   }

   getNextPage2() {
    todoStore.getNextPage2();
   }


   getTodoItem(){
       return todoStore.todo.map((item,index) => {
        return (
            <TodoItem 
                key={index}
                handleTitleChanged={this.handleTitleChanged}
                handleItemTitleChange={this.handleItemTitleChange}
                handleItemDelete={this.handleItemDelete} 
                handlestatusChange={this.handlestatusChange}
                content={item} 
                index={index}/>
        )
    })
}

getTodoItem2(){
    return todoStore.todo2.map((item,index) => {
     return (
         <TodoItem 
             key={index}
             handleTitleChanged={this.handleTitleChanged}
             handleItemTitleChange={this.handleItemTitleChange}
             handleItemDelete={this.handleItemDelete} 
             handlestatusChange={this.handlestatusChange}
             content={item} 
             index={index}/>
     )
 })
}

   handleInputChange(){
       const value = this.input.value
       this.setState(()=>({
            inputValue : value
       }));
   }



   componentWillMount() {
        todoStore.getList();
    }

    handleTitleChanged(id,title,finished) {
        todoStore.updateTitle(id,title,finished).then(() => {
            todoStore.getList();
    });
    }

   handleBtnClick(){
    const value = this.input.value
    if(value){
        todoStore.createTodo(value).then(() => {
            todoStore.getList();
            this.setState(()=>({
                inputValue : ''
           }));
        });
    }
   }



}

export default TodoList;