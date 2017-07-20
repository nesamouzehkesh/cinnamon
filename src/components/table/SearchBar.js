import React from 'react';

class SearchBar extends React.Component {
    render() {
        return (
          <form>
              <input type="text" placeholder="search..."/>
              <p>
                  <input type="checkbox"/>
                  {' '}
                  Only show products in stock
              </p>
          </form>
        );
    }
}
export default SearchBar;
