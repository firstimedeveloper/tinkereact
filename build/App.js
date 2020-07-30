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
    console.log(url)
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try{
        const result = await axios(url)
        const data = xmlToJSON.parseString(result.data);
        console.log(data)
        console.log(data.transcript_list[0].track[0]._attr.lang_code)
        setData(data)
      } catch {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [url])

  return {data, isLoading, isError, url, setUrl}
}

const Search = (prop) => {
  const [id, setId] = React.useState('')
  const [lang, setLang] = React.useState('')
  const [tlang, setTlang] = React.useState('')

  const handleChange = (event) => setId(event.target.value)

  const handleLangChange = (event) => setLang(event.target.value)

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
    e('button', {type: 'submit'}, 'Search')
  )    

  return (
    searchForm
  )
}

const App = (prop) => {

  const {data, isLoading, isError, url, setUrl} = fetchDataApi()
  
  // const button = e(LikeButton, {name: prop.name})


  const fragment = e(React.Fragment, null,
    e('div', {className: 'search'}, e(Search, {setUrl})),
    url ? e('div', null, url) : '',
  )

  return (
    // e('div', {className:'like-button'}, button)
    fragment
  )
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App, {name: 'Jun'}), domContainer);

