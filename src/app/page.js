"use client";

import Image from 'next/image'
import { Modal, Button, TextField, Card, CardContent, Box, Grid, Typography} from '@mui/material';
// axios
import axios from 'axios';
import React, { useState , useRef} from 'react';


const endpoint = "http://localhost";



 function SetOn() {
  async function openBox(e) {
    e.preventDefault()
    axios.get(endpoint+'/medicine-box/open')
  }

  return (
    <div onClick ={openBox}>
      <Button variant="contained"  component="label">打开药箱</Button>
    </div>
  )
}
 function SetOff(params) {
  async function closeBox(e) {
    e.preventDefault()
    axios.get(endpoint+'/medicine-box/close')
  }


  return (
    <div onClick={closeBox}>
      <Button variant="contained" component="label">关闭药箱</Button>
    </div>
  )
}
function SendAudio() {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    await axios.post(endpoint+'/medicine-box/audio/play', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  return (
    <div>
      <Button variant="contained" component="label">
        播放音频
      <input type="file" onChange={handleFileUpload} variant="cantained" hidden/>
      </Button>
    </div>
  );
}

function AlarmModal({ open }) {
  const [time, setTime] = useState('');
  const [visible, setVisible] = useState(false);
  const [audio, setAudio] = useState(null);
  const handleOpen = () => {
    setVisible(true);
  };
  const file = useRef(null);
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleAudioChange = (event) => {
    file.current = event.target.files[0];
    setAudio({
      src: URL.createObjectURL(file.current),
      name: file.current.name,
    });

  };

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append('file', file.current);
    formData.append('time', time);
    await axios.post(endpoint+'/medicine-box/alarm/set', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    onClose();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
  }

  return (
    <>
      <Button onClick={handleOpen}>设置闹钟...</Button>
      <Modal open={visible} onClose={onClose}>
      <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <CardContent>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <TextField
              label="时间"
              type="time"
              value={time}
              onChange={handleTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" component="label">
              闹钟音频
              <input type="file" accept="audio/*" onChange={handleAudioChange} hidden />
            </Button>
          </Grid>
          {audio && (
            <Grid item>
              <audio src={audio.src} controls />
            </Grid>
          )}
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={handleCancel} component="label">取消</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleConfirm} component="label">确定</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
      </Modal>
    </>
  );
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Card sx={{ maxWidth: 500, margin: 'auto' }}>

      <CardContent>
        <Typography variant="h5" component="div">
          智能药箱控制器
        </Typography>
        <Box sx={{ m: 2 }} />
      <Box sx={{ maxWidth: 500, margin: 'auto' }}>
        <SetOn />
        <Box sx={{ m: 1 }} />
        {/* <SetOff /> */}
        {/* <Box sx={{ m: 1 }} /> */}
        <SendAudio />
        <Box sx={{ m: 1 }} />
      <AlarmModal />
      </Box>
      </CardContent>
    </Card>
    </main>
  )
}


