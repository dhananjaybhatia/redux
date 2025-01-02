import { createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// ✅ Account Slice
const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    // Synchronous Deposit
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
      // state.currency = state.currency + action.payload.currency;
    },

    // Withdrawal
    withdrawal(state, action) {
      state.balance -= action.payload;
    },

    // Request Loan
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    // Pay Loan
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

// ✅ Export Actions
export const { withdrawal, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
  };
}

// ✅ Export Reducer
export default accountSlice.reducer;
