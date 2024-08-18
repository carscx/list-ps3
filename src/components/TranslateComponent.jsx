import { useEffect, useRef } from "react";

const TranslateComponent = () => {
  const googleTranslateRef = useRef(null);

  useEffect(() => {
    let intervalId = null;

    const translatePage = () => {
      const selectTranslateDropdown = document.querySelector(".goog-te-combo");
      if (selectTranslateDropdown) {
        selectTranslateDropdown.value = "es"; // Set language to Spanish
        selectTranslateDropdown.dispatchEvent(new Event("change")); // Trigger change event
      }
    };

    const checkGoogleTranslate = () => {
      if (
        window.google &&
        window.google.translate &&
        window.google.translate.TranslateElement.InlineLayout
      ) {
        clearInterval(intervalId);
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "es",
            includedLanguages: "en,es",
            layout:
              window.google.translate.TranslateElement.InlineLayout.VERTICAL
          },
          googleTranslateRef.current
        );
        translatePage(); // Invoke translation to Spanish
      }
    };

    intervalId = setInterval(checkGoogleTranslate, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div ref={googleTranslateRef}></div>
    </div>
  );
};

export default TranslateComponent;
