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
      repos: [],
      top: []
    }
    // this.getTop = this.getTop.bind(this);
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
      console.log(req.length)
      this.setState({
        repos: req
      })
      this.getTop(req);
    })
  }

  getTop(data) {
    console.log('top', data)
    var repoData = data;
    var topRepos = [];
    while (topRepos.length !== 25) {
      if (repoData.length === 0) {
        break;
      }
      var max = 0;
      var slicePos;
      var temp;
      for (var j = 0; j < repoData.length; j++) {
        if (repoData[j].forks > max) {
          temp = repoData[j];
          slicePos = j;
          max = repoData[j].forks;
        }
      }
      // console.log('slicelsdflafkajsf', slicePos)
      repoData.splice(slicePos, 1)
      topRepos.push(temp);
    }
    this.setState({
      top: topRepos
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <Display repos={this.state.top}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));