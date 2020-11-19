import React, { Component } from 'react';
//import ReactDom from 'react-dom';
//import logo from './logo.svg';
import './App.css';
import './Cards.css';
import Board from './tutorial/board.js';
// import PaperView from './PaperView.js';
// import CircleView from './CircleView.js';
// import CircleSimple from './CircleSimple.js';
// //import ADViewLogo from './ADViewLogo.js';
// import SmoothCurve from './SmoothCurve.js';
// import ADViewLogoColor from './ADViewLogoColor.js';

import DashboardView from './Containers/DashboardView.js';
import SettingsFormView from './Containers/SettingsFormView.js';

//import SquareView from './SquareView.js';
import MatterView from './MatterView.js';
import MatterSquareView from './matter/MatterSquareView.js';
import CircleView from './CircleView';

import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <ul className="cards">
            <li className="card2">
              {/* {<MatterView CanvasName="CircleView1" CircleColor="white" Parent="card2" />} */}
              
            </li>
            <li className="card1">
                  
                {<DashboardView/>}
            </li>
            <li className="card5">
           
            </li>

            <li className="card3">
            {<CircleView CanvasName="CircleView13" CircleColor="white"/>}
           {<SettingsFormView/>}
            </li>

            <li className="card4">
              
            </li>

          </ul>
        </div>
      </div>
    );
  }
}

export default App;
