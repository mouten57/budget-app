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
            isHidden: true,
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentWillReceiveProps(nextProps) {
        this.setState({items: nextProps.items})
    }

    toggleAll=()=>{
        this.setState({isHidden: !this.state.isHidden})
    }

    render() { 
        let all = null;
        if (!this.state.isHidden) {
            all = (
                <div>
                    {this.state.items.map( item => 
                    <TransactionListEntry 
                        transaction={item}
                        key={item.key} />
                    )}
                </div>
            )
        }
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
            <div onClick={this.toggleAll}>
                <h3>All Transactions</h3>
                {all}  
            </div>
        </div>
    )
}
};

export default TransactionList;