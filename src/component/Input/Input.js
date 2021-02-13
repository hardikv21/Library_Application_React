import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let input = null;

    const inputClasses = [classes.Input];

    let inputError = "";

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        inputError = <p
            className={classes.InputError}
        >
            Please add book {props.elementConfig.placeholder.toLowerCase()}
        </p>;
    }
    
    switch (props.elementType) {
        case ("input"):
            input = <input
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;

        case ("textarea"):
            input = <textarea
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;

        case ("select"):
            input = <select
                className={inputClasses.join(" ")}
                value={props.value}
                onChange={props.changed}
            >
                {
                    props.elementConfig.options.map(option => {
                        return (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.displayValue}
                            </option>
                        );
                    })
                }
            </select>;
            break;
    
        default:
            input = <input
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
    }

    return (
        <div
            className={classes.InputElement}
        >
            {input}
            {inputError}
        </div>
    );
}

export default input;