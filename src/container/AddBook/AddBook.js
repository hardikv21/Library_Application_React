import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../component/Input/Input';
import classes from './AddBook.css';
import * as actionTypes from '../../store/actions';

class AddBook extends Component {
    state = {
        bookForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            price: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Price"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            category: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "small" ,displayValue: "Small"},
                        {value: "medium" ,displayValue: "Medium"},
                        {value: "large" ,displayValue: "Large"},
                    ]
                },
                value: "small",
                valid: true
            },
            description: {
                elementType: "textarea",
                elementConfig: {
                    type: "text",
                    placeholder: "Description"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            image: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Image link"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        updateFlag: -1
    };   

    inputChangeHandler = (event, inputId) => {
        const updatedBookForm = {
            ...this.state.bookForm
        };
        const updatedFormElement = {
            ...updatedBookForm[inputId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedBookForm[inputId] = updatedFormElement;
        let formIsValid = true;
        for(let key in updatedBookForm) {
            formIsValid = updatedBookForm[key].valid && formIsValid;
        }
        this.setState({
            bookForm: updatedBookForm,
            formIsValid: formIsValid
        });
    }

    checkValidation (value, rules) {
        let isValid = true;
        if(!rules) {
            return true;
        }
        if(rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    onBookAddHandler = (event) => {
        event.preventDefault();
        let formData = {};
        let updatedForm = {...this.state.bookForm};
        for(let key in this.state.bookForm) {
            formData[key] = this.state.bookForm[key].value;
            key === "select" ? updatedForm[key].value="small" : updatedForm[key].value="";
        }
        this.setState({
            ...this.state,
            bookForm: updatedForm,
            formIsValid: false
        });
        if(this.state.updateFlag !== -1) {
            this.props.onUpdateBook(formData, this.state.updateFlag);
        }
        else {
            this.props.onAddBook(formData);
        }
    }

    onSetUpdateForm = () => {
        const updatedBookForm = {
            ...this.state.bookForm
        };
        for(let key in updatedBookForm) {
            const updatedFormElement = {
                ...updatedBookForm[key]
            };
            updatedFormElement.value = this.props.books[this.props.updateIndex][key];
            updatedFormElement.valid = true;
            updatedFormElement.touched = true;
            updatedBookForm[key] = updatedFormElement;
        }
        this.setState({
            bookForm: updatedBookForm,
            formIsValid: true,
            updateFlag: this.props.updateIndex
        });
    }

    render () {
        if(this.props.updateIndex !== -1 && this.state.updateFlag !== this.props.updateIndex) {
            this.onSetUpdateForm();
        }

        let formElementArray = [];

        for(let key in this.state.bookForm) {
            formElementArray.push({
                id: key,
                config: this.state.bookForm[key]
            });
        }

        let form = (
            <form onSubmit={this.onBookAddHandler}>
                {
                    formElementArray.map(formElement => {
                        return (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                                shouldValidate={formElement.config.validation}
                                invalid={!formElement.config.valid}
                                touched={formElement.config.touched}
                            />
                        );
                    })
                }
                <button
                    disabled={!this.state.formIsValid}
                    type="Submit"
                    className={classes.AddButtonForm}
                    onClick={this.props.done}
                >
                    {this.props.updateIndex !== -1 ? "Update" : "Create"}
                </button>
            </form>
        );
        return (
            <div>
                <h3>Add Book</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        books: state.books,
        updateIndex: state.updateIndex
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddBook: (book) => dispatch({
            type: actionTypes.ADD_BOOK,
            book: book
        }),
        onUpdateBook: (book, index) => dispatch({
            type: actionTypes.UPDATE_BOOK,
            book: book,
            index: index
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);