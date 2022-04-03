import { Suspense, useState } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next, Trans } from "react-i18next";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
// import "./App.css";

//lodergrapghl
const categoriesQueries = loader("../graphql/queries/categories.gql");

const translationsEn = {
    welcome: "Welcome!",
    "sample-text": "Sample <bold><italic>text</italic></bold>.",
    changed: "You have changed the language {{count}} time",
    changed_plural: "You have changed the language {{count}} times",
  };
  
  const translationsFr = {
    welcome: "Bienvenue!",
    "sample-text": "Exemple de <bold><italic>texte</italic></bold>.",
    changed: "Vous avez changé la langue {{count}} fois",
  };
  
//   i18n
//     .use(initReactI18next) // passes i18n down to react-i18next
//     .init({
//       resources: {
//         en: { translation: translationsEn },
//         fr: { translation: translationsFr },
//       },
//       lng: "en",
//       fallbackLng: "en",
//       interpolation: { escapeValue: false },
//     });

const Language = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [category, setcategory] = useState();
  

//   console.log(data.categories);
  const { loading, error, data } = useQuery(categoriesQueries)
  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

//   i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources: {
//       en: { translation: data.categories.nodes.map((categories)=>categories.categorynameTh) },
//       fr: { translation: data.categories.nodes.map((categories)=>categories.categorynameEn) },
//     },
//     lng: "en",
//     fallbackLng: "en",
//     interpolation: { escapeValue: false },
//   });

  const onChange = (event) => {
    // i18n.changeLanguage(event.target.value);
    setcategory(event.target.value); 
    console.log(event.target.value)
    // setCount((previousCount) => previousCount + 1);
  };

  return (
    <Suspense fallback={"Loading..."}>
      <div className="App">
        <header className="App-header">
          {/* <h1>{category}</h1> */}
          {/* <p>
            <Trans components={{ bold: <strong />, italic: <i /> }}>
              sample-text
            </Trans>
          </p>
          <p>{t("changed", { count })}</p> */}
          <select name="language" defaultValue={
                                  data.categories.nodes.map((categories)=>categories.categorynameTh)
                                }
                                 onChange={onChange}>
            <option value={data.categories.nodes.map((categories)=>categories.categorynameTh)}>English</option>
            <option value={data.categories.nodes.map((categories)=>categories.categorynameEn)}>French</option>
          </select>
          <h1
          defaultValue={
            data.categories.nodes.map((categories)=>categories.categorynameTh)
          }
          value={
            data.categories.nodes.map((categories)=>categories.categorynameTh)
          }
          >{category}</h1>
        </header>
      </div>
    </Suspense>
  );
};

export default Language;
