import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/Mapa/MapaModal.css';
import vehiculoIcon from '../../assets/images/vehiculo.png'; // Ajusta la ruta según tu estructura de carpetas
import { mostrarAlerta } from '../../components/alertas/sweetAlert'; // Asegúrate de importar mostrarAlerta

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

const MapaModal = ({ latitud, longitud, onClose, onSave, isUpdate }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [zoom, setZoom] = useState(13); // Nivel de zoom inicial
    const [isLocationSaved, setIsLocationSaved] = useState(false); // Nueva variable de estado
    const [isUpdatingLocation, setIsUpdatingLocation] = useState(isUpdate);  // Usar isUpdate para inicializar
    const handleSaveLocation = () => {
        const { lat, lng } = markerRef.current.getLatLng();
        onSave(lat, lng); // Guarda la ubicación
        setIsLocationSaved(true); // Marca la ubicación como guardada
        // Mostrar alerta dependiendo de si es una actualización o un nuevo guardado
        if (isUpdatingLocation) {
            mostrarAlerta("Se ha actualizado la ubicación correctamente", "success"); // Alerta de actualización
        } else {
            mostrarAlerta("Se ha guardado la ubicación correctamente", "success"); // Alerta de éxito al guardar
        }
        onClose();
        setIsUpdatingLocation(false); // Solo cambia a false después de guardar
    };

    // const handleClose = () => {
    //     setIsLocationSaved(false); // Marca que no se ha guardado la ubicación
    //     onClose(); // Solo cierra el modal
    // };

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
                if (!isLocationSaved) {
                    const { lat, lng } = e.latlng;
                    markerRef.current.setLatLng([lat, lng]);
                    onSave(lat, lng); // Guarda la nueva ubicación
                }
            }, 120));

            map.on('zoomend', debounce(() => {
                setZoom(map.getZoom());
            }, 120));

            return () => {
                map.off();
                map.remove();
            };
        }
    }, [latitud, longitud, onSave, isLocationSaved]); // Agregar isLocationSaved a las dependencias

    // Asegúrate de que el marcador se mantenga en la ubicación guardada
    useEffect(() => {
        if (markerRef.current && isLocationSaved) {
            markerRef.current.setLatLng([latitud, longitud]);
        }
    }, [latitud, longitud, isLocationSaved]);

    return (
        <div className="modal">
            <div className="modal-content">
                <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
                <button onClick={onClose}>Cerrar</button>
                <button onClick={handleSaveLocation}>
                    {isUpdatingLocation ? "Actualizar Ubicación" : "Guardar Ubicación"}
                </button>
            </div>
        </div>
    );
};

export default MapaModal;