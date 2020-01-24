import React, {Component} from 'react';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Signin from "./components/signin/Signin";
import Register from "./components/register/Register";

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import 'tachyons';
import './App.css';

const app = new Clarifai.App({
    apiKey: '0b7114a2ee434c1c87ee41d9ab57b7c0'
});

const particlesOptions = {
    particles: {
        number: {
            value: 150,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signIn',
            isSignedIn: false,
            boxes: [],
            isImageLoaded: false
        }
    }

    calculateFaceLocation = (data) => {
        console.log('calculateFaceLocation');
        const faces = [];
        const vectorArray = [];
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const heigth = Number(image.height);

        data.outputs.forEach(function (item) {
            item.data.regions.forEach((cajas) => {
                faces.push(cajas.region_info.bounding_box);
            })
        })

        faces.forEach((item) => {
            vectorArray.push({
                leftCol: item.left_col * width,
                topRow: item.top_row * heigth,
                rightCol: width - (item.right_col * width),
                bottomRow: heigth - (item.bottom_row * heigth)
            })
        })
        console.log('Vector Array', vectorArray);

        return vectorArray;
    }

    displayFaceBox = (box) => {
        console.log('displayFaceBox', box);
        this.setState({box: box})
    }

    onInputChange = (event) => {
        console.log('onInputChange');
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        console.log('onButtonSubmit');
        this.setState({imageUrl: this.state.input});
        app.models.predict(
            Clarifai.,
            this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.error(err));
        this.setState({isImageLoaded: true});
    }

    onRouteChange = (route) => {
        console.log('onRouteChange');
        if(route === 'signedOut') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render() {
        const { isSignedIn, imageUrl, route, box, isImageLoaded } = this.state;
        return (
            <div className="App">
                <Particles className='particles' params={particlesOptions}/>
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                { route === 'home'
                    ? <div>
                        < Logo />
                        < Rank />
                        < ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />

                        <FaceRecognition imageUrl={imageUrl} box={box}/>

                    </div>
                    : (
                        this.state.route === 'signIn'
                            ? <Signin onRouteChange={this.onRouteChange}/>
                            : <Register onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default App;
