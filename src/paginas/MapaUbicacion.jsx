import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapaUbicacion = ({ latitud, longitud, setLatitud, setLongitud }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current).setView([latitud, longitud], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(mapInstance.current);

            const marker = L.marker([latitud, longitud]).addTo(mapInstance.current);
            mapInstance.current.on('click', (e) => {
                const { lat, lng } = e.latlng;
                setLatitud(lat);
                setLongitud(lng);
                marker.setLatLng([lat, lng]);
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