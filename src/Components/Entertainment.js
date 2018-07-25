import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';

class Entertainment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entertainmentList: [],
            showEntertainment: false,
            
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentDidMount() {
        this.showEntertainmentTransactions();      
    }

    showEntertainmentTransactions=(e)=> {
        let entertainmentList=[];
        for (let i=0; i<this.props.items.length; i++){
            if(this.props.items[i].category === 'Entertainment' && this.state.showEntertainment){
                entertainmentList.push(this.props.items[i])
            }
        }   
        this.setState({ entertainmentList: entertainmentList}, this.toggleEntertainment)
    }
    toggleEntertainment=()=>{
        const doesShow=this.state.showEntertainment;
        this.setState({showEntertainment: !doesShow})
    }   

    render() {
        return(
            <div 
                id='Entertainment'
                onClick={(e)=>this.showEntertainmentTransactions(e)}>
                <h3>Entertainment</h3>
                {this.state.entertainmentList.map(item => 
                    <TransactionListEntry   
                        transaction={item}
                        key={item.key} />
                )}
            </div>
        )
    }
}


export default Entertainment;