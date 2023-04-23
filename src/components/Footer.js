import React from 'react'
import footerStyles from '../css/Footer.module.css'
import CurrentTrack from './CurrentTrack'
import PlayerControls from './PlayerControls'
import Volumn from './Volume'

export default function Footer() {
  return (
    <div className={footerStyles.footer__background}>
      <CurrentTrack/>
      <PlayerControls/>
      <Volumn/>
    </div>
  )
}
