import React, { useState } from 'react'
import Form from './Form'
import Employees from './Employees'
import { useLocalstorage } from '../../contexts/useLocalstorage'

export default function Dashboard() {

    return (
        <>
          <div className='main-div'>
            <Form></Form>
            <Employees ></Employees>
          </div>
        </>
      )
}
