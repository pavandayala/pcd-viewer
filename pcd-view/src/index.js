import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import  {PCDLoader}  from "three/examples/jsm/loaders/PCDLoader.js";

class App extends Component {
    componentDidMount() {
      var camera, scene, renderer;
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      //document.body.appendChild( renderer.domElement );
      this.mount.appendChild( renderer.domElement );
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.01, 40 );
      camera.position.set( 0, 0, 1 );
      scene.add( camera );

      const controls = new OrbitControls( camera, renderer.domElement );
      //controls.addEventListener( 'change', render ); // use if there is no animation loop
      controls.minDistance = 0.5;
      controls.maxDistance = 10;

      //scene.add( new THREE.AxesHelper( 1 ) );

      const loader = new PCDLoader();
      loader.load( '/Zaghetto.pcd', ( points )=> {

        points.geometry.center();
        points.geometry.rotateX( Math.PI );
        scene.add( points );

        renderer.render( scene, camera );

      } );

      // window.addEventListener( 'resize', onWindowResize );

      // window.addEventListener( 'keypress', keyboard );
      

      // function onWindowResize() {

			// 	camera.aspect = window.innerWidth / window.innerHeight;
			// 	camera.updateProjectionMatrix();

			// 	renderer.setSize( window.innerWidth, window.innerHeight );

			// }

			// function keyboard( ev ) {

			// 	const points = scene.getObjectByName( 'Zaghetto.pcd' );

			// 	switch ( ev.key || String.fromCharCode( ev.keyCode || ev.charCode ) ) {

			// 		case '+':
			// 			points.material.size *= 1.2;
			// 			break;

			// 		case '-':
			// 			points.material.size /= 1.2;
			// 			break;

			// 		case 'c':
			// 			points.material.color.setHex( Math.random() * 0xffffff );
			// 			break;

			// 	}

			// 	render();

      // }
      
      // function render(){
      //   renderer.render( scene, camera );
      // }
  }
  render() {
    return (
        <div ref={ref => (this.mount = ref)}/>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement);
