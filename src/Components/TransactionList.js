import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';
import Groceries from './Groceries';
import Gas from './Gas';
import Restaurants from './Restaurants';
import Entertainment from './Entertainment';

class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentDidMount() {
        this.itemRef.on('child_added', snapshot => {
            const item = snapshot.val();
            item.key=snapshot.key;
            let items = this.state.items.concat( item );
            this.setState({ items: items });
        })
    }

    render() { 
    return (
        <div>
            <h1>Transactions</h1>
            <Groceries 
                firebase={this.props.firebase}
                items={this.state.items}/>
            <Gas    
                firebase={this.props.firebase}
                items={this.state.items}/>
            <Restaurants    
                firebase={this.props.firebase}
                items={this.state.items} />
            <Entertainment
                firebase={this.props.firebase}
                items={this.state.items} />
            <div>
                <h3>All Transactions</h3>
                {this.state.items.map( item => 
                    <TransactionListEntry 
                        transaction={item}
                        key={item.key} />
                )}
                
            </div>
        </div>
    )
}
};

export default TransactionList;