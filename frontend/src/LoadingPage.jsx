import React from 'react'

import load from './images/load.gif'
const LoadingPage = ({rusevi}) => {
  return (
    <div className='container'>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='text-center loading-page  p-5 rounded-4'>
          {/* <div className='d-flex justify-content-center align-items-center mt-1'>
          <img src={rusevi} alt="Logo" className='ruseviLoad' />
          <h2 className='ruseviLoadYazi ms-2 text-capitalize'>Русский дом в Анкаре</h2>
          </div> */}
          <h2 className='text-capitalize mb-4'>
          сайт сейчас откроется
          </h2>
          <img src={load} alt="Loading" className='doner' />
          <p className='text-center mb-3 mt-2 loadYazi'>Идет загрузка. Не закрывайте, проверьте интернет.</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
