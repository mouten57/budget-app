import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';

class Groceries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groceryList: [],
            showGroceries: false,
            
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentDidMount() {
        this.showGroceryTransactions();      
    }
    showGroceryTransactions=(e)=> {
        let groceryList=[];
        for (let i=0; i<this.props.items.length; i++){
            if(this.props.items[i].category === 'Groceries' && this.state.showGroceries){
                groceryList.push(this.props.items[i])
            }
        }   
        this.setState({ groceryList: groceryList}, this.toggleGroceries)
    }
    toggleGroceries=()=>{
        const doesShow=this.state.showGroceries;
        this.setState({showGroceries: !doesShow})
    }   

    render(){
        return(

        <div 
            id='Groceries'
            onClick={(e)=>this.showGroceryTransactions(e)}>
            <h3>Groceries</h3>
            {this.state.groceryList.map(item => 
            <TransactionListEntry   
                transaction={item}
                key={item.key} />
                )}
        </div>
        )
    }   
}

export default Groceries;