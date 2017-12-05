import React, { Component } from 'react';
//import ReactDom from 'react-dom';
//import logo from './logo.svg';
import './App.css';
import './Cards.css';
import PaperView from './PaperView.js';
import CircleView from './CircleView.js';
import CircleSimple from './CircleSimple.js';
import ADViewLogo from './ADViewLogo.js';
import SmoothCurve from './SmoothCurve.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        
          <div>

            <ul className="cards">
                <li className="card1">
                  card 1
                {<ADViewLogo CanvasName = 'CircleView1' CircleColor='white'/>}
                </li>
                <li className="card2">
                    <h2>Card 2 </h2>
                    {<SmoothCurve CanvasName = "card2" CircleColor='purple'/>}
                </li>
                
                <li className="card3">
                  <h2>Card 3 </h2>
                  {<PaperView CanvasName = "card3" CircleColor='purple'/>}
                </li>
                <li className="card4">
                  <h2>Card 4</h2>
                  {<CircleView CanvasName = "card4" CircleColor='purple'/>}
                </li>
                <li className="card5">
                <h2>Card 5</h2>
                {<CircleView CanvasName = "card5" CircleColor='purple'/>}
                </li>
                
                
            </ul>
          </div>
      </div>
      
    );
  }
}

export default App;
