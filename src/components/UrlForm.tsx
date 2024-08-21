import React, { useRef } from "react";

interface UrlFormProps {
  onSubmit: (youtubeUrl: string) => void;
}

export const UrlForm: React.FC<UrlFormProps> = ({ onSubmit }) => {
  const inputUrlRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const youtubeUrl = inputUrlRef.current?.value || "";
    onSubmit(youtubeUrl);
    if (inputUrlRef.current) {
      inputUrlRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        ref={inputUrlRef}
        className="form_input"
        placeholder="Paste a YouTube video URL link here..."
        type="text"
      />
      <button type="submit" className="form_button">
        Convert
      </button>
    </form>
  );
};
