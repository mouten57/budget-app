import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';
import Groceries from './Groceries';
import Gas from './Gas';
import Restaurants from './Restaurants';
import Entertainment from './Entertainment';
import MattsPersonal from './MattsPersonal';

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
                    {this.state.items.map( (item) => 
                    <TransactionListEntry 
                        transaction={item}
                        key={item.key}
                         />
                    )}
                </div>
            )
        }
        const allStyle={fontFamily: 'Garamond', color:'grey'}
        const style={textDecoration:'underline', marginBottom:'8px',fontFamily:'Garamond'}
    return (
        <div>
            <h2 style={style}>Transactions</h2>

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
            <MattsPersonal
                firebase={this.props.firebase}
                items={this.state.items} />
            <div>
                <h3
                    style={allStyle} 
                    onClick={this.toggleAll}>All Transactions</h3>
                {all}  
            </div>
        </div>
    )
}
};

export default TransactionList;