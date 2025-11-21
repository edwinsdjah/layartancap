export const initDeviceDetection = (setIsSP) => {
  if (typeof window === "undefined") return;

  const checkDevice = () => {
    const isMobileUA =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      );

    const isMobileWidth = window.innerWidth < 768;
    setIsSP(isMobileUA || isMobileWidth);
  };

  checkDevice();
  window.addEventListener("resize", checkDevice);
  return () => window.removeEventListener("resize", checkDevice);
};
