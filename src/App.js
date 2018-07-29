import React, { Component } from 'react';
import './App.css';
import Balance from './Components/Balance';
import TransactionList from './Components/TransactionList';
import Add from './Components/Add';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBxOMfjywXa5b3_QeYCO8mLwudFhGLEbKQ",
  authDomain: "personal-budget-app-aeac2.firebaseapp.com",
  databaseURL: "https://personal-budget-app-aeac2.firebaseio.com",
  projectId: "personal-budget-app-aeac2",
  storageBucket: "personal-budget-app-aeac2.appspot.com",
  messagingSenderId: "198205468642"
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
    });

    this.itemRef.on("child_removed", snapshot => {
      this.setState({
        items: this.state.items.filter(item => item.key !== snapshot.key)
      });
    });
  };


  render() {

    return (
      <div className="App">
        <h1>My Bi-Weekly Budget</h1>
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
