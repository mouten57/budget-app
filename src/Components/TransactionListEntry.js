import React from 'react';
import firebase from 'firebase';
import './TransactionListEntry.css';

var TransactionListEntry = (props) => {
    var style = {
        color: props.transaction.amount > 0 ? 'green' : 'red',
        display: 'inline-block',
        marginTop: '3px',
        marginBottom: '3px'
    };

    const deleteItem=(item)=> {
        let itemRef = firebase.database().ref('items/');
        itemRef.child(props.transaction.key).remove().then(() => {
            console.log(`${props.transaction.description} removed`)
        });
    }
    return (
        <div className='item-line'>
            <p style={style}>{props.transaction.time} {Number(props.transaction.amount).toFixed(2)} {props.transaction.description}</p>
            <button 
                className='del'
                onClick={deleteItem}    
            >delete</button>
        </div>
    )
};


export default TransactionListEntry;