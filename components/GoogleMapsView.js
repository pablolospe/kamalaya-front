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
                  icon={{
                    url: m?.paciente_id ? '/wheel_chair_accessible.png' : '/favicon-32x32.png',
                    scaledSize: new window.google.maps.Size(20, 20),
                    labelOrigin: new window.google.maps.Point(30, 10),
                  }}
                  label={{
                    text: `${m?.nombre} ${m?.apellido}`,
                    color: m?.paciente_id ? 'teal' : 'midnightblue',
                    fontSize: "14px", // you can change the size of the label text here
                  }}
                > 
                  {m?.nombre} 
                </Marker>
                {/* <Marker
                  position={{ lat: Number(m?.lat), lng: Number(m?.lng) }}
                  // cursor={`seeh`}
                  icon={{
                    labelOrigin: new google.maps.Point(10, -10),
                    url: m?.paciente_id
                      ? '/wheel_chair_accessible.png'
                      : '/favicon-32x32.png',
                    // scaledSize: !m?.paciente_id && new window.google.maps.Size(50, 50),
                  }}
                  // type={'info'}
                  label={{
                    text: `${m?.nombre} ${m?.apellido}`,
                    color: m?.paciente_id ? 'teal' : 'midnightblue',
                  }}
                >
                  {m?.nombre}
                </Marker> */}
              </section>
            ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default GoogleMapsView;
