import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
    if (Object.keys(box).length === 0) return null;
    console.log('FaceRecognition');
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img src={imageUrl} alt='' width='500px' height='auto' id='inputImage'/>
                {
                    box.forEach((face) => {
                        return (
                            <div className='bounding-box'
                                 style={{top: face.topRow, right: face.rightCol, bottom: face.bottomRow, left: face.leftCol}}>
                            </div>
                        )
                    })}
                }
            </div>
        </div>
    );
}

export default FaceRecognition;
