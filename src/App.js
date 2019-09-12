import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: '9042c28fd7f24fecaf402f8de2c83b42'
 });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imgUrl: ""
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }
  onInputChange (evt) {
    this.setState({ input: evt.target.value})
  }
  onButtonSubmit(){
    this.setState({ imgUrl: this.state.input });
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }
  render() {
    const particleOptions = {
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 800
          }
        }
      }
    };
    return(
      <div className="App">
       <Particles 
         params={particleOptions}
         className="particles"
       />
       <Navigation name="Sign Out"/>
       <Logo />
       <Rank />
       <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}  
        />
       <FaceRecognition imgUrl={this.state.imgUrl}/>
     </div>
    );
  }
}

export default App;
