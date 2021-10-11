import { Suspense, useEffect, useState, useRef } from "react";

import ModelTest from './Optimized_Desk_Scene_Final';

import { SAY_UNWRAP_TOKEN, GET_TOKEN_METADATA } from '../../services/bitlectro.js';

import { UNWRAP_DREAMLOOP, IS_DREAMLOOP_UNWRAPPED, IS_SALE_STARTED } from '../../services/dreamloops.js';

import { toast } from 'react-toastify';

import axios from "axios";

import { Canvas } from '@react-three/fiber';

import * as THREE from 'three';

import { OrbitControls, Text, PerspectiveCamera, Box, TransformControls } from '@react-three/drei';

import gifFrames from 'gif-frames';

const STATIC = 'https://bitlectrolabs.mypinata.cloud/ipfs/QmQgdm8WLmxJU6jDtmiR2dpCNrFZkSkVGB2wHHitkNq9gg';

function Open(props) {

  let audioRef = useRef();

  //instantiated once
  const loader = new THREE.TextureLoader();

  const [renderThree, setRenderThree] = useState(true);

  //gif that changes and starts the cascading of processes
  const [inputGif, setInputGif] = useState(STATIC);

  const [texturesReady, setTexturesReady] = useState(false);

  //textures as textures
  const [textures, setTextures] = useState([]);

  const [newMeta, setNewMeta] = useState({});

  const [newTextures, setNewTextures] = useState([]);

  const [revealReady, setRevealReady] = useState(false);

  const [showPlay, setShowPlay] = useState(false);


  //FOR TESTING

  //const [testImage, setTestImage] = useStateI()

  //sets default gif on load

  useEffect(() => {

    async function getDefaultGif() {
      let defaultGif = await axios.get(STATIC)

      setInputGif(defaultGif)
    }

    getDefaultGif();

  }, [])

  useEffect(() => {
    //url to local 'broken_screen.gif"
    //console.log('inputGif', inputGif);

    createTextures(inputGif, 'default');

    
  }, [inputGif])

  useEffect(() => {
    if(newMeta.image) {
      createTextures(newMeta.image);
    }
  }, [newMeta])

  function handleReveal() {
      setShowPlay(true);
      setRevealReady(false);
      //play audio
      if (newMeta.animation_url) {
        if(audioRef.current.paused) {
          audioRef.current.play()
          audioRef.current.volume = 0.3
        }
    }
  }
  

  function contractUnwrap() {
    
    let token_id = props.token_id;

    console.log('token_id:', token_id);

    IS_DREAMLOOP_UNWRAPPED(token_id).then((bool) => {
      if(bool == true) {

        sayUnwrap();

      } else {
        
        UNWRAP_DREAMLOOP(token_id).then(response => {
          sayUnwrap();
          //toast.success('unwrapping token')
        }).catch(err => {
          console.log(err.message)
          if(err.code == 4001) {
            //user rejection
            console.log(err)
            //toast.error('Transaction rejected by wallet address');
          }
          //all other errors
          //try anyway
          sayUnwrap();
          //toast.error('Problem communicating with contract');
        })
      }
    })
  };

  function sayUnwrap() {

    let token_id = props.token_id;

    SAY_UNWRAP_TOKEN(token_id).then(response => {
      console.log('say unwrap token', response);
      getMetaData();
      //toast.success(`Unwrapping token #${token_id}!`);
    }).catch(err => {
      console.log('say unwrap token', err);
      //toast.error(`Problem unwrapping token #${token_id}!!!`)
    });
  }

  function getMetaData() {

    let token_id = props.token_id;

    GET_TOKEN_METADATA(token_id).then(response => {
      console.log('metadata success', response);
      setNewMeta(response.data);
      toast.success(`Metadata for #${token_id}!`);
    }).catch(err => {
      console.log('metadata error', err);
      toast.error(`Problem getting metadata for token #${token_id}!!!`)
    });

  }

  ///////////////////////////////////

  async function createTextures(input, type) {

    let textures = [];

    gifFrames({ url: input, frames: 'all', cumulative: true, outputType: 'canvas' }).then(function (frameData) {
      console.log('frameData: ', frameData)
      frameData.forEach(function (frame) {
        //all in one function
        loader.load(frame.getImage().toDataURL(), function( texture ) {
          textures.push(texture);
        }, undefined, function (err) {
          console.log(err);
        })
      });
      
      if(type == 'default') {
        setTextures(textures);
      } else {
        setNewTextures(textures);
        setRevealReady(true);
      }

    }).then(() => {setTexturesReady(true)})

  }
  
  return (
    <>
      {/* FOR TESTING */}
      <div style={{width: '100%', height: '100%'}}>
          <Canvas style={{borderRadius: '30px'}}>
            <spotLight position={[0, 2, 2]} intensity={0.5} color="yellow"/>
            <spotLight position={[4, 2, 100]} intensity={0.4} color="hotpink"/>
            {/* <spotLight position={[1, 1, 1]} intensity={0.5} color="white"/> */}

            <pointLight position={[0.2, 1, 0.4]} intensity={1} color="purple"/>
            <pointLight position={[0.2, 1, 0.4]} intensity={0.8} color="white"/>
            {/* <Sphere position={[0, 1, 0.4]} color="blue"/> */}
            {/* <spotLight position={[-200, 200, 200]} color="lightgreen"/> */}
            <ambientLight color={0xff00ff} intensity={0.2}/>
            <PerspectiveCamera makeDefault position={[0, 0.6, 1.4]}/>
            
            <Suspense fallback={
              <Text
              position={[0, 0, -100]}
              color={'hotpink'}
              fontSize={12}
              maxWidth={200}
              lineHeight={1}
              letterSpacing={0.02}
              textAlign={'center'}
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              anchorX="center"
              anchorY="middle"
              >Loading 3D Unwrap Environment</Text>
            }>
              { texturesReady ? <ModelTest DLtextures={showPlay ? newTextures : textures} mmUnwrap={contractUnwrap} position={[0.35, 0.25, 0]}/> : null }
            </Suspense>

            { revealReady ? <Text color={'white'} font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff" fontSize={0.04} position={[0.22, 0.69, 0.05]} rotation={[0, -0.2, 0]}>Click Screen To Show</Text> : null }

            { revealReady ? <Box position={[0.22, 0.49, 0.05]} rotation={[0, -0.2, 0]} scale={[0.3, 0.3, 0.1]} material={{transparent: true}} onClick={() => handleReveal()}></Box> : null }

            <OrbitControls enableZoom={false} enablePan={false} minAzimuthAngle={-0.6} maxAzimuthAngle={0.6} minPolarAngle={1.2} maxPolarAngle={1.6} target={[0, 0.5, 0]}/>
          </Canvas>
      </div>

      {/* <button className={`bit-btn reveal ${revealReady ? 'show' : 'hide'}`} onClick={() => handleReveal()}>Reveal</button> */}

      <audio
        preload='metadata'
        ref={audioRef}
        src={newMeta.animation_url}
        loop
      />
    </>
  )
}

export default Open;