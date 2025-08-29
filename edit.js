/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Internal dependencies
 */
import './editor.scss';

// Data for the 30 largest cities (simplified for demonstration)
const CITIES = [
	{ name: 'Tokyo', population: '37.4M', lat: 35.6895, lon: 139.6917 },
	{ name: 'Delhi', population: '30.3M', lat: 28.7041, lon: 77.1025 },
	{ name: 'Shanghai', population: '27.1M', lat: 31.2304, lon: 121.4737 },
	{ name: 'São Paulo', population: '22.0M', lat: -23.5505, lon: -46.6333 },
	{ name: 'Mexico City', population: '21.8M', lat: 19.4326, lon: -99.1332 },
	{ name: 'Cairo', population: '20.9M', lat: 30.0444, lon: 31.2357 },
	{ name: 'Mumbai', population: '20.4M', lat: 19.076, lon: 72.8777 },
	{ name: 'Beijing', population: '20.4M', lat: 39.9042, lon: 116.4074 },
	{ name: 'Osaka', population: '19.1M', lat: 34.6937, lon: 135.5022 },
	{ name: 'Chongqing', population: '16.3M', lat: 29.428, lon: 106.5029 },
	{ name: 'Karachi', population: '16.0M', lat: 24.8615, lon: 67.0099 },
	{ name: 'Istanbul', population: '15.5M', lat: 41.0082, lon: 28.9784 },
	{ name: 'Dhaka', population: '21.0M', lat: 23.8103, lon: 90.4125 },
	{ name: 'Buenos Aires', population: '15.2M', lat: -34.6037, lon: -58.3816 },
	{ name: 'Kolkata', population: '14.9M', lat: 22.5726, lon: 88.3639 },
	{ name: 'Lagos', population: '14.3M', lat: 6.5244, lon: 3.3792 },
	{ name: 'Manila', population: '13.9M', lat: 14.5995, lon: 120.9842 },
	{ name: 'Tianjin', population: '13.7M', lat: 39.3434, lon: 117.3616 },
	{ name: 'Guangzhou', population: '13.3M', lat: 23.1291, lon: 113.2644 },
	{ name: 'Rio de Janeiro', population: '13.2M', lat: -22.9068, lon: -43.1729 },
	{ name: 'Kinshasa', population: '13.1M', lat: -4.4419, lon: 15.2663 },
	{ name: 'Lahore', population: '12.8M', lat: 31.5497, lon: 74.3436 },
	{ name: 'Bangalore', population: '12.7M', lat: 12.9716, lon: 77.5946 },
	{ name: 'Shenzhen', population: '12.5M', lat: 22.5431, lon: 114.0579 },
	{ name: 'Moscow', population: '12.4M', lat: 55.7558, lon: 37.6173 },
	{ name: 'Chennai', population: '11.4M', lat: 13.0827, lon: 80.2707 },
	{ name: 'Seoul', population: '9.9M', lat: 37.5665, lon: 126.978 },
	{ name: 'Bogotá', population: '10.7M', lat: 4.711, lon: -74.0721 },
	{ name: 'Jakarta', population: '10.6M', lat: -6.2088, lon: 106.8456 },
	{ name: 'London', population: '9.0M', lat: 51.5074, lon: -0.1278 }
];

// Helper function to convert spherical coordinates (lat/lon) to Cartesian coordinates (x, y, z)
const getCartesianCoordinates = (lat, lon, radius) => {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lon + 180) * (Math.PI / 180);
	return new THREE.Vector3(
		-radius * Math.sin(phi) * Math.cos(theta),
		radius * Math.cos(phi),
		radius * Math.sin(phi) * Math.sin(theta)
	);
};

// Main editor component for the block
export default function Edit({ attributes, setAttributes }) {
	const { blockTitle } = attributes;
	const blockProps = useBlockProps();
	const containerRef = useRef();
	const infoBoxRef = useRef();
	let scene, camera, renderer, globe, controls, currentCity;

	useEffect(() => {
		// Three.js initialization and rendering
		const init = () => {
			const container = containerRef.current;
			if (!container) return;

			// Scene
			scene = new THREE.Scene();
			scene.background = new THREE.Color(0xcccccc);

			// Camera
			camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
			camera.position.z = 2.5;

			// Renderer
			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize(container.offsetWidth, container.offsetHeight);
			container.appendChild(renderer.domElement);

			// Lighting
			const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
			scene.add(ambientLight);
			const pointLight = new THREE.PointLight(0xffffff, 0.5);
			pointLight.position.set(5, 5, 5);
			scene.add(pointLight);

			// Globe (a sphere)
			const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
			const globeMaterial = new THREE.MeshPhongMaterial({
				color: 0x2255ff,
				shininess: 15,
				specular: 0x999999,
				transparent: true,
				opacity: 0.9
			});
			globe = new THREE.Mesh(globeGeometry, globeMaterial);
			scene.add(globe);

			// Data Points (spheres on the surface)
			const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
			const pointGeometry = new THREE.SphereGeometry(0.015, 16, 16);

			CITIES.forEach(city => {
				const point = new THREE.Mesh(pointGeometry, pointMaterial);
				point.position.copy(getCartesianCoordinates(city.lat, city.lon, 1));
				point.userData = city; // Store city data on the object for easy access
				globe.add(point);
			});

			// Controls for rotation
			controls = new OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.05;
			controls.rotateSpeed = 0.5;
			controls.minDistance = 1.5;
			controls.maxDistance = 5;

			// Animation loop
			const animate = () => {
				requestAnimationFrame(animate);
				controls.update(); // Only required if controls.enableDamping is true
				renderer.render(scene, camera);
			};
			animate();

			// Handle window resize
			const onResize = () => {
				const w = container.offsetWidth;
				const h = container.offsetHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
			};
			window.addEventListener('resize', onResize);

			// Cleanup function
			return () => {
				window.removeEventListener('resize', onResize);
				container.removeChild(renderer.domElement);
				renderer.dispose();
				controls.dispose();
			};
		};

		init();
	}, []);

	return (
		<div {...blockProps}>
			<RichText
				tagName="h2"
				className="globe-title"
				value={blockTitle}
				onChange={(newTitle) => setAttributes({ blockTitle: newTitle })}
				placeholder="Enter a title for the globe..."
			/>
			<div className="globe-canvas-container" ref={containerRef}></div>
			<div ref={infoBoxRef} className="globe-info-box"></div>
		</div>
	);
}
