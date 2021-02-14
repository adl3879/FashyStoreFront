const Spinner = (props) => {
  return(
    <div className="loading__container">
      <div className="loadingio-spinner-spinner-8ag9o7n4cdj">
        <div className="ldio-abj0ipsrbmt">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { opacity: 1 }
          to { opacity: 0 }
        }

        .loading__container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          background-color: #6385F3;
          border-radius: 5px;
          display: ${props.loading ? "flex" : "none"};
          justify-content: center;
          align-items: center;
        }

        .ldio-abj0ipsrbmt div {
          left: 94px;
          top: 48px;
          position: absolute;
          animation: spin linear 1s infinite;
          background: #f5f0f1;
          width: 12px;
          height: 24px;
          border-radius: 3.36px / 3.36px;
          transform-origin: 6px 52px;
        }.ldio-abj0ipsrbmt div:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -0.9166666666666666s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(2) {
          transform: rotate(30deg);
          animation-delay: -0.8333333333333334s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(3) {
          transform: rotate(60deg);
          animation-delay: -0.75s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(4) {
          transform: rotate(90deg);
          animation-delay: -0.6666666666666666s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(5) {
          transform: rotate(120deg);
          animation-delay: -0.5833333333333334s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(6) {
          transform: rotate(150deg);
          animation-delay: -0.5s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(7) {
          transform: rotate(180deg);
          animation-delay: -0.4166666666666667s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(8) {
          transform: rotate(210deg);
          animation-delay: -0.3333333333333333s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(9) {
          transform: rotate(240deg);
          animation-delay: -0.25s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(10) {
          transform: rotate(270deg);
          animation-delay: -0.16666666666666666s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(11) {
          transform: rotate(300deg);
          animation-delay: -0.08333333333333333s;
          background: #f5f0f1;
        }.ldio-abj0ipsrbmt div:nth-child(12) {
          transform: rotate(330deg);
          animation-delay: 0s;
          background: #f5f0f1;
        }
        .loadingio-spinner-spinner-8ag9o7n4cdj {
          width: 200px;
          height: 200px;
          display: inline-block;
          overflow: hidden;
          background: transparent;
          transform: scale(0.3);
        }
        .ldio-abj0ipsrbmt {
          width: 100%;
          height: 100%;
          position: relative;
          transform: translateZ(0) scale(1);
          backface-visibility: hidden;
          transform-origin: 0 0; /* see note above */
        }
        .ldio-abj0ipsrbmt div { box-sizing: content-box; }
      `}</style>
    </div>
  )
}

export default Spinner;