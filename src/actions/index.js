export const startClock=()=>{
    return {
        type: 'START_CLOCK',
    }
}

export const pauseClock = ()=>{
    return {
        type: 'PAUSE_CLOCK'
    }

}

export const endClock = ()=>{
    return {
        type: 'END_CLOCK'
    }
}

export const addDuration = (todoId, duration)=>{
    return {
        type: 'ADD_DURATION',
        payload: {
            id: todoId,
            duration
        }
    }
}

export const toggleTodo = (todoId)=>{
    return {
        type: 'TOGGLE_TODO',
        payload: {
            id: todoId
        }
    }
}

export const editTodo = (todoId)=>{
    return {
        type: 'EDIT_TODO',
        payload: {
            id: todoId
        }
    }

}

export const sendEditedTodo = (todoId, text)=>{
    return {
        type: 'SEND_EDITED_TODO',
        payload: {
            id: todoId,
            text
        }
    }

}

export const deleteTodo = (todoId)=>{
    return {
        type: 'DELETE_TODO',
        payload:{
            id: todoId
        }
    }
}

export const addTodo = (content)=>{
    return {
        type: 'ADD_TODO',
        payload:{
            content
        }
    }
}

export const clearTodo = ()=>{
    return {
        type: 'CLEAR_TODO'
    }
}

export const setFocusTodo=(todo)=>{
    return {
        type: 'SET_FOCUS_TODO',
        payload: {
            name: todo.name,
            id: todo.id
        }

    }
}

export const changeTodoOrder = (todoList)=>{
    return {
        type: 'CHANGE_TODO_ORDER',
        payload: {
            todoList
        }
    }
}