import React, { useRef, useState } from "react";
import "./generator.css";
import defaultImg from "../../assets/1710771848157.jpg";

const GeneratorImage = () => {
  const [genImg, setGenImg] = useState("/");
  const inputRef = useRef(null);
  const [Loading, setLoading] = useState(false);
  const apikey = process.env.REACT_APP_KEY;

  const imageGen = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${apikey}`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    setGenImg(data_array[0].url);
    setLoading(false);
  };

  return (
    <div className="main">
      <h1 className="title">AI image Generator</h1>
      <div className="box-image">
        <div className="imagebox">
          <div className="default">
            <img src={genImg === "/" ? defaultImg : genImg} alt="img default" />
          </div>
          <div className={Loading ? "loading-full" : "loading"}></div>
        </div>
        <div className="info">
          <input
            ref={inputRef}
            type="text"
            placeholder="descripe your best image ps:max - 5 word"
          />
          <br />
          <button onClick={() => imageGen()}>generate</button>
        </div>
      </div>
    </div>
  );
};

export default GeneratorImage;
