
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LocationPoint } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

// Component to recenter map when locations change
const RecenterAutomatically = ({ locations, forcePosition }: { locations: LocationPoint[], forcePosition?: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        if (forcePosition) {
            map.setView(forcePosition, 12, { animate: true });
        } else if (locations && locations.length > 0) {
            const bounds = locations.map(loc => loc.position);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [locations, map, forcePosition]);
    return null;
};


const MapSkeleton: React.FC = () => (
    <SkeletonLoader className="h-full w-full bg-slate-200 rounded-[2.5rem]" />
);


const MapSection: React.FC<{ locations: LocationPoint[] | null }> = ({ locations }) => {
    // A check to ensure we only render the map on the client side.
    const [isClient, setIsClient] = useState(false);
    const [mapCenter, setMapCenter] = useState<[number, number] | undefined>(undefined);
    const [activeLocation, setActiveLocation] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLocationClick = (loc: LocationPoint) => {
        setMapCenter(loc.position);
        setActiveLocation(loc.name);
    };

    if (!isClient) {
        return <Section id="locations" title="Geospatial Index" iconClass="fas fa-location-dot" noContainer><div className="h-96 w-full"><MapSkeleton /></div></Section>;
    }

    // Default center if no locations are available
    const defaultCenter: [number, number] = [-7.33, 108.35]; // Ciamis, Indonesia

    return (
        <Section id="locations" title="Geospatial Index" iconClass="fas fa-location-dot" noContainer>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 max-w-6xl mx-auto">
                {/* Left Side: Technical Registry */}
                <div className="lg:col-span-5 space-y-8" data-aos="fade-right">
                    <div>
                        <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-4">Regional Project Footprint</h3>
                        <p className="text-text-secondary leading-relaxed font-medium">
                            Strategic water resource management sites and research zones indexed by technical geospatial data.
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        {locations ? locations.map((loc) => (
                            <button
                                key={loc.name}
                                onClick={() => handleLocationClick(loc)}
                                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group ${
                                    activeLocation === loc.name 
                                    ? 'bg-bg-canvas border-brand-accent shadow-md ring-1 ring-brand-accent/20' 
                                    : 'bg-bg-app/50 border-border-subtle/30 hover:border-brand-accent/30'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-base font-bold text-text-primary tracking-tight group-hover:text-brand-accent transition-colors">{loc.name}</h4>
                                    <span className="font-mono text-[10px] text-brand-accent font-bold opacity-60 pt-1">
                                        {loc.position[0].toFixed(3)}, {loc.position[1].toFixed(3)}
                                    </span>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed font-medium pr-4 line-clamp-2">
                                    {loc.description}
                                </p>
                            </button>
                        )) : (
                            [...Array(3)].map((_, i) => <SkeletonLoader key={i} className="h-24 w-full rounded-2xl" />)
                        )}
                    </div>
                </div>

                {/* Right Side: High-Precision Viewport */}
                <div className="lg:col-span-7" data-aos="fade-left">
                    <div className="relative h-[350px] lg:h-[480px] w-full rounded-[2rem] overflow-hidden shadow-lg border border-border-subtle/50 bg-bg-app flex items-center justify-center z-0">
                        {locations ? (
                            <MapContainer
                                center={defaultCenter}
                                zoom={11}
                                scrollWheelZoom={false}
                                className="h-full w-full z-10"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {locations.map((loc, index) => (
                                    <Marker 
                                        key={index} 
                                        position={loc.position}
                                        eventHandlers={{
                                            click: () => setActiveLocation(loc.name),
                                        }}
                                    >
                                        <Popup>
                                            <div className="p-1">
                                                <h5 className="font-bold text-text-primary mb-1">{loc.name}</h5>
                                                <p className="text-xs text-text-secondary m-0">{loc.description}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                                <RecenterAutomatically locations={locations} forcePosition={mapCenter} />
                            </MapContainer>
                        ) : <MapSkeleton />}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default MapSection;
