"use client";

import Image from 'next/image'
import Button from '@mui/material/Button';
// axios
import axios from 'axios';



 function SetOn() {
  async function openBox(e) {
    e.preventDefault()
    axios.get('http://localhost:5000/open')
  }

  return (
    <div onClick ={openBox}>
      <Button variant="contained"  >打开药箱</Button>
    </div>
  )
}
 function SetOff(params) {
  // let onclick = () => {
  //   axios.get('http://localhost:5000/close')
  // }
  async function closeBox(e) {
    e.preventDefault()
    axios.get('http://localhost:5000/close')
  }


  return (
    <div onClick={closeBox}>
      <Button variant="contained">关闭药箱</Button>
    </div>
  )
}

 function SendAudio(params) {
  async function uploadFile(e) {
   e.preventDefault(); 
   const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
  }
  return (
    <div onClick={uploadFile}>
      <Button variant="contained">播放音频</Button>
    </div>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <SetOn />
        <SetOff />
        <SendAudio />

      </div>
    </main>
  )
}


