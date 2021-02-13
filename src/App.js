import React, { Component } from 'react';

import BookStore from './container/BookStore/BookStore';

class App extends Component {
  render() {
    return (
      <div>
        <BookStore />
      </div>
    );
  }
}

export default App;
