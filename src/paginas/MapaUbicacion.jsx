import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapaUbicacion = ({ latitud, longitud, setLatitud, setLongitud }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [zoom, setZoom] = useState(13); // Nivel de zoom inicial

    useEffect(() => {
        if (!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current).setView([latitud, longitud], zoom);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(mapInstance.current);

            const marker = L.marker([latitud, longitud]).addTo(mapInstance.current);
            mapInstance.current.on('click', (e) => {
                const { lat, lng } = e.latlng;
                setLatitud(lat);
                setLongitud(lng);
                setZoom(zoom);
                if (marker) {
                    marker.setLatLng([lat, lng]);
                }
            });
        } else {
            mapInstance.current.setView([latitud, longitud]);
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.off();
            }
        };
    }, [latitud, longitud]);

    return <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>;
};

export default MapaUbicacion;