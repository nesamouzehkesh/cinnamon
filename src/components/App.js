/**
 * Created by admin on 18/05/2017.
 */
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import products from '../sample-products';
import Fish from './Fish';


class App extends React.Component {
    constructor() {
        super(); //to be able to use `this` to point to the main component

        this.addFish = this.addFish.bind(this);
        this.loadFishes = this.loadFishes.bind(this);

        //getinitialstate
        this.state = {
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

    loadFishes() {
        this.setState({
            fishes: products
        });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="I am dynamic"/>
                    <ul className="list-of-fish">
                        {
                            Object.keys(this.state.fishes)
                                .map(key => <Fish key={key} details={this.state.fishes[key]}/>)
                        }

                    </ul>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadFishes={this.loadFishes}/>
            </div>

        )
    }
}

export default App;