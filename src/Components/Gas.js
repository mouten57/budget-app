import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';

class Gas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gasList: [],
            showGas: false,
            
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentDidMount() {
       
        this.showGasTransactions();      
    }
    showGasTransactions=(e)=> {
        let gasList=[];
        for (let i=0; i<this.props.items.length; i++){
            if(this.props.items[i].category === 'Gas' && this.state.showGas){
                gasList.push(this.props.items[i])
            }
        }   
        this.setState({ gasList: gasList}, this.toggleGas
        )
    }
    toggleGas=()=>{
        const doesShow=this.state.showGas;
        this.setState({showGas: !doesShow})
    }   

    render(){
        return(

        <div 
            id='Gas'
            onClick={(e)=>this.showGasTransactions(e)}>
            <h3>Gas</h3>
            {this.state.gasList.map(item => 
            <TransactionListEntry   
                transaction={item}
                key={item.key} />
                )}
        </div>
        )
    }   
}

export default Gas;