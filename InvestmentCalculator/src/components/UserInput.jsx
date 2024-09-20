export default function userInput({label,inputId,handleChange,initialInputValue}){

    function handleInternalChange(event) {
        const decimalValue = parseFloat(event.target.value);
        handleChange(inputId, decimalValue); // Pass inputId and the value from the event
    }

    return(
        <div>
            <label htmlFor="">{label}</label>
            <input type="number" value={initialInputValue} onChange={handleInternalChange} />
        </div>
    );
}
