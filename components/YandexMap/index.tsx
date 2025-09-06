import React from "react";
import { 
  FullscreenControl, 
  GeolocationControl, 
  Map, 
  Placemark, 
  SearchControl, 
  TrafficControl, 
  TypeSelector, 
  YMaps, 
  ZoomControl 
} from "react-yandex-maps";

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
  zoom = 16 
}: MapProps) => {
  return (
    <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YMAPS_KEY }}>
      <Map
        state={{ center: coordinate, zoom }} 
        width="100%"
        height={height}
        className={className}
        defaultControls={[]} 
        options={{ suppressMapOpenBlock: true }}
      >
        <Placemark geometry={coordinate} />
        <SearchControl options={{ float: "right" }} />
        <ZoomControl options={{ float: "left" }} />
        <FullscreenControl />
        <TrafficControl options={{ float: "right" }} />
        <TypeSelector options={{ float: "right" }} />
        <GeolocationControl options={{ float: "left" }} />
      </Map>
    </YMaps>
  );
};

export default YandexMap;
