import React, { useState } from "react";
import { Circles } from "react-loader-spinner";

function Spinner() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Circles
      />
      ;
    </div>
  );
}

export default Spinner;
