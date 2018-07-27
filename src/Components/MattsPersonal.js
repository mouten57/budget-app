import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';

class MattsPersonal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mattsPersonalList: [],
            isHidden: true,
            total: 0,
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentWillReceiveProps=(nextProps)=>{
        let list = []
        for(let i=0;i<nextProps.items.length; i++){
            if(nextProps.items[i].category === "Matt's Personal"){
                list.push(nextProps.items[i]);
            }
        }
        this.setState({ mattsPersonalList: list})
        this.getTotal(list)
    }
   
    toggleMattsPersonal=()=>{
        this.setState({isHidden: !this.state.isHidden})
    } 
    getTotal=(list)=>{ 
        this.setState({total: list.reduce( (a,b) => {
            return a + Number(b.amount);
          }, 0)
          })      
    }

    render(){
        let mattsPersonalList = null;
        if (!this.state.isHidden) {
            mattsPersonalList = (
                <div>
                {this.state.mattsPersonalList.map(item => 
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
            id="MattsPersonal">
            <h3
            style={style}
            onClick={(e)=>this.toggleMattsPersonal(e)}>Matt's Personal (total left: {(this.state.total.toFixed(2))})</h3>
            {mattsPersonalList}     
        </div>
        )
    }   
}

export default MattsPersonal;

