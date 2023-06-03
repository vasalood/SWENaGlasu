import bg from "./bn.PNG";
export default function Card({
  flip,
  cardNumber,
  cardHolder,
  expDate,
  cvv,
  type,
  focus
}) {
  const cardBg = { backgroundImage: `url(${bg})`, backgroundSize: "cover" };
  const cN = [];
  for (let index = 0; index < 16; index++) {
    if (index === 0 || index % 4 === 0) {
      var toAdd = cardNumber.toString().substring(index, index + 4);
      cN.push(toAdd);
    }
  }
  const hashtags = [];
  var prov = cardNumber + "################";
  prov = prov.substring(0, 16);
  for (let index = 0; index < 16; index++) {
    if (index === 0 || index % 4 === 0) {
      toAdd = prov.toString().substring(index, index + 4);
      hashtags.push(toAdd);
    }
  }
  // console.log(cN);
  return (
    <div id="wrapper">
      <div style={cardBg} className="cardr"></div>
      <div className="containerr">
        {flip ? (
          <div id="back">
            <div id="band"></div>
            <div id="cvv">
              <span className={focus === "cvv" ? "focused" : ""}></span>
              <span>{cvv}</span>
            </div>
          </div>
        ) : (
          <div id="front">
            <div id="silver"></div>
            <div id="type">{type}</div>
            <div
              className={focus === "number" ? "focused" : ""}
              id="cardNumber"
            >
              {cardNumber.length === 16
                ? cN.map((e, k) => {
                    return (
                      <span key={k} className="numbers">
                        {k === 0 || k === 3 ? e : "****"}
                      </span>
                    );
                  })
                : hashtags.map((e, k) => {
                    return (
                      <span key={k} className="numbers">
                        {e}
                      </span>
                    );
                  })}
            </div>
            <div className={focus === "name" ? "focused" : ""} id="cardHolder">
              <span></span>
              <span>
                {cardHolder.length > 4 || focus === "name"
                  ? cardHolder
                  : "----"}
              </span>
            </div>
            <div
              className={focus === "year" || focus === "month" ? "focused" : ""}
              id="expires"
            >
              <span>Expires</span>
              <span>
                {expDate.month.length === 1 ? "0" : ""}
                {expDate.month}/{expDate.year}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
