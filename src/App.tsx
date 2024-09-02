import { useState } from "react";
import { youtubeParser } from "./utils";
import { fetchMp3Link } from "./services/youtubeService";
import { UrlForm } from "./components/UrlForm";
import { ErrorMessage } from "./components/ErrorMessage";
import { DownloadLink } from "./components/DownloadLink";
import { ErrorResponse } from "./types/ErrorResponse";
import logoimg from "./images/arrowimg.webp";

export default function App() {
  const [urlResult, setUrlResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (youtubeUrl: string) => {
    setError(null);
    setUrlResult(null);

    const youtubeID = youtubeParser(youtubeUrl);

    if (!youtubeID) {
      setError("Invalid YouTube URL. Please enter a valid URL.");
      return;
    }

    try {
      const link = await fetchMp3Link(youtubeID);
      setUrlResult(link);
    } catch (err: unknown) {
      const errorResponse = err as ErrorResponse;
      setError(errorResponse.message);
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
          Transform Your favourite YouTube videos into MP3s in just a few
          clicks!
        </p>

        <UrlForm onSubmit={handleUrlSubmit} />

        <ErrorMessage message={error} />

        <DownloadLink url={urlResult} />
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
