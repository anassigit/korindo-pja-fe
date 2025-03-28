import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

//import translationGr from "./locales/gr/translation.json"
// import translationIT from "./locales/it/translation.json"
// import translationRS from "./locales/rs/translation.json"
import translationKr from "./locales/kor/translation.json"
import translationEn from "./locales/eng/translation.json"
import translationId from "./locales/idr/translation.json"

// the translations
const resources = {
  kor: {
    translation: translationKr,
  },
  eng: {
    translation: translationEn,
  },
  idr: {
    translation: translationId,
  },
}

const language = localStorage.getItem("I18N_LANGUAGE")
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "kor")
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "kor",
    fallbackLng: "kor", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
