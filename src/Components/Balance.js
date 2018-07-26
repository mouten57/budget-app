import React from 'react';

const Balance = (props) => {
    var style = {
        color: props.total > 0 ? 'green' : 'red'
    };
    const h2style={textDecoration:'underline'}
    return (
        <div>
            <h2 style={h2style}>Total Balance</h2>
            <p style={style}>${ props.total.toFixed(2) }</p>
        </div>
    )
};

export default Balance;