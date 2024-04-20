import React from 'react'
import { Signup } from './Signup'
import Home from './Home'
import mainimg from '../img/main.jpg'

const Land = () => {
  return (
    <div className='max-w-screen bg-white overflow-x-hidden'>
      <Home />
      <div className="relative mx-auto w-5/6 rounded-md sm:h-72 mt-12 overflow-hidden">
        <img src={mainimg} className='bg-cover mx-auto' />
      </div>
      <section className="flex flex-col w-5/6 mx-auto mt-12">
        <div><h1 className='text-2xl font-extrabold mb-4'>Why HealthPass?</h1></div>
        <div><p className='text-base'>HealthPass is the next generation of personal health records, desinged for privacy, security<br /> and ease of use. It&apos;s the only health record that you truly own and control.</p></div>
      </section>
      <ul className="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8 w-5/6">
        <li className=' bg-teal-100 p-4 w-5/6'></li>
        <li className=' bg-teal-100 p-4 w-5/6'></li>
        <li className=' bg-teal-100 p-4  w-5/6'></li>


      </ul>
    </div>
  )
}

export default Land
