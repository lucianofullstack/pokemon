export default
    function Home() {
    const
        status = useSelector((state) => state.status),
        dispatch = useDispatch(),
        [skipIntro, setSkipIntro] = React.useState(false),
        hideIntro = (async () => {
            sessionStorage.setItem('intro', true)
            setSkipIntro(true)
            let audio = mp3.pause()
            if (audio !== undefined) {
                audio.then(() => {
                }).catch((error) => { })
            }
        })
        
    React.useEffect(() => {
        if (window.sessionStorage.getItem('intro')) {
            setSkipIntro(true)
        } else {
            (async () => {
                if (!mp3) { mp3 = new Audio(chipTune) }
                await sleep(10)
                if (!status.GET_TYPE) { dispatch( getType()) }
                if (!status.GET_ALL ) { dispatch( getAll() ) }
                await sleep(55)
                let
                    audio = mp3.play()
                if (audio !== undefined) {
                    audio
                        .then(() => { })
                        .catch((error) => { })
                }
            })()
        }
    }, [])

    return !skipIntro
        ? (
            <Intro>
                <Link to="/" onClick={hideIntro} >Play Game</Link>
            </Intro>
        ) : (
            <Main />
        )
}

import Intro    from '../WidgetIntro'
import { sleep } from '../helpers'
import chipTune from '@/snd/chiptune.mp3'
import { Link } from 'react-router-dom'
import Main     from '../PageHome'
import { useDispatch, useSelector } from 'react-redux'
import { getAll, getType } from '%actions%'
import React from 'react'
let mp3
