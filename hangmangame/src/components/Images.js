import React from "react";

function Images({ wrong, images }) {
  return <img src={images[wrong]} alt={`State ${wrong}`} />;
}

export default Images;
