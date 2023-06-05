import "./styles.css"
export const ActionButton= ({buttonName})=>{
    return (
        <button className="actionButton">{buttonName}</button>
    );
}

export const LinkButton= ({buttonName, props, text})=>{
    return (
        <button className="linkButton" onClick={()=>props.onFormSwitch(text)}>{buttonName}</button>
    );
}


/*import {Button} from "@mui/material" 

export const TestMUIButton = ({Name, onClick}) => {

    return (
        <div>
            <Button onClick={onClick}>Name</Button>
        </div>
    )
}*/