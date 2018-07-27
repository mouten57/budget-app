import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';

class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            restaurantList: [],
            isHidden: true,       
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentWillReceiveProps=(nextProps)=>{
        let list = []
        for(let i=0;i<nextProps.items.length; i++){
            if(nextProps.items[i].category === 'Restaurant'){
                list.push(nextProps.items[i]);
            }
        }
        this.setState({ restaurantList: list})
        this.getTotal(list)
    }

    toggleRestaurant=()=>{
        this.setState({isHidden: !this.state.isHidden})
    }    

    getTotal=(list)=>{
        this.setState({total: list.reduce( (a,b) => {
            return a + Number(b.amount);
          }, 0)
          })      
    }

    render() {
        let restaurantList = null;
        if (!this.state.isHidden) {
            restaurantList = (
                <div>
                {this.state.restaurantList.map(item => 
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
                id='Restaurant'>
                <h3
                style={style}
                onClick={(e)=>this.toggleRestaurant(e)}>Restaurants (total left: {(this.state.total.toFixed(2))})</h3> 
                    {restaurantList}
            </div>
        )}
}

export default Restaurants;