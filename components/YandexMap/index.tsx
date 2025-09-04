import React from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";

interface MapProps {
    coordinate: [number, number];
    className: string
}

const YandexMap = (props: MapProps) => {
    return (
        <YMaps>
            <Map
                defaultState={{ center: [41.3111, 69.2797], zoom: 12 }}
                width="100%"
                height="200px"
                className={props.className}
            >
                <Placemark geometry={props.coordinate} />
            </Map>
        </YMaps>
    );
};

export default YandexMap;
