import { useState, useEffect } from "react";
import { Add, Remove } from "./icons";

const Counter = props => {
  const [count, setCount] = useState(0);
  const [qtyLeft, setQtyLeft] = useState(0);
  const [totalQty, setTotalQty] = useState(null);

  useEffect(() => {
    if (props.onCount) props.onCount(count);
    if (props.qty) setCount(props.qty);
    if (props.initialCount) setCount(props.initialCount);
    if (props.qtyLeft) setQtyLeft(props.qtyLeft);
    if (props.totalQty) setTotalQty(props.totalQty);
  }, [props, count])

  const handleClick = (e, type) => {
    e.preventDefault();
    if (type === "remove" && count > 1) { 
      setCount(count - 1);
      if (props.onCounterClick) props.onCounterClick(type);
    }
    else if (type === "add" && qtyLeft > count) {
      setCount(count + 1)
      if (props.onCounterClick) props.onCounterClick(type);
    }
    else if (type === "add" && totalQty === null) {
      setCount(count + 1)
      if (props.onCounterClick) props.onCounterClick(type);
    }
  }

  return(
    <div className="counter">
      <button className="counter__btn" onClick={e => handleClick(e, "remove")}>
        <Remove />
      </button>
      <div className="counter__screen">{props.initialCount || count}</div>
      <button className="counter__btn" onClick={e => handleClick(e, "add")}>
        <Add />
      </button>
    </div>
  )
}

export default Counter;