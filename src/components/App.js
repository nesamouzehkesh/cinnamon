import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
import products from '../products';

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadFishes = this.loadFishes.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);

        // getinitialState
        this.state = {
            fishes: {},
            order: {},
            products: {}
        };
    }

    componentWillMount() {
        // this runs right before the <App> is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        // check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if(localStorageRef) {
            // update our App component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
        //this is for a small side project test in Order Component
        //from react tutorial (you can delete this at a later time)
        this.setState({products: products});
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    
        addFish(fish) {
        // update our state
        const fishes = {...this.state.fishes};
        // add in our new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // set state
        this.setState({ fishes });
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    removeFish(key) {
        //first take a copy of our fishes
        const fishes = {...this.state.fishes};
        //you can't just say `delete fishes[key]` because we are hooked
        //to firebase, so with firebase you need to explicitly set it to null:
        fishes[key] = null;
        //update your state:
        this.setState({ fishes });
    }

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    }

    loadFishes() {
        this.setState({
            fishes: sampleFishes ,
        });
    }

    addToOrder(key) {
        // take a copy of our state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        // update our state
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes}
                       order={this.state.order}
                       params={this.props.params}
                       removeFromOrder={this.removeFromOrder}
                       products={this.state.products}
                />
                <Inventory addFish={this.addFish}
                           loadFishes={this.loadFishes}
                           fishes={this.state.fishes}
                           updateFish={this.updateFish}
                           removeFish={this.removeFish}

                />
            </div>
        )
    }
}

export default App;
