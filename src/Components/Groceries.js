import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';

class Groceries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groceryList: [],
            isHidden: true,
            
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentWillReceiveProps=(nextProps)=>{
        let list = []
        for(let i=0;i<nextProps.items.length; i++){
            if(nextProps.items[i].category == 'Groceries'){
                list.push(nextProps.items[i]);
            }
        }
        this.setState({ groceryList: list})
        this.getTotal(list)
    }
    toggleGroceries=()=>{
        this.setState({isHidden: !this.state.isHidden})
    } 
    getTotal=(list)=>{
        this.setState({total: list.reduce( (a,b) => {
            return a + Number(b.amount);
          }, 0)
          })      
    }
    render(){
        let groceryList = null;
        if (!this.state.isHidden) {
            groceryList = (
                <div>
                {this.state.groceryList.map(item => 
                <TransactionListEntry   
                transaction={item}
                key={item.key} />
                )}
                </div>
            )
        }
        return(

        <div 
            id='Groceries'
            onClick={(e)=>this.toggleGroceries(e)}>
            <h3>Groceries (total left: {480+(this.state.total)})</h3>
            {groceryList}     
        </div>
        )
    }   
}

export default Groceries;