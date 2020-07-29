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

const Search = (prop) => {

  const handleChange = (event) => prop.setId(event.target.value)

  const handleSubmit = (event) => {
    //TODO: fetch api
    event.preventDefault();
  }

  const searchForm = e('form', {onSubmit: handleSubmit}, 
    e('label', null, 'Video ID'),
    e('input', {onChange: handleChange}),
    e('button', {type: 'submit'}, 'Search')
  )    

  return (
    searchForm
  )
}

const App = (prop) => {
  const [id, setId] = React.useState('')


  // const button = e(LikeButton, {name: prop.name})

  const fragment = e(React.Fragment, null,
    e('div', {className: 'search'}, e(Search, {setId})),
    id ? e('div', null, 'www.youtube.com/watch?v=', id) : ''
  )

  return (
    // e('div', {className:'like-button'}, button)
    fragment
  )
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App, {name: 'Jun'}), domContainer);
