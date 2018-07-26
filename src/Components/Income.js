import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';

class Income extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeList: [],
            isHidden: true,
            total: 0,
            
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentWillReceiveProps=(nextProps)=>{
        let list = []
        for(let i=0;i<nextProps.items.length; i++){
            if(nextProps.items[i].category === 'Income'){
                list.push(nextProps.items[i]);
            }
        }
        this.setState({ incomeList: list})
        this.getTotal(list)
    }
    toggleIncome=()=>{
        this.setState({isHidden: !this.state.isHidden})
    }   
    getTotal=(list)=>{
        this.setState({total: list.reduce( (a,b) => {
            return a + Number(b.amount);
          }, 0)
          })      
    }
    render(){
        let incomeList = null;
        if (!this.state.isHidden) {
            incomeList = (
                <div>
                {this.state.incomeList.map(item => 
                <TransactionListEntry   
                transaction={item}
                key={item.key} />
                )}
                </div>
            )
        }
        return(

        <div 
            id='Income'
            onClick={(e)=>this.toggleIncome(e)}>
            <h3>Income (total: {(this.state.total)})</h3>
            {incomeList}
        </div>
        )
    }   
}

export default Income;