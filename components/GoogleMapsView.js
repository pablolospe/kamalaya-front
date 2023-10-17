'use client';
import mapaLayout from '@/app/(home)/mapa/layout';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React from 'react';

function GoogleMapsView({ marker }) {
  const catchontainerStyle = {
    width: '100%',
    height: '40vh',
    borderRadius: '1vh',
    zIndex: '1',
  };
  const cordinate = { lat: -34.48, lng: -58.56667 };

  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        mapIds={['ac334af054810bf1']}
      >
        <GoogleMap
          mapContainerStyle={catchontainerStyle}
          center={cordinate}
          zoom={11}
          options={{ mapId: 'ac334af054810bf1' }}
          mapContainerClassName="map-container"
        >
          {marker &&
            marker.map((m, index) => (
              <section key={index}>
                <Marker
                  position={{ lat: Number(m?.lat), lng: Number(m?.lng) }}
                  // cursor={`seeh`}
                  // icon={``}
                  label={`${m?.nombre} ${m?.apellido}`}
                >
                  {m?.nombre}
                </Marker>
              </section>
            ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default GoogleMapsView;
