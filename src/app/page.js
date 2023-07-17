"use server";

import Image from 'next/image'
import Button from '@mui/material/Button';
// axios
import axios from 'axios';



export async function SetOn() {
  async function openBox(e) {
    e.preventDefault()
    axios.get('http://localhost:5000/open')
  }

  return (
    <div onclick ={openBox}>
      <Button variant="contained"  >打开药箱</Button>
    </div>
  )
}

export async function SetOff(params) {
  // let onclick = () => {
  //   axios.get('http://localhost:5000/close')
  // }
  async function closeBox(e) {
    e.preventDefault()
    axios.get('http://localhost:5000/close')
  }


  return (
    <div onclick={closeBox}>
      <Button variant="contained">关闭药箱</Button>
    </div>
  )
}

export async function SendAudio(params) {
  async function uploadFile(e) {
    e.preventDefault()
    // select file
    const file = document.getElementById('audio').files[0];
    // create form data
    const formData = new FormData();
    // append data
    formData.append('file', file);
    // post request

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    }
    )

  }
  return (
    <div onclick={uploadFile}>
      <Button variant="contained">播放音频</Button>
    </div>
  )
}

export async function Home() {
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
