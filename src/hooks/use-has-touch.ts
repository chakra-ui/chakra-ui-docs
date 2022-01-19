import { useEffect, useState } from "react";

const useHasTouch = () => {
  const [hasTouch, setHasTouch] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (window) {
      setHasTouch('ontouchstart' in window)
    }
  }, [])

  return hasTouch;
};

export default useHasTouch;