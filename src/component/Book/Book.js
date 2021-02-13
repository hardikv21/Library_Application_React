import React from 'react';

import classes from './Book.css';

const book = (props) => {
    return (
        <table className={classes.Table}>
            <tbody>
                <tr>
                    <td onClick={props.clicked}>
                        <img className={classes.Image} src={props.imageSrc} alt="Not Found"/>
                    </td>
                    <td className={classes.Description}>
                        <section onClick={props.clicked}>
                            <h5>{props.name}</h5>
                            <p>${props.price}</p>
                            <p>{props.category.toUpperCase()} Book</p>
                            <p>{props.description}</p>
                        </section>
                        <button onClick={props.remove}>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default book;