import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./CustomerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [tfn  , setTfn  ] = useState("");

  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !tfn) {
      return;
    }
    dispatch(createCustomer({fullName, tfn}));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>TFN Number</label>
          <input
            value={tfn}
            onChange={(e) => setTfn(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
