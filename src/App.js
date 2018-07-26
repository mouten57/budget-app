import React, { Component } from 'react';
import './App.css';
import Balance from './Components/Balance';
import TransactionList from './Components/TransactionList';
import Add from './Components/Add';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCfUsJFbYA57Q0KqEepEBcUoRFEy0yi-QU",
  authDomain: "budget-app-a22d6.firebaseapp.com",
  databaseURL: "https://budget-app-a22d6.firebaseio.com",
  projectId: "budget-app-a22d6",
  storageBucket: "",
  messagingSenderId: "158748098860"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      items: [],
      total: 0,
    };
    this.itemRef = firebase.database().ref('items/');
  }
  getTotal=()=> {
    this.setState({total: this.state.items.reduce( (a,b) => {
      return a + Number(b.amount);
    }, 0)
    })
  }

  componentWillMount() {
    this.itemRef.on('child_added', snapshot => {
      const item = snapshot.val();
      item.key=snapshot.key;
      let items = this.state.items.concat( item );
      this.setState(
        { 
          items: items,
         },
         this.getTotal
         //this is my callback^^ allows items to load, then calls getTotal! hooray
        );
    })
  };


  render() {
    return (
      <div className="App">
        <h1>My Monthly Budget</h1>
        <Add
          firebase={firebase}
           />
        <TransactionList  
          firebase={firebase}
          items={this.state.items} />
        <Balance
          total ={this.state.total} />
        
      </div>
    );
  }
}

export default App;
