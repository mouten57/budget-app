import React, { Component } from 'react';
import TransactionListEntry from './TransactionListEntry';

class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            restaurantList: [],
            showRestaurants: false,
            
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }
    componentDidMount() {
        this.showRestaurantTransactions(); 
    }
    showRestaurantTransactions=(e)=> {
        let restaurantList=[];
        for (let i=0; i<this.props.items.length; i++){
            if(this.props.items[i].category === 'Restaurant' && this.state.showRestaurants){
                restaurantList.push(this.props.items[i])
            }
        }   
        this.setState({ restaurantList: restaurantList}, this.toggleRestaurants
        )
    }
    toggleRestaurants=()=>{
        const doesShow=this.state.showRestaurants;
        this.setState({showRestaurants: !doesShow})
    }   

    getTotal=()=> {
        
      }

    render() {
        return(
            <div 
                id='Restaurant'
                onClick={(e)=>this.showRestaurantTransactions(e)}>
                <h3>Restaurants</h3> 
                <p>Total:{this.state.total}</p>
                    {this.state.restaurantList.map(item => 
                    <TransactionListEntry   
                        transaction={item}
                        key={item.key} />
                    )}
            </div>
        )}
}

export default Restaurants;