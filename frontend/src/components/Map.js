import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const marathons = [
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [10, 52],
		},
		properties: {
			id: 1,
			name: 'Point 1',
			description: 'The first point',
		},
	},
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [5, 48],
		},
		properties: {
			id: 2,
			name: 'Point 2',
			description: 'The second point',
		},
	},
];

mapboxgl.accessToken =
	'pk.eyJ1IjoiamVzc2FuZDc3IiwiYSI6ImNsNGt4YWxjbTEzMXMzanBmcTg4MGlvczUifQ.K5zX2b316PLhPBVkTXZg1A';

const Map = () => {
	const mapContainerRef = useRef(null);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			// See style options here: https://docs.mapbox.com/api/maps/#styles
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [16.89, 50.43],
			zoom: 2.8,
		});

		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

		map.on('load', () => {
			// add the data source for new a feature collection with no features
			map.addSource('random-points-data', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: marathons,
				},
			});
			// now add the layer, and reference the data source above by name
			map.addLayer({
				id: 'random-points-layer',
				source: 'random-points-data',
				type: 'circle',
				paint: {
					'circle-radius': 5,
					'circle-color': 'red',
				},
				// type: 'symbol',
				// layout: {
				// 	// full list of icons here: https://labs.mapbox.com/maki-icons
				// 	'icon-image': 'bakery-15', // this will put little croissants on our map
				// 	'icon-padding': 0,
				// 	'icon-allow-overlap': true,
				// },
			});
		});

		// clean up on unmount
		return () => map.remove();
	}, []);

	return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
