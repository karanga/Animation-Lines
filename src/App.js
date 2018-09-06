import React, { Component } from 'react';
//import ReactDom from 'react-dom';
//import logo from './logo.svg';
import './App.css';
import './Cards.css';
// import PaperView from './PaperView.js';
// import CircleView from './CircleView.js';
// import CircleSimple from './CircleSimple.js';
// //import ADViewLogo from './ADViewLogo.js';
// import SmoothCurve from './SmoothCurve.js';
// import ADViewLogoColor from './ADViewLogoColor.js';

import SquareView from './square.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        
          <div>

            <ul className="cards">
                <li className="card1">
                 
                  {<SquareView CanvasName = 'CircleView1' CircleColor='white'/>}
                </li>
                {/* <li className="card2">
                  
                    {<ADViewLogoColor CanvasName = "card2" CircleColor='purple'/>}
                </li>
                
                <li className="card3">
                 
                  {<PaperView CanvasName = "card3" CircleColor='purple'/>}
                </li>
                <li className="card4">
                
                  {<CircleView CanvasName = "card4" CircleColor='purple'/>}
                </li>
                <li className="card5">
                
                {<CircleView CanvasName = "card5" CircleColor='purple'/>}
                </li> */}
                
                
            </ul>
          </div>
      </div>
      
    );
  }
}

export default App;
