import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { LocationPoint } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

// Component to recenter / pan map smoothly when selection changes
const RecenterAutomatically = ({
  locations,
  forcePosition,
}: {
  locations: LocationPoint[];
  forcePosition?: [number, number];
}) => {
  const map = useMap();
  useEffect(() => {
    if (forcePosition && forcePosition.length >= 2 && forcePosition[0] !== null && forcePosition[1] !== null) {
      map.flyTo(forcePosition, 13, { duration: 1.2 });
    } else if (locations && locations.length > 0) {
      const validBounds = locations
        .filter(loc => loc.position && loc.position.length >= 2 && loc.position[0] !== null && loc.position[1] !== null)
        .map(loc => loc.position);

      if (validBounds.length > 0) {
        map.fitBounds(validBounds, { padding: [60, 60] });
      }
    }
  }, [locations, map, forcePosition]);
  return null;
};

// Sleek engineering map marker using Leaflet divIcon
const createGisIcon = (isActive: boolean) => {
  return L.divIcon({
    className: 'gis-marker-wrapper',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
        <div style="
          width: 30px; 
          height: 30px; 
          border-radius: 9999px; 
          background-color: ${isActive ? '#0ea5e9' : '#0f172a'}; 
          color: white; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          border: 2px solid white;
          transform: ${isActive ? 'scale(1.15)' : 'scale(1)'};
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        ">
          <i class="fas fa-location-crosshairs" style="font-size: 11px;"></i>
        </div>
        ${isActive ? '<div style="position: absolute; inset: -3px; border-radius: 9999px; background: rgba(14, 165, 233, 0.35); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

const BASEMAPS = {
  googleRoad: {
    name: 'Google Maps Road',
    url: 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    attribution: '&copy; <a href="https://maps.google.com" target="_blank" rel="noopener">Google Maps</a>',
    maxZoom: 20,
  },
  googleHybrid: {
    name: 'Google Satellite Hybrid',
    url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    attribution: '&copy; <a href="https://maps.google.com" target="_blank" rel="noopener">Google Maps & Satellite</a>',
    maxZoom: 20,
  },
};

type BasemapKey = 'googleRoad' | 'googleHybrid';

const MapSection: React.FC<{ locations: LocationPoint[] | null }> = ({ locations }) => {
  const [isClient, setIsClient] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number] | undefined>(undefined);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [activeBasemap, setActiveBasemap] = useState<BasemapKey>('googleRoad');

  useEffect(() => {
    setIsClient(true);
    if (locations && locations.length > 0 && !activeLocation) {
      setActiveLocation(locations[0].name);
      setMapCenter(locations[0].position);
    }
  }, [locations]);

  const handleLocationClick = (loc: LocationPoint) => {
    setMapCenter(loc.position);
    setActiveLocation(loc.name);
  };

  if (!isClient) {
    return (
      <Section id="locations" title="Geospatial Project Hub" iconClass="fas fa-map-location-dot" noContainer>
        <div className="h-96 w-full max-w-6xl mx-auto">
          <SkeletonLoader className="h-full w-full rounded-3xl" />
        </div>
      </Section>
    );
  }

  const defaultCenter: [number, number] = [-7.33, 108.35]; // Ciamis, Jawa Barat
  const activeLocData = locations?.find(l => l.name === activeLocation);

  return (
    <Section id="locations" title="Geospatial Project Hub" iconClass="fas fa-map-location-dot" noContainer>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
        {/* Left Side: Technical Location List & GIS Inspector */}
        <div className="lg:col-span-5 space-y-6" data-aos="fade-right">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-3">
              <i className="fas fa-satellite-dish text-brand-accent text-xs"></i>
              <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Regional Water Monitoring</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2">
              Lokasi Studi & Lapangan
            </h3>
            <p className="text-text-secondary leading-relaxed font-medium text-sm">
              Peta interaktif persebaran wilayah kerja teknis, pemodelan hidraulika, dan pengelolaan data spasial irigasi di Jawa Barat.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {locations ? (
              locations.map((loc) => {
                const isActive = activeLocation === loc.name;
                return (
                  <button
                    key={loc.name}
                    onClick={() => handleLocationClick(loc)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                      isActive
                        ? 'bg-bg-canvas border-brand-accent shadow-md ring-1 ring-brand-accent/20 translate-x-1'
                        : 'bg-bg-app border-border-subtle hover:border-brand-accent/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="text-sm sm:text-base font-bold text-text-primary tracking-tight group-hover:text-brand-accent transition-colors flex items-center">
                        <i className={`fas fa-location-dot text-xs mr-2 ${isActive ? 'text-brand-accent' : 'text-text-muted'}`}></i>
                        {loc.name}
                      </h4>
                      <span className="font-mono text-[10px] text-brand-accent font-bold px-2 py-0.5 bg-brand-accent/10 rounded-md">
                        {loc.position && loc.position.length >= 2
                          ? `${loc.position[0].toFixed(3)}, ${loc.position[1].toFixed(3)}`
                          : 'N/A'}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium line-clamp-2">
                      {loc.description}
                    </p>
                  </button>
                );
              })
            ) : (
              [...Array(3)].map((_, i) => <SkeletonLoader key={i} className="h-20 w-full rounded-2xl" />)
            )}
          </div>

          {/* Active GIS Telemetry HUD */}
          {activeLocData && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                <span><i className="fas fa-crosshairs mr-1"></i> Telemetry Coordinates</span>
                <span>WS CITANDUY</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">LATITUDE</span>
                  <span className="font-semibold text-white">{activeLocData.position[0].toFixed(5)}° S</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">LONGITUDE</span>
                  <span className="font-semibold text-white">{activeLocData.position[1].toFixed(5)}° E</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Leaflet Map Container */}
        <div className="lg:col-span-7 flex flex-col space-y-3" data-aos="fade-left">
          {/* Basemap Switcher Toolbar */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2 text-xs text-text-muted font-bold uppercase tracking-wider">
              <i className="fas fa-layer-group text-brand-accent"></i>
              <span>Basemap Style</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-bg-app p-1 rounded-xl border border-border-subtle">
              <button
                type="button"
                onClick={() => setActiveBasemap('googleRoad')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeBasemap === 'googleRoad'
                    ? 'bg-brand-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <i className="fas fa-map text-xs"></i>
                <span>Google Maps</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveBasemap('googleHybrid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeBasemap === 'googleHybrid'
                    ? 'bg-brand-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <i className="fas fa-satellite text-xs"></i>
                <span>Google Satellite</span>
              </button>
            </div>
          </div>

          <div className="relative h-[380px] sm:h-[450px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-lg border border-border-subtle bg-bg-app flex items-center justify-center z-0">
            {locations ? (
              <MapContainer
                center={defaultCenter}
                zoom={11}
                scrollWheelZoom={false}
                className="h-full w-full z-10"
              >
                <TileLayer
                  key={activeBasemap}
                  attribution={BASEMAPS[activeBasemap].attribution}
                  url={BASEMAPS[activeBasemap].url}
                  subdomains={BASEMAPS[activeBasemap].subdomains}
                  maxZoom={BASEMAPS[activeBasemap].maxZoom}
                />
                {locations
                  .filter(loc => loc.position && loc.position.length >= 2 && loc.position[0] !== null && loc.position[1] !== null)
                  .map((loc, index) => {
                    const isActive = activeLocation === loc.name;
                    return (
                      <Marker
                        key={`${loc.name}-${index}`}
                        position={loc.position}
                        icon={createGisIcon(isActive)}
                        eventHandlers={{
                          click: () => {
                            setActiveLocation(loc.name);
                            setMapCenter(loc.position);
                          },
                        }}
                      >
                        <Popup className="engineering-gis-popup">
                          <div className="p-2 min-w-[200px]">
                            <div className="flex items-center space-x-1.5 text-brand-accent text-[10px] font-bold uppercase tracking-wider mb-1">
                              <i className="fas fa-water"></i>
                              <span>Water Resources Node</span>
                            </div>
                            <h5 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{loc.name}</h5>
                            <p className="text-xs text-gray-600 mb-2 leading-relaxed">{loc.description}</p>
                            <div className="pt-1.5 border-t border-gray-200 text-[10px] font-mono text-gray-500">
                              GEO: {loc.position[0].toFixed(3)}, {loc.position[1].toFixed(3)}
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                <RecenterAutomatically locations={locations} forcePosition={mapCenter} />
              </MapContainer>
            ) : (
              <SkeletonLoader className="h-full w-full rounded-3xl" />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MapSection;
