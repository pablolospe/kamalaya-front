'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import React from 'react'

function GoogleMapsView() {
    const catchontainerStyle={
        width:'100%',
        height: '70vh'
    }
    const cordinate ={ lat: -34.5, lng: -58.56667}

  return (
    <div>
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            mapIds={['ac334af054810bf1']}
        >
            <GoogleMap
            mapContainerStyle={catchontainerStyle}
            center={cordinate}
            zoom={13}
            options={{mapId:'ac334af054810bf1'}}
            mapContainerClassName='map-container'
            >
                <Marker position={{lat:-34.49554238305824, lng:-58.506822617706064}}>Locro</Marker>

            </GoogleMap>


        </LoadScript>

    </div>
  )
}

export default GoogleMapsView