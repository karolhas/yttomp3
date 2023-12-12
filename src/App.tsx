import axios from "axios";
import { useRef, useState } from "react";
import { youtubeParser } from "./utils";

export default function App() {
  const inputUrlRef = useRef<HTMLInputElement | null>(null);
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const youtubeID = youtubeParser(inputUrlRef.current?.value || "");
    // console.log(youtubeID);

    const options = {
      method: "GET",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_KEY,
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
      <span className="logo">YTtoMP3</span>

      <section className="content">
        <h1 className="content_title">YouTube to MP3 Converter</h1>
        <p className="content_description">
          Transform YouTube videos into MP3s in just few clicks!
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
    </div>
  );
}
