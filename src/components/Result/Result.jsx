import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/slice/typingSlice";
export default function Result() {
  const correctWord = useSelector((state) => state.correctWords);
  const wrongWords = useSelector((state) => state.wrongWords);
  const pressed = useSelector((state) => state.keyPressed);
  const timer = useSelector((state) => state.timer);
  const dispatch = useDispatch();
  return (
    <div className="result" hidden={timer !== 0}>
      <div className="dks">
        <h1 style={{ textAlign: "center" }}>
          {Math.round(correctWord / 5 / 1)} DKS
        </h1>
        <p style={{ textAlign: "center" }}>(kelime yazabiliyorum)</p>
      </div>
      <div
        style={{
          display: "flex",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          border: "1px solid",
        }}
      >
        <h3>Tuş Vuruşu</h3>
        <p style={{ marginLeft: "auto", fontWeight: "800" }}>{pressed}</p>
      </div>
      <div className="words" style={{ backgroundColor: "#fff" }}>
        <h3>Doğru Kelime</h3>
        <p>{correctWord}</p>
      </div>
      <div className="words" style={{ backgroundColor: "#f9f9f9" }}>
        <h3>Yanlış Kelime</h3>
        <p>{wrongWords}</p>
      </div>
      <div
        className="words"
        style={{ backgroundColor: "#fff", justifyContent: "center" }}
      >
        <button
          style={{
            padding: "10px",
          }}
          onClick={() => dispatch(reset())}
        >
          Tekrar dene
        </button>
      </div>
    </div>
  );
}
