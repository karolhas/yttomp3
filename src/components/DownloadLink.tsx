import React from "react";

interface DownloadLinkProps {
  url: string | null;
}

export const DownloadLink: React.FC<DownloadLinkProps> = ({ url }) => {
  if (!url) return null;

  return (
    <a target="_blank" rel="noreferrer" href={url} className="download_btn">
      Download MP3
    </a>
  );
};
