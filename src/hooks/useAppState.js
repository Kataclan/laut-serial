import { useState } from "react";

export default () => {
  const [, setTag] = useState(null);


  return { initNFC, readNFC, tag };
};
