import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { WhatsApp, Email, Arrow, Cancel } from "../components/icons";
import Loading from "../components/loading";
import { RouteContext } from "../contexts/routeContext";

const GET_USER_INFO = gql`
  query($id: ID!) {
    getUserById(id: $id) {
      email
      phone
    }
  }
`;

const Contact = () => {
  const { pushRoute } = useContext(RouteContext);
  const [id, setId] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("user"))
  })

  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id }
  });

  if (loading) return  <div className="product-loading"><Loading /></div>;
  if (error) return `Error ${error}`;

  const handleCancel = e => {
    e.preventDefault();
    pushRoute("home");
  }

  return(
    <div className="modal__background"> 
      <div className="modal modal__center modal__contact">
        <div className="contact-head">
          <h2>Contact Seller</h2>
          <Cancel onCancel={handleCancel}/>
        </div>

        <div className="contact-item">
          <div className="contact-item-left" style={{display: "flex"}}>
            <WhatsApp />
            <div className="contact-item-text">
              <a href={`https://wa.me/${data.getUserById.phone}`} target="_blank" rel="noreferrer">Message on WhatsApp</a>
              <p>Contact the seller via WhatsApp</p>
            </div>
          </div>
          <Arrow />
        </div>

        <div className="contact-item">
          <div className="contact-item-left" style={{display: "flex"}}>
            <Email />
            <div className="contact-item-text">
              <a href={`mailto:${data.getUserById.email}`}>Send an Email</a>
              <p>Contact the seller via email</p>
            </div>
          </div>
          <Arrow />
        </div>
      </div>
    </div>
  )
}

export default Contact;