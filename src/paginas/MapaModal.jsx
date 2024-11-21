import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Mapa/MapaModal.css';
import vehiculoIcon from '../assets/images/vehiculo.png'; // Ajusta la ruta según tu estructura de carpetas

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

const MapaModal = ({ latitud, longitud, onClose, onSave}) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [zoom, setZoom] = useState(13); // Nivel de zoom inicial

    const handleSaveLocation = () => {
        const { lat, lng } = markerRef.current.getLatLng();
        onSave(lat, lng); // Guarda la ubicación
        onClose();
    };

    useEffect(() => {
        if (mapRef.current) {
            const map = L.map(mapRef.current, {
                doubleClickZoom: false,
                zoomControl: true,
            }).setView([latitud, longitud], zoom);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            const customIcon = L.icon({
                iconUrl: vehiculoIcon,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
            });

            // Inicializa el marcador en la posición actual
            markerRef.current = L.marker([latitud, longitud], { icon: customIcon }).addTo(map);

            map.on('click', debounce((e) => {
                const { lat, lng } = e.latlng;
                markerRef.current.setLatLng([lat, lng]);
                onSave(lat, lng); // Guarda la nueva ubicación
            }, 120));

            map.on('zoomend', debounce(() => {
                setZoom(map.getZoom());
            }, 120));

            return () => {
                map.off();
                map.remove();
            };
        }
    }, [latitud, longitud, onSave]);

    return (
        <div className="modal">
            <div className="modal-content">
                <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
                <button onClick={onClose}>Cerrar</button>
                <button onClick={handleSaveLocation}>Guardar Ubicación</button>
            </div>
        </div>
    );
};

export default MapaModal; 