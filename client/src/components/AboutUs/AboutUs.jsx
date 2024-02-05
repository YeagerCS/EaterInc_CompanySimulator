import React from 'react'
import HomeHeader from '../../Headers/HomeHeader'
import Header from '../../Headers/Header'

export default function AboutUs() {
  return (
    <>
        <Header/>
        <div className="about-div">
            <div>
                <div>
                    <img src="../assets/images/mias.png" alt="TheMan" className='employee-image'/>
                    <div>Jeremias Rieser</div>
                    <div><strong>Chief Operating Officer</strong></div>
                </div>
            </div>
            <div className='ceo-div'>
                <img src="../assets/images/ceo.png" alt="CEO" className='ceo-image'/>
                <div>Lejs Malisi</div>
                <div><strong>Chief Executive Officer</strong></div>
            </div>
            <div>
                <div>
                    <img src="../assets/images/Mr-Potter.png" alt="Potter" className='employee-image'/>
                    <div>Caspar Stählin</div>
                    <div><strong>Chief Magic Officer</strong></div>
                </div>
            </div>
        </div>
    </>
  )
}
