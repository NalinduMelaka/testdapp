import React from 'react'

const Dsettings = ({ onUpdate, userdata, setUserdata }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className='w-full mb-14 mt-12'>
      <div className='flex flex-row gap-8 w-2/3 my-4'>
        <label htmlFor="">First Name</label>
        <input type="text" className='border-2 border-black' name='firstname' value={userdata?.firstname
        } onChange={handleChange} />
        <label htmlFor="">Last Name</label>
        <input type="text" className='border-2 border-black' name='lastname' value={userdata?.lastname
        } onChange={handleChange} />
      </div>
      <div className='flex flex-row gap-8 w-2/3 my-4'>
        <label htmlFor="">Phone number</label>
        <input type="text" className='border-2 border-black' name='phone' value={userdata?.
          phone
        } onChange={handleChange} />
        <label>Medical licence</label>
        <input type="text" className='border-2 border-black' name='medicallicence' value={userdata?.medicallicence} onChange={handleChange} />
      </div>
      <button className='border border-black rounded-md p-1 bg-blue-300' onClick={onUpdate}>Update</button>
    </div>
  )
}

export default Dsettings
