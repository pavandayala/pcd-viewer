import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import {
    Color,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from "three";

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';

class App extends Component {
    componentDidMount() {
        var container, stats;
			var camera, controls, scene, renderer;

			init();
			animate();
			function init() {

				scene = new Scene();
				scene.background = new Color( 0x000000 );

				camera = new PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.01, 40 );
				camera.position.x = 0.4;
				camera.position.z = - 2;
				camera.up.set( 0, 0, 1 );

				scene.add( camera );

				renderer = new WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				var loader = new PCDLoader();
				loader.load( '/Zaghetto.pcd', function ( points ) {

					scene.add( points );
					var center = points.geometry.boundingSphere.center;
					controls.target.set( center.x, center.y, center.z );
					controls.update();

				} );

				container = document.createElement( 'div' );
				document.body.appendChild( container );
				container.appendChild( renderer.domElement );

				controls = new TrackballControls( camera, renderer.domElement );

				controls.rotateSpeed = 2.0;
				controls.zoomSpeed = 0.3;
				controls.panSpeed = 0.2;

				controls.noZoom = false;
				controls.noPan = false;

				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;

				controls.minDistance = 0.3;
				controls.maxDistance = 0.3 * 100;

				stats = new Stats();
				container.appendChild( stats.dom );

				window.addEventListener( 'resize', onWindowResize, false );

				window.addEventListener( 'keypress', keyboard );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				controls.handleResize();

			}

			function keyboard( ev ) {

				var points = scene.getObjectByName( 'Zaghetto.pcd' );

				switch ( ev.key || String.fromCharCode( ev.keyCode || ev.charCode ) ) {

					case '+':
						points.material.size *= 1.2;
						points.material.needsUpdate = true;
						break;

					case '-':
						points.material.size /= 1.2;
						points.material.needsUpdate = true;
						break;

					case 'c':
						points.material.color.setHex( Math.random() * 0xffffff );
						points.material.needsUpdate = true;
						break;

				}

			}

			function animate() {

				requestAnimationFrame( animate );
				controls.update();
				renderer.render( scene, camera );
				stats.update();

			}
    }
    render() {
        return (
          <div />
        )
      }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);