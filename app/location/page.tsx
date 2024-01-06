'use client';

import { useState, useEffect } from 'react'
import NoSleep from 'nosleep.js';

export default function Location() {
    const [location, setLocation] = useState<any>()
    const [error, setError] = useState<any>()
    const [permission, setPermission] = useState<string>()
    useEffect(() => {
        const noSleep = new NoSleep();
        (async()=>{
            const { state } = await navigator.permissions.query({ name: 'geolocation' })
            setPermission(state)
            if(state === 'granted') {
                noSleep.enable();
            }
    
            navigator.geolocation.watchPosition(
                (position) => {
                    console.log(position)
                    setLocation(position)
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