/**
 * Created by admin on 18/05/2017.
 */
import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    render() {
        return (
            <div>
                <p> Hey Inventory!</p>
                <AddFishForm addFish={this.props.addFish}/>
            </div>
        )
    }
}

export default Inventory;