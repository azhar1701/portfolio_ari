
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LocationPoint } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

// Component to recenter map when locations change
const RecenterAutomatically = ({ locations }: { locations: LocationPoint[] }) => {
    const map = useMap();
    useEffect(() => {
        if (locations && locations.length > 0) {
            const bounds = locations.map(loc => loc.position);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [locations, map]);
    return null;
};


const MapSkeleton: React.FC = () => (
    <SkeletonLoader className="h-96 w-full bg-slate-200 rounded-lg" />
);


const MapSection: React.FC<{ locations: LocationPoint[] | null }> = ({ locations }) => {
    // A check to ensure we only render the map on the client side.
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <MapSkeleton />;
    }

    // Default center if no locations are available
    const defaultCenter: [number, number] = [-7.33, 108.35]; // Ciamis, Indonesia

    return (
        <Section id="locations" title="Project Locations" iconClass="fas fa-map-marked-alt">
            <div className="h-96 w-full rounded-lg overflow-hidden shadow-sm border border-slate-200">
                {locations ? (
                     <MapContainer center={defaultCenter} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {locations.map((loc, index) => (
                            <Marker key={index} position={loc.position}>
                                <Popup>
                                    <div className="font-sans">
                                        <h4 className="font-bold">{loc.name}</h4>
                                        <p>{loc.description}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                        <RecenterAutomatically locations={locations} />
                    </MapContainer>
                ) : <MapSkeleton />}
            </div>
        </Section>
    );
};

export default MapSection;
