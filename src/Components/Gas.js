import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';

class Gas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gasList: [],
            isHidden: true,
            total: 0,
            
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentWillReceiveProps=(nextProps)=>{
        let list = []
        for(let i=0;i<nextProps.items.length; i++){
            if(nextProps.items[i].category === 'Gas'){
                list.push(nextProps.items[i]);
            }
        }
        this.setState({ gasList: list})
        this.getTotal(list)
    }
    toggleGas=()=>{
        this.setState({isHidden: !this.state.isHidden})
    }   
    getTotal=(list)=>{
        this.setState({total: list.reduce( (a,b) => {
            return a + Number(b.amount);
          }, 0)
          })      
    }
    render(){
        let gasList = null;
        if (!this.state.isHidden) {
            gasList = (
                <div>
                {this.state.gasList.map(item => 
                <TransactionListEntry   
                transaction={item}
                key={item.key} />
                )}
                </div>
            )
        }
        let style={marginTop: '10px', marginBottom: '10px'}
        return(

        <div 
            id='Gas'>
            <h3
            style={style}
            onClick={(e)=>this.toggleGas(e)}>Gas (total left: {(this.state.total.toFixed(2))})</h3>
            {gasList}
        </div>
        )
    }   
}

export default Gas;