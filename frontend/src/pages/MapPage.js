import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import styled from 'styled-components/macro';
import Header from 'components/Header';

const MapWrapper = styled.section`
	display: block;
	width: 100%;
	height: 500px;
`;

const MapPage = () => {
	return (
		<MapWrapper>
			<Header />
			<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</MapWrapper>
	);
};

export default MapPage;
