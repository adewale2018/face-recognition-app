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
      imgUrl: "",
      box: {}
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }
  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = box => {
    console.log(box);
    this.setState({box: box})
  }
  onInputChange (evt) {
    this.setState({ input: evt.target.value})
  }
  onButtonSubmit(){
    this.setState({ imgUrl: this.state.input });
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
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
       <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
     </div>
    );
  }
}

export default App;
