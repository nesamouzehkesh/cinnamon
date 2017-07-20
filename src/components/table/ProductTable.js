import React from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';

class ProductTable extends React.Component {

    render() {
        var rows = [];
        var lastCategory = null;

        this.props.products.map(product => {
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
            }
            rows.push(<ProductRow product={product} key={product.name}/>);
            lastCategory = product.category;
        });
        return(
          <table>
              <thead>
                <th>Name</th>
                <th>Price</th>
              </thead>
              <tbody>
                {rows}
              </tbody>
          </table>
        );
    }
 }
 export default ProductTable;