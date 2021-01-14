import React from "react";
import i18n from "i18next";

const LanguageSelect = () => {
  return (
    <div className="language-select" style={{ color: "gray" }}>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </span>{" "}
      |{" "}
      <span
        style={{ cursor: "pointer" }}
        onClick={() => i18n.changeLanguage("jp")}
      >
        JP
      </span>
    </div>
  );
};

export default LanguageSelect;
