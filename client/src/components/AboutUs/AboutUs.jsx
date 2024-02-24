import React, { useEffect, useState } from 'react'
import HomeHeader from '../../Headers/HomeHeader'
import Header from '../../Headers/Header'
import axios from 'axios'
import { GET_keyEmployees, uri } from '../../apiroutes/routes'

export default function AboutUs() {
  const [hits, setHits] = useState([])
  const [ceo, setCeo] = useState(null)
  const [chiefs, setChiefs] = useState([])

  useEffect(() => {
    const fetchEmployees = async() => {
        try{
            const response =  await axios.get(GET_keyEmployees)
            const tempHits = response.data;
            const restHits = tempHits.filter(hit => !hit.ceo && !hit.Employee.job.includes("Chief"))

            setHits(restHits)

            const co = tempHits.find(hit => hit.ceo === true);
            setCeo(co)
            const chfs = tempHits.filter(hit => hit.Employee.job.includes("Chief") && !hit.ceo)
            setChiefs(chfs)
        } catch(e){
            console.log(e);
        }
    }

    fetchEmployees();
  }, [])

  if(hits.length > 0){
    return (
        <>
            <Header/>
            <div className="about-div">
                <div>
                    <div>
                        <img src={uri + chiefs[0].image} alt="TheMan" className='employee-image'/>
                        <div>{chiefs[0].Employee.firstname} {chiefs[0].Employee.lastname}</div>
                        <div><strong>{chiefs[0].Employee.job}</strong></div>
                    </div>
                </div>
                <div className='ceo-div'>
                    <img src={uri + ceo.image} alt="CEO" className='ceo-image'/>
                    <div>{ceo.Employee.firstname} {ceo.Employee.lastname}</div>
                    <div><strong>{ceo.Employee.job}</strong></div>
                </div>
                <div>
                <div>
                        <img src={uri + chiefs[1].image} alt="TheMan" className='employee-image'/>
                        <div>{chiefs[1].Employee.firstname} {chiefs[1].Employee.lastname}</div>
                        <div><strong>{chiefs[1].Employee.job}</strong></div>
                    </div>
                </div>
            </div>
            <div className="about-div">
                {hits.map((employee) => (
                    <div>
                        <img src={uri + employee.image} alt="Andrin" className='employee-image'/>
                        <div>{employee.Employee.firstname} {employee.Employee.lastname}</div>
                        <div><strong>{employee.Employee.job}</strong></div>
                    </div>
                ))}
            </div>
            
        </>
      )
  }

  return (
    <div>Loading...</div>
  )
}
