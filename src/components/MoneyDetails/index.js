// Write your code here
import './index.css'

const MoneyDetails =(props)=> {
    const {bala, inco, exp} = props
    return (
      <div className="details-cont">
        <div className="bor-con bal-con">
          <div>
            <img
              className="img"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
            />
          </div>
          <div className="price-cont">
            <p className="side-name">Your Balance</p>
            <p className="amount-in-rs" data-testid="balanceAmount">
              Rs {bala}
            </p>
          </div>
        </div>
        <div className="bor-con income-con">
          <img
            className="img"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
          />
          <div className="price-cont">
            <p className="side-name">Your Income</p>
            <p className="amount-in-rs" data-testid="incomeAmount">
              Rs {inco}
            </p>
          </div>
        </div>
        <div className="bor-con expen-con">
          <img
            className="img"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
          />
          <div className="price-cont">
            <p className="side-name">Your Expenses</p>
            <p className="amount-in-rs" data-testid="expensesAmount">
              Rs {exp}
            </p>
          </div>
        </div>
      </div>
    )
}

export default MoneyDetails