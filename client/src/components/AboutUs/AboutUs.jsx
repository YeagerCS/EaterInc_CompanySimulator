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
                    <img src="../assets/images/sharkper.png" alt="Potter" className='employee-image'/>
                    <div>Caspar Stählin</div>
                    <div><strong>Chief Magic Officer</strong></div>
                </div>
            </div>
        </div>
        <div className="about-div">
            <div>
                <div>
                    <img src="../assets/images/andrin.png" alt="Andrin" className='employee-image'/>
                    <div>Andrin Egli</div>
                    <div><strong>Junior Software Eater</strong></div>
                </div>
            </div>
            <div className='ceo-div'>
                <img src="../assets/images/molester.png" alt="Molester" className='employee-image'/>
                <div>David Stoni</div>
                <div><strong>Head of Workplace Molesting</strong></div>
            </div>
            <div>
                <div>
                    <img src="../assets/images/doener.png" alt="Döner" className='employee-image'/>
                    <div>Kaan Kayali</div>
                    <div><strong>FemaleBoxer Apprentice</strong></div>
                </div>
            </div>
        </div>
        <div className="about-div">
            <div>
                <div>
                    <img src="../assets/images/lessio.png" alt="Ferrari" className='employee-image'/>
                    <div>Alessio Ferretti</div>
                    <div><strong>Senior Software Enjoyer</strong></div>
                </div>
            </div>
            <div>
                <div>
                    <img src="../assets/images/jugo.png" alt="jugo" className='employee-image'/>
                    <div>Damjan Zivkovic</div>
                    <div><strong>Head of Crack Departement</strong></div>
                </div>
            </div>
            <div>
                <div>
                    <img src="../assets/images/fag.png" alt="Faggot" className='employee-image'/>
                    <div>Yaron Küng</div>
                    <div><strong>Coroporate Fag Intern</strong></div>
                </div>
            </div>
        </div>
    </>
  )
}
