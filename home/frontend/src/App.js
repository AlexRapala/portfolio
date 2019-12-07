import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, extend, useRender, useThree } from 'react-three-fiber';
import './App.css';

extend({ OrbitControls });

const SpaceShip = () => {
  const [model, setModel] = useState();
  useEffect(() => {
    new GLTFLoader().load('/static/scene.gltf', setModel)

  }, []);
  return model ? <primitive object={model.scene} /> : null;
}

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      autoRotate
      enablePan={false}
      enableZoom={false}
      enableDamping
      ref={orbitRef} />
  )
}

class App extends React.Component {
  
  render() {
      return (
        <React.Fragment>
          <div className="links">
            <span><a target="_blank" rel="noopener noreferrer" href="/static/AlexanderRapalaResume.pdf">RESUME</a></span>
            <span><a target="_blank" rel="noopener noreferrer" href="//github.com/AlexRapala">GITHUB</a></span>
            <span><a target="_blank" rel="noopener noreferrer" href="//linkedin.com/in/alex-rapala">LINKEDIN</a></span>
          </div>
          <div className="intro">
            <h1>Alex Rapala</h1>
            <p>Web Developer</p>
          </div>

      <Canvas
        camera={{
          position: [0,0,15]
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        >
      <fog attach="fog" args={[0xcc7b32, 16, 20]} />
      <Controls />
      <spotLight castShadow position={[15,20,5]} penumbra={1} />
      <ambientLight intensity={0.5} />
      <SpaceShip />
      </Canvas>
      </React.Fragment>
      );
    }
}

export default App;
