import { useContext } from "react";
import { TranslationContext } from "../components/services/translation/translationContext"
import { translation_dictionary } from "../components/services/translation/translation_dictionary.js"

const useTranslate = () => {

    const {language} = useContext(TranslationContext);

    return (key) => {
        const translation = translation_dictionary[language]
            ? translation_dictionary[language].find(t => t.key === key)?.value
            : translation_dictionary["en"].find(t => t.key === key)?.value;

        return translation || key;
    };
}

export default useTranslate;