//our first component
import React from 'react';
import { getFunName } from '../helpers';


class StorePicker extends React.Component {
    constructor() {
        super();
        this.goToStore = this.goToStore.bind(this); //this will bind the `this` in methods outside render to main component
    }

    goToStore(event) {
        event.preventDefault();
        const storeId = this.storeInput.value; //this `this` needs to be bound to the main component, otherwise it's null
        console.log(`${storeId}`);

        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()}
                ref={(input) => {this.storeInput = input}}/>
                <button type="submit">Visit Store -></button>
            </form>
        ) 
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;