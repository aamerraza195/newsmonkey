import Navbar from './components/Navbar';
import './App.css';

import React, { useState } from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
// c87476ef4edb47a28b9f83fd0293c47a amir api
// a0df695455a64b1c8f489b55db4f34d2 ans api
const App =()=> {
  const apiKey= process.env.REACT_APP_NEWS_API
  
 const  pageSize = 10
  const country = "in"
  const [progress, setProgress] = useState(0)
  
    return (
      <Router>
      <div>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
       <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} Key='general' pageSize={pageSize} country={country} category='general'/>}> </Route>
        <Route exact path="/Business" element={<News setProgress={setProgress}  apiKey={apiKey} key='business' pageSize={pageSize} country={country} category='business'/>}> </Route>
        <Route exact path="/Health" element={<News setProgress={setProgress}  apiKey={apiKey} key='health' pageSize={pageSize} country={country} category='health'/>}> </Route>
        <Route exact path="/Entertainment" element={<News setProgress={setProgress}  apiKey={apiKey} key='entertainment' pageSize={pageSize} country={country} category='entertainment'/>}> </Route>
        <Route exact path="/Science" element={<News setProgress={setProgress}  apiKey={apiKey} key='science' pageSize={pageSize} country={country} category='science'/>}> </Route>
        <Route exact path="/Sports" element={<News setProgress={setProgress}  apiKey={apiKey} key='sports' pageSize={pageSize} country={country} category='sports'/>}> </Route>
        <Route exact path="/Technology" element={<News setProgress={setProgress}  apiKey={apiKey} key='technology' pageSize={pageSize} country={country} category='technology'/>}> </Route>
       </Routes>
      </div>
      </Router>
    )
}
export default App
