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

// const Search = (prop) => {


//   return (
//     e('div',)
//   )
// }

const App = (prop) => {
  const button = e(LikeButton, {name: prop.name})

  return (
    e('div', {className:'like-button'}, button)
  )
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App, {name: 'Jun'}), domContainer);
