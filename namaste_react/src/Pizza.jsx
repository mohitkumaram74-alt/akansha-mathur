import { useState } from "react";
export default function Pizza() {
  const [pizza, setpizza] = useState("");
  const [cheese, setcheese] = useState(false);
  const [corn, setcorn] = useState(false);
  const [price, setprice] = useState(0);
  const Totalbill = () => {
    let total = 0;
    // setprice(total);

    if (pizza === "small") {
      total = 200;
    } else if (pizza === "medium") {
      total = 300;
    } else if (pizza === "large") {
      total = 450;
    }
    if (cheese) {
      total += 100;
    }
    if (corn) {
      total += 50;
    }
    setprice(total);
  };
  return (
    <div>
      <h1>
        <i>Pizza Palace</i>
      </h1>
      <select
        name=""
        value={pizza}
        onChange={(event) => setpizza(event.target.value)}
      >
        <option value="">---Choose your pizza Size---</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <br />

      <br />
      <label htmlFor="">
        Extra Cheese
        <input type="checkbox" onClick={(e) => setcheese(e.target.value)} />
      </label>
      <br />
      <br />
      <label htmlFor="">
        Extra Corn
        <input type="checkbox" onClick={(e) => setcorn(e.target.value)} />
      </label>
      <br />
      <br />
      <button onClick={Totalbill}>Place Order </button>
      <h1>Total Bill:{price}</h1>
    </div>
  );
}
