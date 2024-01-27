'use client';
import { useRouter } from 'next/navigation';
import { Button, Input } from "antd"
import { useState } from "react"
import axios from "axios"
import "./page.scss"

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState<string>('')
  
  const startLocation = async () => {
    try {  
      if (!name) return alert('Please enter your name to identify yourself');
      await axios.get('/api/setName?name=' + name);
      router.push('/location');
    }
    catch (err) {
      console.log(err)
    }
  }

  return <>
    <h1>Location Tracker</h1>
    <br/>
    <p>Enter your name</p>
    <div className="name-container">
      <Input placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}} />
      <Button type="primary" onClick={()=>{startLocation()}}>Submit</Button>
    </div>
  </>
}
