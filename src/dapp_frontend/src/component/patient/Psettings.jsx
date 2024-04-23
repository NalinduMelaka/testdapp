import React from 'react'

const Psettings = ({ onUpdate, userdata, setUserdata }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className='w-full mb-14 mt-12'>
      <div className='flex flex-row gap-8 w-2/3 my-4'>
        <label htmlFor="" >First Name</label>
        <input type="text" name='firstname' className='border-2 border-black' value={userdata?.firstname
        } onChange={handleChange} />
        <label htmlFor="">Last Name</label>
        <input type="text" name='lastname' className='border-2 border-black' value={userdata?.lastname
        } onChange={handleChange} />
      </div>
      <div className='flex flex-row gap-8 w-2/3 my-4'>
        <label htmlFor="">Phone number</label>
        <input type="text" name='phone' className='border-2 border-black' value={userdata?.
          phone
        } onChange={handleChange} />
        <label>Address</label>
        <input type="text" name='address' className='border-2 border-black' value={userdata?.address} onChange={handleChange} />
      </div>
      <button className='border border-black rounded-md p-1 bg-blue-300' onClick={onUpdate}>Update</button>
    </div>
  )
}

export default Psettings
