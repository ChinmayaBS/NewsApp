import React,{ Component } from 'react';
import { HashRouter,Routes,Route } from "react-router-dom";
import NavBar from './Navbar';
import News from './News';
import LoadingBar from 'react-top-loading-bar'

class App extends Component{

  constructor(){
    super();
    this.state={
      progress:0
    }
}
setProgress=(progress)=>{
  this.setState({
    progress:progress
  })
}
render(){
  return(
    <HashRouter>
        <NavBar/>
        <LoadingBar
          color='#f11946'
          height='3px'
          progress={this.state.progress}
        />
        <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={5} country="in" category="general"/>}/>
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={5} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={5} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={5} country="in" category="health"/>}/>
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={5} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={5} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={5} country="in" category="technology"/>}/>
        </Routes>
    </HashRouter>
  )
}
}

export default App;
//business entertainment general health science sports technology