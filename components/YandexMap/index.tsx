import React from "react";
import { FullscreenControl, GeolocationControl, Map, Placemark, RulerControl, SearchControl, TrafficControl, TypeSelector, YMaps, ZoomControl } from "react-yandex-maps";

interface MapProps {
  coordinate: [number, number];
  className?: string;
  height?: string;
  zoom?: number;
}

const YandexMap = ({ 
  coordinate, 
  className, 
  height = "400px", 
  zoom = 12 
}: MapProps) => {
  return (
    <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YMAPS_KEY }}>
      <Map
        state={{ center: coordinate, zoom }} 
        width="100%"
        height={height}
        className={className}
      >
        <Placemark geometry={coordinate} />
        <SearchControl/>
        <GeolocationControl/>
        <ZoomControl/>
        <FullscreenControl/>
        <TrafficControl/>
        <TypeSelector/>
        <RulerControl/>
      </Map>
    </YMaps>
  );
};

export default YandexMap;
