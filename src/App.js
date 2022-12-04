import Navbar from './components/Navbar';
import './App.css';

import React, { Component } from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  pageSize = 10
  country = "in"
  state = {
    progress:0
  }
  setProgress =(progress)=>{
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <Router>
      <div>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
      />
       <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} Key='general' pageSize={this.pageSize} country={this.country} category='general'/>}> </Route>
        <Route exact path="/Business" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key='business' pageSize={this.pageSize} country={this.country} category='business'/>}> </Route>
        <Route exact path="/Health" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key='health' pageSize={this.pageSize} country={this.country} category='health'/>}> </Route>
        <Route exact path="/Entertainment" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} country={this.country} category='entertainment'/>}> </Route>
        <Route exact path="/Science" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key='science' pageSize={this.pageSize} country={this.country} category='science'/>}> </Route>
        <Route exact path="/Sports" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country={this.country} category='sports'/>}> </Route>
        <Route exact path="/Technology" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key='technology' pageSize={this.pageSize} country={this.country} category='technology'/>}> </Route>
       </Routes>
      </div>
      </Router>
    )
  }
}
