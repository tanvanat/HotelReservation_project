import React from "react";
import { Variant } from "../types/models";

interface Props {
  variant: Variant;
  onClick: () => void;
}

const BookNowButton: React.FC<Props> = ({ variant, onClick }) => {
  const label = variant === "A" ? "Book now" : "Book now – Best deal!";
  const className =
    variant === "A" ? "btn-primary" : "btn-primary btn-variant-b";

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default BookNowButton;
