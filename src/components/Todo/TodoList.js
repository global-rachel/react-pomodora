import styled from "styled-components";
import { connect } from "react-redux";
import { toggleTodo, editTodo, sendEditedTodo,deleteTodo,addTodo, clearTodo, setFocusTodo, changeTodoOrder} from "../../actions";

import Todo from "./Todo";
import Button from "../Button";
import EditTodo from "./EditTodo";
import Tomato from "../Tomato";
import { useState } from "react";



const TaskWrapper = styled.div`

  width: 100%;
  height: 4rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  box-shadow: ${props=>props.isSelected ? ' 5px 5px green' :''};
  margin-left: ${props=>props.isSelected ? ' 60px' :''};
`

const TodoList = (props)=>{

    const [editContent, setEditContent] = useState('')
    const [isEditOpened, setisEditOpened] = useState(false)
    const [dragItemIndex, setDragItemIndex] = useState(null)

    const renderTomato = (todoId)=>{
        if(todoId === props.focusTodo?.id) return (
            <div className="position-absolute" style={{marginTop: '10px'}}>
                <Tomato scaleNum="0.4"/>
            </div>
        )
        return ''
    }

    const handleDragStart = (e, index) => {
        e.target.classList.add('draggedEnter')
        const image = new Image()
        image.src="./assets/tomato.png"
        e.dataTransfer.setDragImage(image,0,0)
        setDragItemIndex(index);
      };
      
    const handleDragEnter = (e, index) => {
      const newList = [...props.todoList];
      const item = newList[dragItemIndex];
      newList.splice(dragItemIndex, 1);
      newList.splice(index, 0, item);
      setDragItemIndex(index);
      props.changeTodoOrder(newList);
    };
    
    const handleDragEnd = (e) => {
        e.target.classList.remove('draggedEnter')
    };
    
    
    const renderTodo = ()=>{
        return props.todoList.map((todo, index)=>{
            if(todo.isEdit){
                return (
                    <EditTodo todo={todo} setEditContent={setEditContent} key={todo.id} isOpen="true">
                        <Button text="Send" onButtonClick={()=>props.sendEditedTodo(todo.id, editContent)} margin="0 10px"/>
                        <Button 
                            text="Cancel" 
                            onButtonClick={(e)=>{
                                e.stopPropagation()
                                props.sendEditedTodo(todo.id)
                            }}/>
                    </EditTodo>

                )
            }
            return (
                <div 
                    className="flex position-relative"
                    key={todo.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragEnd={(e) => handleDragEnd(e)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                    {renderTomato(todo.id)}
                    <TaskWrapper
                        className="todoItem flex justify-content-between transition cursor-pointer" 
                        isSelected={todo.id === props.focusTodo?.id}
                        onClick={(e)=>{
                            console.log('warpper click')
                            props.setFocusTodo(todo)}}
                        
                        >
                        
                        <label className="checkbox-container" onClick={e=>e.stopPropagation()}>
                                {todo.name} {todo.duration}
                                <input type="checkbox" checked={todo.isDone} 
                                onChange={()=>{                                   
                                    props.toggleTodo(todo.id)
                                    }
                                }/>
                                <span className="checkmark"></span>
                        </label>
                    
                        <div>
                            <Button text="Edit" onButtonClick={(e)=>{
                                e.stopPropagation();
                                props.editTodo(todo.id)
                            }} margin="0 10px 0 0"/>
                            <Button text="Delete" onButtonClick={()=>props.deleteTodo(todo.id)}/>
                        </div>
                    </TaskWrapper>
                </div>

            )
        })
    }

    const renderEditTodoButton = ()=>{
        if(!isEditOpened) return ''
        return (
            <div className="flex">
                <Button text="Save" 
                    onButtonClick={(e)=>{
                        e.stopPropagation()
                        if(!editContent) return
                        setEditContent('')
                        setisEditOpened(false)
                        props.addTodo(editContent )
                    }}
                    margin="0 10px 0 10px"/>
                <Button 
                    text="Close" 
                    onButtonClick={(e)=>{
                        e.stopPropagation()
                        setisEditOpened(false)
                    }}/>
            </div>
        )
    }



    return (
        <div className="container">
                <div style={{marginBottom: '20px'}}> <Button text="Clear All" onButtonClick={()=>props.clearTodo()} /></div>
                
                {renderTodo()}
                <Todo/>
                <EditTodo 
                    onClick={()=>{
                        setisEditOpened(true)
                    }}
                    setEditContent={setEditContent}
                    isOpen={isEditOpened}
                    >
                    {renderEditTodoButton()}
                </EditTodo>
            </div>

    )
}

const mapStateToProp = (state)=>{
    return {
        todoList: state.todo,
        focusTodo: state.focusTodo.todoNow
    }

}


export default connect(mapStateToProp,{toggleTodo, editTodo, sendEditedTodo,deleteTodo,addTodo, clearTodo, setFocusTodo, changeTodoOrder})(TodoList)