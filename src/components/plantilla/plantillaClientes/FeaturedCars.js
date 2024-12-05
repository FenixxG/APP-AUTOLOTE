import React from 'react';
import VehicleShowcase from './car-list';

const carrosDestacados = [
    {
        id: 1,
        imgSrc: "/ruta/a/imagen1.jpg",
        carName: "Tesla Model 3",
        carPrice: "45,000",
        carNewPrice: "42,000",
        attributes: [
            { id: 3, icon: "fas fa-car", specification: "2023" },
            { id: 4, icon: "fas fa-road", specification: "0 km" },
            { id: 9, icon: "fas fa-charging-station", specification: "Eléctrico" }
        ]
    },
    // ... más autos ...
];

function FeaturedCars() {
    return (
        <section className="feature-car section-pt">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="text-center mb-4">Nuestros Autos Destacados</h2>
                        <div className="grid-wrapper grid-lg-3 grid-md-2 grid-sm-2 grid-xs-1">
                            {carrosDestacados.map((carro, index) => (
                                <VehicleShowcase
                                    key={index}
                                    className="car-item-grid"
                                    {...carro}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedCars;