import React from 'react'
import useMetaArgs from '../../hooks/useMeta';

export default function Contact() {

  useMetaArgs({
      title: "Contact, Clinicare",
      description: "Wellcome to your clinicare, contact us",
      keywords: "Health, clinic, Hospital",
    });
  return (
    <>
    
<div className='mt-50 container mx-auto '>
    <div className='flex items-center justify-center'>
    <img src="../../../public/Contact-us.svg" alt="" className='w-90 mb-7'/>
    </div>
    <div className='text-center'>
    <h1 className='font-bold text-3xl'>Contact Us</h1>
    <p className='mb-1'>Email: clinicare@gmail.com</p>
    <p>Phone: +234 123 456 789</p>
    </div>
</div>
    
    
    </>
  )
}
