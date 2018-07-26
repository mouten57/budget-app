import React, { Component} from 'react';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            amount: '',
            category:'',
            expense: ''
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
        console.log(this.state.category)
    }

    handleChangeExpense=(e)=> {
        let value = e.target.value;
        this.setState({
            expense: value
        })
    
        console.log(this.state.expense)
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
        
        // ie: 2013-02-18, 8:35 AM	
        time = mm + '/' + dd + " " + h + ':' + min + ' ' + ampm;
        return time;
      }

    add = (newItem) => {
        this.props.onAdd(this.state.description, this.state.amount);
        var submitData = {
            amount: this.state.amount,
            description: this.state.description,
            category: this.state.category,
            time: this.convertTimestamp(Date.now()),
        };
        var newItemKey = this.itemRef.push().key;
        var updates = {};
        updates['/items/' + newItemKey] = submitData;
        if (submitData.amount.length === 0 ||submitData.description.length === 0) {
            alert('One or more missing fields.')
        }
        else if (isNaN(submitData.amount)) {
            alert('Cost should be a number.')
        }
        else if (!isNaN(submitData.description)) {
            alert('Description should be text.')
        } 
        else {
            this.setState({ description: '', amount: ''});
            return this.props.firebase.database().ref().update(updates);
        }
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={(e) => { e.preventDefault(); this.add()}}>
                    <select name='expense'
                        onChange={this.handleChangeExpense}>
                        <option value='choose'>Income/Expense</option>
                        <option value='income'>Income</option>
                        <option value='expense'>Expense</option>
                    </select>
                    <input type='text' 
                        placeholder='Amount'
                        value={this.state.amount}
                        onChange={this.handleChangeAmt} />
                    <input type='text' 
                        placeholder='Description' 
                        value={this.state.description}
                        onChange={this.handleChangeDesc}
                        />
                        <select name="categories"
                                onChange={this.handleChangeCat}>
                            <option value="choose">Categories..</option>
                            <option value="Gas">Gas</option>
                            <option value="Groceries">Groceries</option>
                            <option value='Restaurant'>Restaurant</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                    <input type='submit'/>
                </form>
            </div> 
        )
    }
}

export default Add;