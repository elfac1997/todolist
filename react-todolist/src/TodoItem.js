import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import todoStore from './todoStore';
import './style.css'

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.content.title,
            isModifying: true,
        }
    }

    render() {
        const {content} = this.props;
        return <Fragment>
            <div className="dakuang">
                <input className="" onClick={() => this.props.handlestatusChange(content.id,content.title,content.finished)} type="checkbox" checked={content.finished} id="checkbox"/>
                {this.state.isModifying ? 
                <Fragment>
                <span className="todo-item">{content.title}</span>
                <button className="btn btn-info youyi" onClick={() => this.handleItemTitleChange()}>编辑</button>
                </Fragment>
                : 
                <Fragment>
                <input 
                ref={(input)=>{this.input = input}}
                value={this.state.inputValue} 
                onChange={value => this.setState({ inputValue: value.target.value })}/> 
                <button className="btn btn-primary youyi" onClick={() => this.handleTitleChanged(content.id,this.state.inputValue,content.finished)}>确认</button>
                </Fragment>}
                <button className="btn btn-warning youyi" onClick={() => this.props.handleItemDelete(content.id)}>删除</button>
                
            </div>
        </Fragment>
    }

    handlestatusChange(id,title,finished) {
        console.log("checked")
        const {handlestatusChange} = this.props;
        handlestatusChange(id,title,finished);
    }

    handleTitleChanged(id,title,finished) {
        const {handleTitleChanged} = this.props;
        handleTitleChanged(id,title,finished);
        this.setState({
            isModifying : true
       });
    }

    handleItemTitleChange() {
        this.setState({
            isModifying : false
       });
    }

    handleItemDelete(id){
        const {handleItemDelete} = this.props;
        handleItemDelete(id);
    }

 
}

TodoItem.propTypes = {
    content: PropTypes.object,
    handleItemDelete: PropTypes.func,
    index: PropTypes.number
}

TodoItem.defaultProps = {

}

export default TodoItem;