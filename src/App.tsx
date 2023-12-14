import axios from "axios";
import { useRef, useState } from "react";
import { youtubeParser } from "./utils";
import logoimg from "./images/arrowimg.webp";

export default function App() {
  const inputUrlRef = useRef<HTMLInputElement>(null);
  const [urlResult, setUrlResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const youtubeID = youtubeParser(inputUrlRef.current?.value || "");

    const options = {
      method: "get",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
    };

    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));

    if (inputUrlRef.current) {
      inputUrlRef.current.value = "";
    }
  };

  return (
    <div className="app">
      <span className="logo">
        <img className="arrow" src={logoimg} alt="logo" width="32px" />
        YTtoMP3
      </span>

      <section className="content">
        <h1 className="content_title">YouTube to MP3 Converter</h1>
        <p className="content_description">
          Transform Your favourite YouTube videos into MP3s in just few clicks!
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            className="form_input"
            placeholder="Paste a YouTube video URL link here..."
            type="text"
          />
          <button type="submit" className="form_button">
            Search
          </button>
        </form>

        {urlResult ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={urlResult}
            className="download_btn"
          >
            Download MP3
          </a>
        ) : (
          ""
        )}
      </section>

      <footer>
        <p>©2023 | Created by</p>
        <a href="https://github.com/karolhas" target="_blank">
          HSKdev
        </a>
      </footer>
    </div>
  );
}
