import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Display from './components/Display.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    var username = {
      username: term
    }
    $.post('/repos', username)
    .then((res) => {
      console.log('this the result', res)
    })
    .catch((err) => {
      console.log('this error', err)
    })
  }

  componentDidMount() {
    console.log('loaded')
    $.get('/repos', (req, res) => {
      console.log('res', req)
      this.setState({
        repos: req
      })
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <Display repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));