import { useRouter } from "next/router";
import { Failed, Success } from "./icons"

const MsgModal = props => {
  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    if (props.success) 
      document.querySelector(".modal__background").style.display = "none";
    else {
      document.querySelector(".modal__background").style.display = "none";
      router.push("/cart");
    }

  } 

  return(
    <div className="modal__background">
      <div className="modal modal__center modal__msg">
        { props.success ? <Success /> : <Failed /> }
        <h2>
          { props.success ? "Order Successful" : "Order Failed" }
        </h2>
        <p>
          { props.success ? "Your order will be delivered soon. Thank you for shopping with us!" : "Your order cannot be processed at the moment, kindly try again." }
        </p>
        <button className="msg-btn" onClick={handleClick}>{ props.success ? "Okay" : "Try Again" }</button>
      </div>
    </div>
  )
}

export default MsgModal;