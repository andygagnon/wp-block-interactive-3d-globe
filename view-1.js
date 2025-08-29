/**
 * External dependencies
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Data for the 60 largest cities
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
	{ name: 'London', population: '9.0M', lat: 51.5074, lon: -0.1278 },
    { name: 'Lima', population: '10.8M', lat: -12.0464, lon: -77.0428 },
    { name: 'Hyderabad', population: '10.5M', lat: 17.385, lon: 78.4867 },
    { name: 'Paris', population: '11.0M', lat: 48.8566, lon: 2.3522 },
    { name: 'Chicago', population: '9.5M', lat: 41.8781, lon: -87.6298 },
    { name: 'Bangkok', population: '10.7M', lat: 13.7563, lon: 100.5018 },
    { name: 'Lahore', population: '12.6M', lat: 31.5497, lon: 74.3436 },
    { name: 'Wuhan', population: '11.1M', lat: 30.5928, lon: 114.3055 },
    { name: 'Los Angeles', population: '18.7M', lat: 34.0522, lon: -118.2437 },
    { name: 'Ho Chi Minh City', population: '10.3M', lat: 10.7769, lon: 106.7009 },
    { name: 'Ahmedabad', population: '8.4M', lat: 23.0225, lon: 72.5714 },
    { name: 'New York City', population: '20.1M', lat: 40.7128, lon: -74.0060 },
    { name: 'Kuala Lumpur', population: '8.2M', lat: 3.139, lon: 101.6869 },
    { name: 'Toronto', population: '6.2M', lat: 43.6532, lon: -79.3832 },
    { name: 'Dhaka', population: '22.4M', lat: 23.8103, lon: 90.4125 },
    { name: 'Dallas–Fort Worth', population: '7.8M', lat: 32.7767, lon: -96.7970 },
    { name: 'Madrid', population: '6.7M', lat: 40.4168, lon: -3.7038 },
    { name: 'Berlin', population: '3.7M', lat: 52.5200, lon: 13.4050 },
    { name: 'Rome', population: '4.3M', lat: 41.9028, lon: 12.4964 },
    { name: 'Hamburg', population: '1.8M', lat: 53.5511, lon: 9.9937 },
    { name: 'Frankfurt', population: '2.3M', lat: 50.1109, lon: 8.6821 },
    { name: 'Barcelona', population: '5.5M', lat: 41.3851, lon: 2.1734 },
    { name: 'Milan', population: '3.1M', lat: 45.4642, lon: 9.1900 },
    { name: 'Munich', population: '1.5M', lat: 48.1351, lon: 11.5820 },
    { name: 'Warsaw', population: '1.8M', lat: 52.2297, lon: 21.0122 },
    { name: 'Vienna', population: '1.9M', lat: 48.2082, lon: 16.3738 },
    { name: 'Amsterdam', population: '1.2M', lat: 52.3676, lon: 4.9041 },
    { name: 'Brussels', population: '2.1M', lat: 50.8503, lon: 4.3517 },
    { name: 'Copenhagen', population: '1.3M', lat: 55.6761, lon: 12.5683 }
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

// Main function to initialize the globe
const initGlobe = (containerId) => {
	const container = document.getElementById(containerId);
	if (!container) return;

	let scene, camera, renderer, globe, controls;
	const infoBox = container.parentElement.querySelector('.globe-info-box');

	// Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x0a0a1a);

	// Camera
	const aspectRatio = container.offsetWidth / container.offsetHeight;
	camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
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

	// Globe
	const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
	const globeMaterial = new THREE.MeshPhongMaterial({
		color: 0x0055ff,
		shininess: 15,
		specular: 0x999999,
		transparent: true,
		opacity: 0.9
	});
	globe = new THREE.Mesh(globeGeometry, globeMaterial);
	scene.add(globe);

	// Grid Lines
	const gridMaterial = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.5 });

	// Equator
	const equatorGeometry = new THREE.TorusGeometry(1, 0.001, 16, 100);
	const equator = new THREE.Line(equatorGeometry, gridMaterial);
	equator.rotation.x = Math.PI / 2;
	scene.add(equator);

	// Prime Meridian
	const primeMeridianGeometry = new THREE.TorusGeometry(1, 0.001, 16, 100);
	const primeMeridian = new THREE.Line(primeMeridianGeometry, gridMaterial);
	scene.add(primeMeridian);

	// International Date Line (180 degrees)
	const dateLineGeometry = new THREE.TorusGeometry(1, 0.001, 16, 100);
	const internationalDateLine = new THREE.Line(dateLineGeometry, gridMaterial);
	internationalDateLine.rotation.y = Math.PI; // Rotate by 180 degrees
	scene.add(internationalDateLine);

	// Arctic and Antarctic Circles
	const arcticCircleLat = 66.5; // Latitude of the Arctic Circle
	const antarcticCircleLat = -66.5; // Latitude of the Antarctic Circle
	const circleRadius = Math.cos(arcticCircleLat * Math.PI / 180);
	const circleHeight = Math.sin(arcticCircleLat * Math.PI / 180);

	const circleGeometry = new THREE.CircleGeometry(circleRadius, 64);
	const circleMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });

	// The previous code was trying to access a non-existent '.vertices' property.
	// We now correctly extract the vertices from the geometry's buffer attribute.
	const circleVertices = [];
	const positions = circleGeometry.getAttribute('position').array;
	for (let i = 0; i < positions.length; i += 3) {
		circleVertices.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
	}

	const arcticCircle = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(circleVertices), circleMaterial);
	arcticCircle.rotation.x = -Math.PI / 2;
	arcticCircle.position.y = circleHeight;
	scene.add(arcticCircle);

	const antarcticCircle = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(circleVertices), circleMaterial);
	antarcticCircle.rotation.x = Math.PI / 2;
	antarcticCircle.position.y = -circleHeight;
	scene.add(antarcticCircle);

	// North and South Poles
	const poleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
	const poleGeometry = new THREE.SphereGeometry(0.02, 16, 16);

	const northPole = new THREE.Mesh(poleGeometry, poleMaterial);
	northPole.position.y = 1;
	scene.add(northPole);

	const southPole = new THREE.Mesh(poleGeometry, poleMaterial);
	southPole.position.y = -1;
	scene.add(southPole);

	// Data Points
	const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	const pointGeometry = new THREE.SphereGeometry(0.015, 16, 16);

	const points = CITIES.map(city => {
		const point = new THREE.Mesh(pointGeometry, pointMaterial);
		point.position.copy(getCartesianCoordinates(city.lat, city.lon, 1));
		point.userData = city;
		globe.add(point);
		return point;
	});

	// Controls
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
	controls.rotateSpeed = 0.5;
	controls.minDistance = 1.5;
	controls.maxDistance = 5;

	// Raycaster for click detection
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	const onClick = (event) => {
		// Calculate mouse position in normalized device coordinates (-1 to +1)
		const rect = renderer.domElement.getBoundingClientRect();
		mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		// Check for intersections
		const intersects = raycaster.intersectObjects(points);

		if (intersects.length > 0) {
			const clickedCity = intersects[0].object.userData;
			infoBox.innerHTML = `<h4>${clickedCity.name}</h4><p>Population: ${clickedCity.population}</p>`;
			infoBox.classList.add('is-visible');
		} else {
			infoBox.classList.remove('is-visible');
		}
	};
	renderer.domElement.addEventListener('click', onClick);

	// Animation loop
	const animate = () => {
		requestAnimationFrame(animate);
		controls.update();
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
};

// Find all instances of the block on the page and initialize them
document.addEventListener('DOMContentLoaded', () => {
	const containers = document.querySelectorAll('.wp-block-create-block-interactive-data-globe-aag .globe-canvas-container');
	containers.forEach(container => {
		initGlobe(container.id);
	});
});
