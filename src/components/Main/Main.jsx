import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshWords,
  statusHandler,
  updateCorrect,
  updatekey,
  updateWrong,
  timerTicker,
} from "../../redux/slice/typingSlice";

export default function Main() {
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(0);
  const [starter, setStarter] = useState(false);
  const list = useSelector((state) => state.words);
  const lang = useSelector((state) => state.lang);
  const timer = useSelector((state) => state.timer);
  const keyPressed = useSelector((state) => state.keyPressed);
  const dispatch = useDispatch();

  useEffect(() => {
    if (starter) setTimeout(() => dispatch(timerTicker()), 1000);
    if (timer === 1) {
      setStarter(false);
      setIndex(0);
    }
  }, [starter, timer, dispatch]);

  const keyHandler = (e) => {
    dispatch(updatekey());
    setInput(e.target.value);
    dispatch(statusHandler({ id: list[index].id, status: "next" }));
    if (e.target.value.includes(" ")) {
      setInput("");
      let liste =
        lang === "en"
          ? list[index].en.toLowerCase()
          : list[index].tr.toLowerCase();
      if (liste.includes(input) && liste.length === input.length) {
        dispatch(updateCorrect());
        dispatch(
          statusHandler({ id: list[index].id, word: input, status: "correct" })
        );
      } else if (!liste.includes(input) || liste.length != input.length) {
        dispatch(updateWrong());
        dispatch(
          statusHandler({
            id: list[index].id,
            word: input,
            status: "wrong",
          })
        );
      }
      if (starter == false) setStarter(true);
      if (list.length - 1 === index) {
        dispatch(refreshWords());
        setIndex(0);
      } else setIndex(index + 1);
    } else {
      setInput(e.target.value);
    }
    if (keyPressed === 0) {
      setStarter(true);
    }
  };
  return (
    <div className="list">
      <div>
        {list.map((item) => {
          return (
            <span key={item.id} className={`listItem ${item.status}`}>
              {lang == "tr" ? item.tr.toLowerCase() : item.en.toLowerCase()}
            </span>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          className="inputHandler"
          value={input}
          onChange={(e) => {
            keyHandler(e);
          }}
          disabled={timer < 1}
        />
        <p style={{ margin: "15px" }}>
          {(timer == 0 && lang == "tr" && "Süre bitti") ||
            (timer == 0 && lang == "en" && "Time's up!") ||
            timer}
        </p>
      </div>
    </div>
  );
}
