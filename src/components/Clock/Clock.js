import styled from "styled-components";
import Button from "../Button";
import { connect } from "react-redux";
import { startClock, pauseClock, endClock, addDuration } from "../../actions";
import { useState, useEffect } from "react";

const Tab = styled.div.attrs({
    className: "cursor-pointer",
})`
text-align: center;
width: 6rem;
padding: 0.5rem;
background: ${props => props.isBreak? 'rgba(60, 179, 113,0.8)' : 'rgba(255, 255, 255, 0.5)'} ;
border-radius: 10px 10px 0 0;
box-shadow: ${props=>props.isActive? '5px 0px 0px grey' : ''};
position: ${props=>props.isActive? 'relative' : ''};
transition: 0.3s ease-in;
`;


const ClockWrapper = styled.div`
background: ${props=> props.isBreak?  'rgba(60, 179, 113,0.8)' : 'rgba(255, 255, 255, 0.5)'};
width: 100%;
height: 300px;
padding: 20px;
border-radius: 0 30px 30px 30px;
transition: 0.3s ease-in;`

const ClockTime = styled.div`
font-size: 120px;
font-weight: bold;
transition: 0.3s ease-in;
`


const Clock = (props)=>{
    const [clockMin,setClockMin] = useState('')
    const [clockSec,setClockSec] = useState('')
    const [remainSecs,setRemainSecs] = useState(null)
    const [intervalTimerId, setIntervalTimer] = useState('')
    const [clockType, setClockType] = useState('task')

    const [alarm] = useState(new Audio('./assets/alarm.mov') )
    const [alarmIsPlay, setAlarmIsPlay] = useState(false)

   

    let initialValue = {
        min: props.minPerSession,
        sec: 0,
    }
    

    useEffect(()=>{
        setClock() 
    },[])

    useEffect(()=>{
        if(remainSecs === null || !props.isClockStarted) return
        const tmpTimerId = setTimeout(()=> countDownStart(),1000)
        setIntervalTimer(tmpTimerId)
  
    },[remainSecs, props.isClockStarted])


    useEffect(()=>{
        if(alarmIsPlay) setTimeout(()=>toggleAlarm(),3000)

    },[alarmIsPlay])

    const toggleAlarm = ()=>{
        const alarmIsPlayTmp = !alarmIsPlay
        setAlarmIsPlay(alarmIsPlayTmp)
        if(alarmIsPlayTmp) alarm.play()
        else alarm.pause()
    }

    const setClock=()=>{
        if(intervalTimerId) clearInterval(intervalTimerId)
        props.endClock()
        setClockMin(initialValue.min)
        setClockSec(initialValue.sec)
        setRemainSecs(initialValue.min*60 + initialValue.sec*1 - 1)  
    }

    const startClock = ()=>{
        if(props.isClockStarted === null){           
            props.startClock()
        }     
        else if(!props.isClockStarted) props.startClock()
        else if(props.isClockStarted){
            clearInterval(intervalTimerId)
            props.pauseClock()

        }
    }
    
    const renderTime = ()=>{
        return `${(('00').concat(clockMin)).slice(-2)}:${(('00').concat(clockSec).slice(-2))}`
    }

    const countDownStart = ()=>{
        setClockMin(Math.floor(remainSecs/60))
        setClockSec(Math.floor(remainSecs%60))
        
        if(remainSecs <= 0){
            clearInterval(intervalTimerId)
            toggleAlarm()
            setTimeout(()=>{
                setClock()
                props.endClock()
                props.addDuration(props.focusTodo?.id, initialValue.min*60 + initialValue.sec*1)
            }, 3000)
            return
        }
        setRemainSecs(remainSecs - 1)
    }

    const changeClock = (type)=>{
        if(type === 'task') {initialValue.min = props.minPerSession
            setClockType('task')}
        if(type === 'break') {
            initialValue.min = props.breakPerSession
            setClockType('break')
        }

        setClock()
    }



    return (

            <div className="container">
                <div className="flex">
                        <Tab onClick={()=>changeClock('task')} isActive={clockType === 'task'}>
                            <h3>Task</h3>
                        </Tab>
                        <Tab onClick={()=>changeClock('break')} isBreak isActive={clockType === 'break'}>
                            <h3>Break</h3>
                        </Tab>
                </div>
                <ClockWrapper className="flex-column justify-content-between align-items-center" isBreak={clockType === 'break'}>
                    
                    <div className="title">
                        <span>{props.focusTodo?.name? 'Working on...': ''}</span>
                        <h1>{props.focusTodo?.name}</h1>
                    </div>
                    
                    <ClockTime>{renderTime()}</ClockTime>
                    <Button onButtonClick={startClock} text={props.isClockStarted ? 'PAUSE': 'START'} fontSize="2rem"></Button>
                </ClockWrapper>
        
            </div>

    )
}


const mapStateToProp= (state,ownProp)=>{
    return {
        isClockStarted: state.clock.isClockStarted, 
        minPerSession: state.clock.minPerSession, 
        breakPerSession: state.clock.breakPerSession,
        focusTodo: state.focusTodo.todoNow
    }

}

export default connect(mapStateToProp,{startClock, pauseClock, endClock,addDuration})(Clock);