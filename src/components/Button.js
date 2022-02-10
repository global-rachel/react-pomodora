import styled from "styled-components"

const ButtonComponent = styled.button`
background-color: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 4px 8px;
  border-radius: 5px;
  margin: ${props=>props.margin? props.margin: ''};
  font-weight: bold;
  font-size: ${props=>props.fontSize? props.fontSize: '1rem'};
`

const Button = (props)=>{

    return (
        <ButtonComponent
            className="cursor-pointer" 
            onClick={props.onButtonClick}
            margin={props.margin}
            fontSize={props.fontSize}
            >
            {props.text}
        </ButtonComponent>
    )
}

export default Button