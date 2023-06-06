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

export const Descrip = ({buttonName, props, text}) => {
    console.log(typeof text)
    return(
        <button className="linkButton" onClick={()=> props.onClick(text)}>{buttonName}</button>
    )
}