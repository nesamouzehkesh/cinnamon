/**
 * Created by admin on 18/05/2017.
 */
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import StorePicker from "./StorePicker";


class App extends React.Component {
    constructor() {
        super(); //to be able to use `this` to point to the main component
        this.addFish = this.addFish.bind(this);
        //getinitialstate
        this.state = {
            name: 'nesa',
            fishes: {},
            order: {}
        };
    }

    addFish(fish) {
        // Copy our state to a temp variable
        const fishes = {...this.state.fishes};
        // Add our new fish to our temp variable
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // Set new sate for fishes
        this.setState({fishes: fishes});
    }


    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="I am dynamic"/>
                </div>
                <Order />
                <Inventory addFish={this.addFish} />
            </div>

        )
    }
}

export default App;