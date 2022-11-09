import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { languageSetter } from "../../redux/slice/typingSlice";

export default function Header() {
  const [language, setLanguage] = useState("tr");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(languageSetter(language));
  }, [language]);
  return (
    <div>
      <select onChange={(e) => setLanguage(e.currentTarget.value)}>
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
