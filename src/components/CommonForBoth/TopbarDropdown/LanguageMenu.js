import React from "react"
import { useTranslation } from "react-i18next"
import { supportedLanguages } from "../config/i18n"
import { languageCodeOnly } from "../services/i18n"

function LanguageMenu({ onChange }) {
    
    const { i18n } = useTranslation()

    return (
        <div className="select">
            <select
                value={languageCodeOnly(i18n.language)}
                onChange={(e) => onChange(e.target.value)}
            >
                {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

LanguageMenu.propTypes = {
    onChange: PropTypes.any
}

export default LanguageMenu