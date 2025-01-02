import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdrawal, requestLoan, payLoan } from "./AccountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
  } = useSelector((state) => state.account);

  /** Handle Deposit */
  const handleDeposit = () => {
    if (!depositAmount || depositAmount <= 0 || isNaN(depositAmount)) {
      alert("Please enter a valid deposit amount.");
      setDepositAmount("");
      return;
    }
    dispatch(deposit(depositAmount, currency));
    setDepositAmount("");
    setCurrency("USD");
  };

  /** Handle Withdrawal */
  const handleWithdrawal = () => {
    if (!withdrawalAmount || withdrawalAmount <= 0 || isNaN(withdrawalAmount)) {
      alert("Please enter a valid withdrawal amount.");
      setWithdrawalAmount("");
      return;
    }

    if (withdrawalAmount > balance) {
      alert("Insufficient Funds.");
      setWithdrawalAmount("");
      return;
    }

    dispatch(withdrawal(withdrawalAmount));
    setWithdrawalAmount("");
  };

  /** Handle Request Loan */
  const handleRequestLoan = () => {
    if (!loanAmount || loanAmount <= 0 || isNaN(loanAmount)) {
      alert("Please enter a valid loan amount.");
      return;
    }

    if (!loanPurpose.trim()) {
      alert("Please specify the reason for requesting a loan.");
      return;
    }

    if (currentLoan > 0) {
      alert(
        "You already have an outstanding loan. Please repay it before requesting a new loan."
      );
      setLoanAmount("");
      setLoanPurpose("");
      return;
    }

    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  };

  /** Handle Pay Loan */
  const handlePayLoan = () => {
    if (!currentLoan) {
      alert("You do not have any outstanding loan amount.");
      return;
    }
    dispatch(payLoan());
  };

  return (
    <div>
      <h2>Your Account Operations</h2>
      <div className="inputs">
        {/* Deposit Section */}
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
            placeholder="Deposit amount"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>
          <button onClick={handleDeposit}>
            Deposit {depositAmount} {currency}
          </button>
        </div>

        {/* Withdrawal Section */}
        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
            placeholder="Withdrawal amount"
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        {/* Request Loan Section */}
        <div>
          <label>Request Loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request Loan</button>
        </div>

        {/* Pay Loan Section */}
        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ${currentLoan} ({currentLoanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay Loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
