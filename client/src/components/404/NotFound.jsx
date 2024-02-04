import React from 'react'
import { Link } from 'react-router-dom'
import HomeHeader from '../../Headers/HomeHeader'

export default function NotFound() {
  return (
    <>
      <HomeHeader/>
      <div className='nf-div'>
        <h1 className='nf-code'>404</h1>
        <p className='nf-text'>Couldn't find what you're looking for? Try <Link className="nf-link" to={"/"}>Here</Link></p>
      </div>
    </>
  )
}
