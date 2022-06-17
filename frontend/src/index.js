import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<div id="map"></div>
		<App />
	</React.StrictMode>
);
