const INITIAL_STATE = [
    {
        id: 1,
        name: 'Spanish',
        isDone: false,
        isEdit: false,
        duration:null,
    },
    {
        id: 2,
        name: 'Duolingo',
        isDone: false,
        isEdit: false,
        duration:null,
    }
]

export default (state=INITIAL_STATE, action)=>{
    let newState = [...state]
    let index = -1

    if(action.payload?.id){
        index = newState.map(i=>i.id).findIndex((i)=> action.payload.id === i)
    }

    switch(action.type){
        case 'CHANGE_TODO_ORDER':
            newState = action.payload.todoList
            console.log('newState')
            console.log(newState)
            return newState
        case 'ADD_TODO':
            newState.push({
                id: Date.now(),
                name: action.payload.content,
                isDone: false,
                isEdit: false,
                duration:null,
            })
            return newState
        case 'TOGGLE_TODO':
            newState[index]['isDone'] = !newState[index]['isDone']
            return newState
        case 'EDIT_TODO':
            newState[index]['isEdit'] = true
            return newState
        case 'SEND_EDITED_TODO':
            if(action.payload.text) newState[index]['name'] = action.payload.text
            newState[index]['isEdit'] = false
            return newState
        case 'DELETE_TODO':
            return newState.filter(item=>item.id !== action.payload.id)
        case 'ADD_DURATION':
            if(index < 0) return newState
            if(!newState[index]['duration']) newState[index]['duration'] = action.payload.duration
            else newState[index]['duration'] += action.payload.duration
            return newState
        case 'CLEAR_TODO':
            return newState = []
        default:
            return state
    }

}