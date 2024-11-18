import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'
import NavBar from '../NavBar'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    inpTitle: '',
    inpAmount: '',
    optionId: transactionTypeOptions[0].optionId,
    historyList: [],
    balance: 0,
    incomeAmt: 0,
    expenseAmt: 0,
  }
  

  selectedOption = event => {
    this.setState({optionId: event.target.value})
  }

  onAmount = event => {
    this.setState({inpAmount: event.target.value})
  }

  onTitle = event => {
    this.setState({inpTitle: event.target.value})
  }

  addToTransactions = event => {
    event.preventDefault()
    const {inpTitle, inpAmount, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption

    const newHistory = {
      id: uuidv4(),
      title: inpTitle,
      amount: parseInt(inpAmount),
      type: displayText,
    }

    this.setState(
      prevState => ({
        historyList: [...prevState.historyList, newHistory],
        inpTitle: '',
        inpAmount: '',
        inpOption: transactionTypeOptions[0].optionId,
      }),
      this.setlocalstorage(),
    )

    const storage = localStorage.getItem('historyItems')
    console.log(storage)
  }

  setlocalstorage = () => {
    const {historyList} = this.state
    localStorage.setItem('historyItems', historyList)
  }

  deleteItem = id => {
    this.setState(prevState => ({
      historyList: prevState.historyList.filter(each => each.id !== id),
    }))
  }

  getExpenses = () => {
    const {historyList} = this.state
    let expensesAmount = 0
    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {historyList} = this.state
    let incomeAmount = 0
    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {historyList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {optionId, inpAmount, inpTitle, historyList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    return (
      <div className="bg-container">
        <NavBar />
        <div className="subcont">
          <div className="head-cont">
            <h1 className="name">Hi, Richard</h1>
            <p className="welcome-text">
              Welcome back to your <span className="mo-man">Money Manager</span>
            </p>
          </div>
          <div>
            <MoneyDetails
              bala={balanceAmount}
              inco={incomeAmount}
              exp={expensesAmount}
            />
          </div>

          <div className="bottom-cont">
            <div className="inp-details-cont">
              <h1 className="side-heading">Add Transaction</h1>
              <form onSubmit={this.addToTransactions}>
                <div className="cont">
                  <label htmlFor="title" className="label">
                    TITLE
                  </label>
                  <input
                    className="inp"
                    id="title"
                    type="text"
                    placeholder="TITLE"
                    onChange={this.onTitle}
                    value={inpTitle}
                  />
                </div>
                <div className="cont">
                  <label htmlFor="amount" className="label">
                    AMOUNT
                  </label>
                  <input
                    className="inp"
                    id="amount"
                    type="text"
                    placeholder="AMOUNT"
                    onChange={this.onAmount}
                    value={inpAmount}
                  />
                </div>
                <div className="cont">
                  <label htmlFor="type" className="label">
                    TYPE
                  </label>
                  <select
                    className="inp"
                    id="type"
                    type="text"
                    placeholder="AMOUNT"
                    onChange={this.selectedOption}
                    value={optionId}
                  >
                    {transactionTypeOptions.map(eachoption => (
                      <option
                        key={eachoption.optionId}
                        value={eachoption.optionId}
                      >
                        {eachoption.displayText}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="inp-details-cont hst-con">
              <ul>
                <li>
                  <h1 className="side-heading">History</h1>
                  <div className="li-cont">
                    <p className="header">Title</p>
                    <p className="header">Amount</p>
                    <p className="header">Type</p>
                    <p className="header-dele"></p>
                  </div>
                </li>
                {historyList.map(eachhis => (
                  <TransactionItem
                    transacDetails={eachhis}
                    dataTestId="delete"
                    deleteItem={this.deleteItem}
                    key={eachhis.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager