const INITIAL_STATE = {
    todoNow: null
}

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'SET_FOCUS_TODO':
            return {...state, todoNow: action.payload}
        default:
            return state
    }
}