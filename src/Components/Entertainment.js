import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';

class Entertainment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entertainmentList: [],
            isHidden: true,
            total: 0,
            
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentWillReceiveProps=(nextProps)=>{
        let list = []
        for(let i=0;i<nextProps.items.length; i++){
            if(nextProps.items[i].category === 'Entertainment'){
                list.push(nextProps.items[i]);
            }
        }
        this.setState({ entertainmentList: list})
        this.getTotal(list)
    }
    toggleEntertainment=()=>{
        this.setState({isHidden: !this.state.isHidden})
    }   
    getTotal=(list)=>{
        this.setState({total: list.reduce( (a,b) => {
            return a + Number(b.amount);
          }, 0)
          })      
    }

    render() {
        let entertainmentList = null;
        if (!this.state.isHidden) {
            entertainmentList = (
                <div>
                {this.state.entertainmentList.map(item => 
                    <TransactionListEntry   
                        transaction={item}
                        key={item.key} />
                )}
                </div>
            )
        }
        return(
            <div 
                id='Entertainment'>
                <h3
                onClick={(e)=>this.toggleEntertainment(e)}>Entertainment (total left: {(this.state.total.toFixed(2))})</h3>
                {entertainmentList}
            </div>
        )
    }
}


export default Entertainment;