import { useEffect, useState } from "react";

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isTouchDevice: boolean =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isMobileUserAgent: boolean =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      const isMobileWindowSize: boolean = window.innerWidth <= 768;

      setIsMobile(isTouchDevice || isMobileUserAgent || isMobileWindowSize);
    };

    checkIfMobile();

    // Add resize listener to re-check on screen size changes
    window.addEventListener("resize", checkIfMobile);

    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return isMobile;
}

export default useIsMobile;
