import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'
import NavBar from '../NavBar'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

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
const  MoneyManager =()=> {
  
  
  const navigate=useNavigate()

  const [inpTitle, setInpTitle]= useState('')
  const [inpAmount, setInpAmount]= useState('')
  const [optionId, setOptId]= useState(transactionTypeOptions[0].optionId)
  const [historyList, sethistlist]= useState([])
  const [name, setName]= useState('')

  useEffect(()=>{
    
    const cookieStore= Cookies.get('jwtToken')
    const nameLocal= localStorage.getItem('name')
    console.log(nameLocal)
    setName(nameLocal)
    if (cookieStore === undefined){
      navigate('/login')
    }
    const getEffect=()=>{
      const localHistStr= localStorage.getItem('hisList')
      const localHist= JSON.parse(localHistStr)
      if (localHist === null){
        sethistlist([])
      }else{
      sethistlist(localHist)}
    }
    getEffect()
  }, [navigate])
  
  const selectedOption = event => {
    setOptId(event.target.value)
  }

  const onAmount = event => {
    setInpAmount(event.target.value)
  }

  const onTitle = event => {
    setInpTitle(event.target.value)
  }

  const addToTransactions = event => {
    event.preventDefault()
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
    sethistlist(prevSate => ([...prevSate, newHistory]))
    setInpTitle('')
    setInpAmount('')
    setOptId(transactionTypeOptions[0].optionId)
    setlocalstorage()

  }

  const setlocalstorage = () => {
    localStorage.setItem('historyItems', historyList)
  }

  const deleteItem = id => {
    const filteredList= historyList.filter(each => each.id !== id)
    sethistlist(filteredList)
  }

  const getExpenses = () => {
    let expensesAmount = 0
    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  const getIncome = () => {
    let incomeAmount = 0
    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  const getBalance = () => {
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

  const onSave=()=>{
    localStorage.setItem('hisList', JSON.stringify(historyList))
  }

    const balanceAmount = getBalance()
    const incomeAmount = getIncome()
    const expensesAmount = getExpenses()
    return (
      <div className="bg-container">
        <NavBar />
        <div className="subcont">
          <div className="head-cont">
            <h1 className="name">Hi, {name}</h1>
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
              <form onSubmit={addToTransactions}>
                <div className="cont">
                  <label htmlFor="title" className="label">
                    TITLE
                  </label>
                  <input
                    className="inp"
                    id="title"
                    type="text"
                    placeholder="TITLE"
                    onChange={onTitle}
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
                    onChange={onAmount}
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
                    onChange={selectedOption}
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
            <div className="hst-con inp-details-cont">
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
                    deleteItem={deleteItem}
                    key={eachhis.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button className='button' onClick={onSave} type='button'>Save</button>
      </div>
    )
  
}

export default MoneyManager