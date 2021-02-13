import React, { Component } from 'react';
import { connect } from 'react-redux';

import Book from '../../component/Book/Book';
import Modal from '../../component/Modal/Modal';
import AddBook from '../AddBook/AddBook';
import classes from './BookStore.css';
import * as actionTypes from '../../store/actions';

class BookStore extends Component {
    state = {
        addingBook: false
    };

    addBookHandler = () => {
        this.setState({
            addingBook: true,
        });
    }

    addBookCancelHandler = () => {
        this.props.onUpdateCancelIndex();
        this.setState({
            addingBook: false
        });
    }

    showForm = (index) => {
        this.addBookHandler();
        this.props.onUpdateIndex(index);
    }

    render() {
        const books = this.props.books.map((book, index) => {
            return (
                <Book 
                    key={index}
                    name={book.name}
                    price={book.price}
                    category={book.category}
                    imageSrc={book.image}
                    description={book.description}
                    remove={() => this.props.onRemoveBook(index)}
                    clicked={() => this.showForm(index)}
                />
            );
        });

        return(
            <div className={classes.BookStore}>
                <button
                    onClick={this.addBookHandler}
                    className={classes.AddButton}
                >Add Book</button>
                <Modal
                    show={this.state.addingBook}
                    modalClosed={this.addBookCancelHandler}
                >
                    <AddBook done={this.addBookCancelHandler}/>
                </Modal>
                {books}
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
        onRemoveBook: (index) => dispatch ({
            type: actionTypes.REMOVE_BOOK,
            index: index
        }),
        onUpdateIndex: (index) => dispatch ({
            type: actionTypes.UPDATE_INDEX,
            index: index
        }),
        onUpdateCancelIndex: () => dispatch ({
            type: actionTypes.UPDATE_CANCEL_INDEX
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStore);