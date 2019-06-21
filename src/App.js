import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Facerecognition from './components/Facerecognition/Facerecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: '79f0dac6492f4487970f0518e03c43fe'
});

const particlesopt={
  particles: {
    number: {
      value: 100,
      density: {
        enable: true, value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state ={
      input:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
          
    };
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input :event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => 
      this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn:false})
    }else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }


  render(){
    const {isSignedIn,imageUrl,route,box}= this.state;
    return (
      <div className="App">
        <Particles className='particles'
                params={particlesopt} />
      <Navigation  isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      <Logo />
      { route === 'home'
      ?<div> 
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      <br/>
      <Facerecognition box={box} imageUrl={imageUrl}/>
      </div>
    : (
      route==='signin'
     ?<Signin onRouteChange={this.onRouteChange} />
     :<Register onRouteChange={this.onRouteChange} />
    )
  }
  </div>
  )
}
}

export default App;
