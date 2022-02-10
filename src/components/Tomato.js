import styled from "styled-components"

const TomatoWrapper = styled.div`
    position: relative;
  width: 9rem;
  height: 7rem;
  background: tomato;
  border-radius: 40% 40% 50% 50%;
  box-shadow: inset -2px -2px 0px 0px rgb(148, 31, 10);
  transform: scale(${props=> props.scaleNum ? props.scaleNum :''});
  transform-origin: top left;
  
  &:before {
  content: "";
  width: 4rem;
  height: 3rem;
  clip-path: polygon(
    50% 0%,
    55% 34%,
    98% 35%,
    69% 51%,
    79% 91%,
    50% 56%,
    21% 91%,
    34% 48%,
    2% 35%,
    46% 34%
  );
  background-color: rgb(22, 92, 22);
  position: absolute;
  top: -5px;
  left: 28px;
}
`

const Tomato = (props)=>{
    return (
        <TomatoWrapper scaleNum={props.scaleNum}>
            <div className="tomato-light-1"></div>
            <div className="tomato-light-2"></div>
      </TomatoWrapper>
    )

}

export default Tomato