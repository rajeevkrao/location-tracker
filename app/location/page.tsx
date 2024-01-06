'use client';

import { useState, useEffect } from 'react'
import NoSleep from 'nosleep.js';
import axios from 'axios';

export default function Location() {
    const [location, setLocation] = useState<any>()
    const [error, setError] = useState<any>()
    const [permission, setPermission] = useState<string>()
    useEffect(() => {
        const noSleep = new NoSleep();
        (async()=>{
            const { state } = await navigator.permissions.query({ name: 'geolocation' })
            setPermission(state)
            if(state === 'granted' || state === 'prompt') {
                noSleep.enable();
            }
    
            navigator.geolocation.watchPosition(
                async (position) => {
                    try {
                        const { coords, timestamp } = position;
                        const { latitude, longitude } = coords; 
                        await axios.post('/api/updateLocation', {latitude, longitude, timestamp})
                        setLocation(position)
                    } catch (err) {
                        console.log(err);
                    }   
                },
                (error) => {
                    console.log(error)
                    setError(error)
                }
            )

            return () => {
                noSleep.disable();
            }
        })();
    }, [])
    return <>
        <h1>Location</h1> 
        <p>{location?.coords?.latitude} {location?.coords?.longitude}</p>
        <p>{JSON.stringify(error)}</p>
        <p>Permission: {permission}</p>
    </>
}