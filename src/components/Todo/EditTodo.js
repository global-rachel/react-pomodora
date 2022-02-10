import styled from "styled-components" 
import { useState } from "react";
import { useEffect } from "react";

const AddTaskWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.1);
    border: 2px dashed rgba(255, 255, 255, 0.4);
    width: ${props=>props.isOpen? '100%' : '4rem'};
    height: 4rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 2rem;
    margin-bottom: 1rem;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    transition: all 0.2s ease-in;
    position: relative;
    cursor: pointer;

    &:before, &:after{
      opacity: ${props=>props.isOpen? '0' : '1'};
      position: absolute;
      content: '';
      width: 3rem;
      left: 15%;
      height: 5px;
      background: rgba(255,255,255);
      border-radius: 5px;
      transition-property: all;
      transition-duration: 0.1s;
       
    }
    &:before{
        transform: rotate(90deg);
      }
      &:after{
        transform: rotate(180deg);
      }
    `

const Input = styled.input`
    visibility: ${props=>props.isOpen? 'visible' : 'hidden'};
    opacity: ${props=>props.isOpen? '1' : '0'};
    transition: all 0.1s ease-in;
    font-size: 22px;
    };
`

 
 const EditTodo=(props, ref)=>{
  const [value, setValue]=useState('')

  useEffect(()=>{
    setValue(props.todo?.name)
  },[])

  useEffect(()=>{
    setValue('')
  },[props.isOpen])


     return (
        <AddTaskWrapper isOpen={props.isOpen} onClick={props.onClick}>            
            <Input 
                type="text" 
                className="transition"
                placeholder="Add Task"              
                style={props.isOpen? {visibility: 'visible'} : {visibility: 'hidden'}}
                onChange={(e)=>{
                  setValue(e.target.value)
                  props.setEditContent(e.target.value)
                }}
                isOpen={props.isOpen}
                onClick={e=>e.stopPropagation()}
                value={value}
                />
            
            {props.children}
        </AddTaskWrapper>
     )
 }

 export default EditTodo