// Write your code here
import {Component} from 'react'
import './index.css'

class TransactionItem extends Component {
  render() {
    const {transacDetails, dataTestId, deleteItem} = this.props
    const {id, title, amount, type} = transacDetails
    const onDelete = () => {
      deleteItem(id)
    }
    return (
      <li className="li-cont">
        <p className="text">{title}</p>
        <p className="text">Rs {amount}</p>
        <p className="text">{type}</p>
        <button className="dele-button" onClick={onDelete}>
          <img
            data-testid={dataTestId}
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="header-dele img-dele"
          />
        </button>
      </li>
    )
  }
}
export default TransactionItem