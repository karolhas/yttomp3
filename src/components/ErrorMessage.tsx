import React from "react";

interface ErrorMessageProps {
  message: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return <p className="error_message">{message}</p>;
};
