import React, { Component} from 'react';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            amount: '',
            category:'Income',
            expense: 'income',
        }
        this.itemRef = this.props.firebase.database().ref('items/');
    }

    
    handleChangeDesc =(e)=> {
        this.setState({
            description: e.target.value
        });
    }
    handleChangeAmt=(e)=> {
        this.setState({
            amount: e.target.value
        });
}
    handleChangeCat=(e)=> {
        this.setState({
            category: e.target.value
        })
    }

    handleChangeExpense=(e)=> {
        this.setState({
            expense: e.target.value
        })
    }
    convertTimestamp = (timestamp) => {
        var d = new Date(timestamp),	// Convert the passed timestamp to milliseconds
          mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
          dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
          hh = d.getHours(),
          h = hh,
          min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
          ampm = 'AM',
          time;
            
        if (hh > 12) {
          h = hh - 12;
          ampm = 'PM';
        } else if (hh === 12) {
          h = 12;
          ampm = 'PM';
        } else if (hh === 0) {
          h = 12;
        }
        // ie: 02/18 8:35 AM	
        time = mm + '/' + dd + " " + h + ':' + min + ' ' + ampm;
        return time;
      }


    add = () => {
        let amount=this.state.amount
        if(this.state.expense==='income'){amount = Number(amount)}
        else if(this.state.expense === 'expense'){amount=Number(amount)*-1}
        
        var submitData = {
            amount: amount,
            description: this.state.description,
            category: this.state.category,
            time: this.convertTimestamp(Date.now()),
            expense: this.state.expense,
        };

        var newItemKey = this.itemRef.push().key;
        var updates = {};
        updates['/items/' + newItemKey] = submitData;
        if (submitData.amount.length === 0 ||submitData.description.length === 0 || submitData.expense==='' || submitData.category===''){
            alert('One or more missing fields.')
        }
        else if (isNaN(submitData.amount)) {
            alert('Cost should be a number.')
        }
        else if (!isNaN(submitData.description)) {
            alert('Description should be text.')
        } 
        else {
            this.props.firebase.database().ref().update(updates);
            this.setState({ description: '', amount: '', category: 'Income', expense: 'income'});
            
        }
    }

    render() {
        const style = {width: '45px', margin:"2px"}
        const style2= {margin: '2px'}
        return (
            <div>
                <form
                    onSubmit={(e) => { e.preventDefault(); this.add()}}
                    style={style2}>
                    <input type='text' 
                        placeholder='Description' 
                        style={style2}
                        value={this.state.description}
                        onChange={this.handleChangeDesc}
                        />

                    <input type='text' 
                        placeholder='Amount'
                        style={style}
                        value={this.state.amount}
                        onChange={this.handleChangeAmt} />
                        
                        <select name='expense'
                        onChange={this.handleChangeExpense}
                        value={this.state.expense}
                        style={style2}
                        >
                        <option value='income'>Income</option>
                        <option value='expense'>Expense</option>
                        </select>

                        <select 
                            name="categories"      
                            onChange={this.handleChangeCat}
                            value={this.state.category}
                            style={style2}
                            >
                            <option value="Income">Income</option>
                            <option value="Gas">Gas</option>
                            <option value="Groceries">Groceries</option>
                            <option value='Restaurant'>Restaurant</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Matt's Personal">Matt's Personal</option>

                        </select>
                    <input 
                        type='submit'/>
                </form>
            </div> 
        )
    }
}

export default Add;