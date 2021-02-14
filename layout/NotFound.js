import React from "react";

const NotFound = () => {
  return (
    <div className="not-found">
      <style jsx>{`
        .not-found div h1 {
          font-weight: 600;
          font-size: 2.5rem;
          text-align: center;
          color: #0000;
          margin-bottom: 1.8rem;
          margin-top: 4rem;
        }
        .not-found div p {
          font-weight: 500;
          font-size: 1.6rem;
          text-align: center;
          margin-bottom: 2rem;
        }
      `}</style>
      <div>
        <img src="/404.svg" alt="user" />

        <h1>Oops, store does not exist!</h1>

        <p>We can’t seem to find the store you are looking for.</p>
      </div>
    </div>
  );
};

export default NotFound;
