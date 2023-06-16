import React from 'react'

const Instruction = () => {

  const content = [
    '1. Download the format file and fill it with proper data.',
    '2. You can download the example file to understand how the data must be filled.',
    '3. Once you have downloaded and filled the format file, Upload it in the form below and submit.',
    '4. After uploading products you need to edit them and set product images and choices.',
    '5.You can get brand and category id from their list, Please input the right ids.', 
    '6.You can get brand and category id from their list, Please input the right ids.'
  ];

  return (
    <div className='card card-body '>
        <h1 className='display-5 font-semibold text-xl'>
            Instructions:
        </h1>
       {
          content.map((item) => (
            <p className='leading-loose m-2' key={item}>{item}</p>

          ))
       }
       
    </div>
  )
}

export default Instruction