import { data } from 'autoprefixer';
import React, { useState } from 'react'
import { toast, ToastContainer, } from 'react-toastify';

const Registraton = () => {

  const [name, setName] = useState('');
  const [date, setDate] = useState();
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const onsubmit = async (e) => {
    console.log("clicked")
    e.preventDefault();
    if (date && name && gender && address && phone && account && email) {
      toast.success('🦄 Wow so easy!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log("success")
    } else {
      console.log("empty")
      console.log(name, gender, address, phone, account, email);
    }
  }
  return (
    <div className='h-screen overflow-y-auto'>
      <div className=''>
        <div className='flex flex-col justify-center items-center'>
          <section className='flex flex-col gap-4 mt-8 border-4 border-black rounded-sm p-4 bg-[#c4cfc9]'>
            <p>Personal information:</p>
            <form className='flex flex-col gap-3 w-80 '>
              <label htmlFor="">Full Name</label>
              <input type="text" required onChange={e => setName(e.target.value)} />
              <label htmlFor="">date of Birth</label>
              <input type="date" required onChange={e => setDate(e.target.value)} />
              <label htmlFor="">Gender</label>
              <select name="gender" id="" onChange={e => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="male">Female</option>
              </select>
              <label htmlFor="">Address</label>
              <input type="text" required onChange={e => setAddress(e.target.value)} />
              <label htmlFor="">Phone number</label>
              <input type="tel" required onChange={e => setPhone(e.target.value)} />
              <label>Account type</label>
              <select onChange={e => setAccount(e.target.value)}>
                <option value="patient">patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Lab">patient</option>
              </select>
              <label htmlFor="">Email Address</label>
              <input type="email" required onChange={e => setEmail(e.target.value)} />
              <input type='submit' className='bg-black p-1 hover:bg-slate-600 text-white font-bold rounded-lg cursor-pointer' onClick={onsubmit} />
              <ToastContainer />
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Registraton
