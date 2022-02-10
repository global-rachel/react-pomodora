const INITIAL_STATE={
    isClockStarted: null,
    minPerSession: 25,
    breakPerSession: 5,
}

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'START_CLOCK':
            return {...state, isClockStarted: true}
        case 'PAUSE_CLOCK':
            return {...state, isClockStarted: false}
        case 'END_CLOCK':
            return {...state, isClockStarted: null}
        default: 
            return state
    }

}