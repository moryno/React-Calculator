import React, {useState} from "react";
import {Button, Container, Current, Previous, Screen} from "./Styled";

function Calculator(){
    
    const [previous, setPrevious] = useState("");
    const [current, setCurrent] = useState("");
    const [operation, setOperation] = useState("");

    const appendValue = (element)=>{
        const value = element.target.getAttribute("data");
        if(value === "." && current.includes(".")) return;
        setCurrent(current + value); 
    }
    const allClear =()=> {
        setCurrent(""); 
        setPrevious("");
        setOperation("");
    }
    const deleteValue = ()=>setCurrent(String(current).slice(0,-1));

    const chooseOperator = (el)=> {
        if(current === "") return;
        if(previous !== ""){
            let value = compute();
            setPrevious(value);
            

        }
        else{
            setPrevious(current);
        }
        setCurrent("");
        setOperation(el.target.getAttribute("data"));
    }

    const compute = ()=>{
        let result;
        let previousNumber = parseFloat(previous);
        let currentNumber = parseFloat(current);
        if(isNaN(previousNumber) || isNaN(currentNumber)) return;
        switch (operation) {
            case "÷":
                result = previousNumber / currentNumber
                break;
            case "x":
                result = previousNumber * currentNumber;
                break;
            case "+":
                result = previousNumber + currentNumber;
                break;
            case "-":
                result = previousNumber - currentNumber;
                break;
        
            default:
                return;
            
            
        }
        return result;
    }

    const equals = ()=>{
        let value = compute();
        if(value === undefined || value === null) return;
        setCurrent(value);
        setPrevious("");
        setOperation("");
    }

    return(
        <div>
            <Container>
               <Screen>
                   <Previous >{previous} {operation}</Previous>
                   <Current >{current}</Current>
               </Screen>
               <Button controls onClick={allClear} gridSpan={2}>AC</Button>
               <Button controls onClick={deleteValue} >DEL</Button>
               <Button data={"÷"} onClick={chooseOperator} operation >÷</Button>
               <Button data={"7"} onClick={appendValue}>7</Button>
               <Button data={"8"} onClick={appendValue}>8</Button>
               <Button data={"9"} onClick={appendValue}>9</Button>
               <Button data={"x"} onClick={chooseOperator} operation>x</Button>
               <Button data={"4"} onClick={appendValue}>4</Button>
               <Button data={"5"} onClick={appendValue}>5</Button>
               <Button data={"6"} onClick={appendValue}>6</Button>
               <Button data={"+"} onClick={chooseOperator} operation>+</Button>
               <Button data={"1"} onClick={appendValue}>1</Button>
               <Button data={"2"} onClick={appendValue}>2</Button>
               <Button data={"3"} onClick={appendValue}>3</Button>
               <Button data={"-"} onClick={chooseOperator} operation>-</Button>
               <Button controls period data={"."} onClick={appendValue}>.</Button>
               <Button  data={"0"} onClick={appendValue}>0</Button>
               <Button gridSpan={2} onClick={equals} equal>=</Button>
            </Container>
        </div>
    )
}

export default Calculator;