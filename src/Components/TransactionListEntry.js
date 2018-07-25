import React from 'react';

var TransactionListEntry = (props) => {
    var style = {
        color: props.transaction.amount > 0 ? 'green' : 'red'
    };
    return (
        <div>
            <p style={style}>{props.transaction.time} {Number(props.transaction.amount).toFixed(2)} {props.transaction.description}</p>
        </div>
    )
};


export default TransactionListEntry;