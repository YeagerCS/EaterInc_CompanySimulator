import React, { useState } from 'react'
import Form from './Form'
import Employees from './Employees'
import { useLocalstorage } from '../../contexts/useLocalstorage'
import Header from '../../Headers/Header'

export default function Dashboard() {

    return (
        <>
          <Header/>
          <div className='main-div'>
            <Form></Form>
            <Employees ></Employees>
          </div>
        </>
      )
}
