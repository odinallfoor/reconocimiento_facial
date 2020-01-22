import React, {Component} from 'react';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import Particles from "react-particles-js";
import 'tachyons';
import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 30,
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
        }
    }

    onInputChange = (evento) => {
        console.log(evento);
    }

    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particlesOptions}/>
                <Navigation />
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange={this.onInputChange()}/>
                {/*<FaceRecognition/>*/}
            </div>
        );
    }
}

export default App;
