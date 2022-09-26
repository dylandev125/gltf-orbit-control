import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// OBJLoader(THREE);


function App() {
  useEffect(() => {
    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.z = 7;
    camera.position.y = 3;

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );
    
    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    const controls = new OrbitControls( camera, document.querySelector("#bg") );
    controls.maxDistance = 10;
    controls.minDistance = 2;
    controls.update();

    const loader = new GLTFLoader();
    loader.load(
      'models/Mustang_69.gltf',
      ( gltf ) => {
        // called when the resource is loaded
        scene.add( gltf.scene );
      },
      ( xhr ) => {
        // called while loading is progressing
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
      },
      ( error ) => {
        // called when loading has errors
        console.error( 'An error happened', error );
      },
    );

    var animate = function () {
      // controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, []);


  return (
    <div className="App">
      <canvas id="bg"></canvas>
      <main>
      </main>
    </div>
  );
}

export default App;
