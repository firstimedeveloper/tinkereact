'use strict';

const e = React.createElement;

const LikeButton = (prop) => {
  const [liked, setLiked] = React.useState(false)

  const handleClick = () => liked ? setLiked(false) : setLiked(true)

  const fragment = e(React.Fragment, null, 
    e('div', {className: 'message'},'You liked this, ' + prop.name),
    e('button', {onClick: handleClick}, 'unlike')
  )

  return (
    liked ? fragment :
    e('button', {onClick: handleClick}, 'Like')
  )

}

const fetchDataApi = (prop) => {
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [url, setUrl] = React.useState('')


  React.useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try{
        const result = await axios(url)
        const data = xmlToJSON.parseString(result.data);
        console.log(data)
        setData(data)
      } catch {
        setIsError(true)
      }
      setIsLoading(false)
    }

    if (url !== '') {
      fetchData()
    }
  }, [url])

  return {data, isLoading, isError, url, setUrl}
}

const Search = (prop) => {
  const [id, setId] = React.useState('')
  const [lang, setLang] = React.useState('')
  const [tlang, setTlang] = React.useState('')

  const handleChange = (event) => setId(event.target.value)

  const handleLangChange = (event) => setLang(event.target.value)

  const handleTlangChange = (event) => setTlang(event.target.value)

  const handleSubmit = (event) => {
    //TODO: fetch api
    if (!lang) {
      makeUrl('list')
    } else {
      makeUrl('transcript')
    }
    event.preventDefault();
  }

  const makeUrl = (action) => {
    if (id === '') {
      prop.setUrl('')
      return
    }
    if (action === 'list') {
      prop.setUrl('http://video.google.com/timedtext?v=' + id + '&type=' + action)
    }
    if (action === "transcript") {
      prop.setUrl('http://video.google.com/timedtext?v=' + id + '&lang=' + lang)
    }
  }

  const searchForm = e('form', {onSubmit: handleSubmit}, 
    e('label', null, 'Video ID'),
    e('input', {onChange: handleChange}),
    e('label', null, 'Subtitle language'),
    e('select', {onChange: handleLangChange}, 
      e('option', null, 'none'),
      e('option', null, 'en'),
      e('option', null, 'de')),
      e("select", {
        name: "tlang",
        id: "tlang",
        onChange: handleTlangChange,
        "data-placeholder": "Choose a Language..."
      }, languageListSelect),
    e('button', {type: 'submit'}, 'Search')
  )    

  return (
    searchForm
  )
}

const App = (prop) => {

  const {data, isLoading, isError, url, setUrl} = fetchDataApi()
  
  // const button = e(LikeButton, {name: prop.name})

  const transcriptView = data && data.transcript && (
    e("table", null, 
      e("tbody", null, 
        data.transcript[0].text.map(line => 
          e("tr", {key: line._attr.start._value}, 
            e("td", {className: "time_subtitle"}, line._attr.start._value, "-", line._attr.dur._value), 
            e("td", null, line._text)
          )
        )
      )
    )
  )
  
  

  const fragment = e(React.Fragment, null,
    e('div', {className: 'search'}, e(Search, {setUrl})),
    isLoading ? e("div", null, "Loading...") : e('div', null, transcriptView),
  )

  return (
    // e('div', {className:'like-button'}, button)
    fragment
  )
}



const languageListSelect =
e(React.Fragment, null , e("option", {
    value: ""
  }, "None"), e("option", {
    value: "AF"
  }, "Afrikaans"), e("option", {
    value: "SQ"
  }, "Albanian"), e("option", {
    value: "AR"
  }, "Arabic"), e("option", {
    value: "HY"
  }, "Armenian"), e("option", {
    value: "EU"
  }, "Basque"), e("option", {
    value: "BN"
  }, "Bengali"), e("option", {
    value: "BG"
  }, "Bulgarian"), e("option", {
    value: "CA"
  }, "Catalan"), e("option", {
    value: "KM"
  }, "Cambodian"), e("option", {
    value: "ZH"
  }, "Chinese (Mandarin"), e("option", {
    value: "HR"
  }, "Croatian"), e("option", {
    value: "CS"
  }, "Czech"), e("option", {
    value: "DA"
  }, "Danish"), e("option", {
    value: "NL"
  }, "Dutch"), e("option", {
    value: "EN"
  }, "English"), e("option", {
    value: "ET"
  }, "Estonian"), e("option", {
    value: "FJ"
  }, "Fiji"), e("option", {
    value: "FI"
  }, "Finnish"), e("option", {
    value: "FR"
  }, "French"), e("option", {
    value: "KA"
  }, "Georgian"), e("option", {
    value: "DE"
  }, "German"), e("option", {
    value: "EL"
  }, "Greek"), e("option", {
    value: "GU"
  }, "Gujarati"), e("option", {
    value: "HE"
  }, "Hebrew"), e("option", {
    value: "HI"
  }, "Hindi"), e("option", {
    value: "HU"
  }, "Hungarian"), e("option", {
    value: "IS"
  }, "Icelandic"), e("option", {
    value: "ID"
  }, "Indonesian"), e("option", {
    value: "GA"
  }, "Irish"), e("option", {
    value: "IT"
  }, "Italian"), e("option", {
    value: "JA"
  }, "Japanese"), e("option", {
    value: "JW"
  }, "Javanese"), e("option", {
    value: "KO"
  }, "Korean"), e("option", {
    value: "LA"
  }, "Latin"), e("option", {
    value: "LV"
  }, "Latvian"), e("option", {
    value: "LT"
  }, "Lithuanian"), e("option", {
    value: "MK"
  }, "Macedonian"), e("option", {
    value: "MS"
  }, "Malay"), e("option", {
    value: "ML"
  }, "Malayalam"), e("option", {
    value: "MT"
  }, "Maltese"), e("option", {
    value: "MI"
  }, "Maori"), e("option", {
    value: "MR"
  }, "Marathi"), e("option", {
    value: "MN"
  }, "Mongolian"), e("option", {
    value: "NE"
  }, "Nepali"), e("option", {
    value: "NO"
  }, "Norwegian"), e("option", {
    value: "FA"
  }, "Persian"), e("option", {
    value: "PL"
  }, "Polish"), e("option", {
    value: "PT"
  }, "Portuguese"), e("option", {
    value: "PA"
  }, "Punjabi"), e("option", {
    value: "QU"
  }, "Quechua"), e("option", {
    value: "RO"
  }, "Romanian"), e("option", {
    value: "RU"
  }, "Russian"), e("option", {
    value: "SM"
  }, "Samoan"), e("option", {
    value: "SR"
  }, "Serbian"), e("option", {
    value: "SK"
  }, "Slovak"), e("option", {
    value: "SL"
  }, "Slovenian"), e("option", {
    value: "ES"
  }, "Spanish"), e("option", {
    value: "SW"
  }, "Swahili"), e("option", {
    value: "SV"
  }, "Swedish "), e("option", {
    value: "TA"
  }, "Tamil"), e("option", {
    value: "TT"
  }, "Tatar"), e("option", {
    value: "TE"
  }, "Telugu"), e("option", {
    value: "TH"
  }, "Thai"), e("option", {
    value: "BO"
  }, "Tibetan"), e("option", {
    value: "TO"
  }, "Tonga"), e("option", {
    value: "TR"
  }, "Turkish"), e("option", {
    value: "UK"
  }, "Ukrainian"), e("option", {
    value: "UR"
  }, "Urdu"), e("option", {
    value: "UZ"
  }, "Uzbek"), e("option", {
    value: "VI"
  }, "Vietnamese"), e("option", {
    value: "CY"
  }, "Welsh"), e("option", {
    value: "XH"
  }, "Xhosa")
)

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App, {name: 'Jun'}), domContainer);

// transcript[0].text[0]._text 
// [0]._attr
// [0]._attr.dur._value
// [0]._text