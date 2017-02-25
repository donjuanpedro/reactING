import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
  render() {
    return <h1>Hello {this.props.name}!</h1>;
  }
}

class App extends React.Component {
  render() {
    const users = [
      { _id: 1, name: 'Leia' },
      { _id: 2, name: 'Luke' },
      { _id: 3, name: 'Han' }
    ];

    return (
      <div>
        {
          users.map(function(user) {
            return <Hello key={user._id} name={user.name} />;
          })
        }
        </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
