'use strict';

const e = React.createElement;

const App = () => {
  const [liked, setLiked] = React.useState(false)

  const handleClick = () => setLiked(true)

  return (
    liked ? 'You liked this' :
    e('button', { onClick: handleClick}, 'Like')
  )
}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);
