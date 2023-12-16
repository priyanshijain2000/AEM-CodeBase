import './NoTestCentersMessage.scss'
import { ReactComponent as GlobalSitesIcon } from './bell-icon.svg'
import { useEffect, useState } from 'react'


export function NoTestCentersMessage({
  returnToStep,
}: {
  returnToStep: () => void
}) {

  const [messageClose, setMessageClose] = useState(false)

  const messageHandler = () => {
    setMessageClose(true);
  };

  const closeFn = (e: { keyCode: number }) => {
    if(e.keyCode === 27){
      messageHandler();      
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeFn)
  return () => window.removeEventListener('keydown', closeFn)
  }, [])

  return (
    <>
      {!messageClose && <div className="no-options-placeholder">
        <GlobalSitesIcon />
        <div>
          <p><b>We were unable to find any results that match your search</b></p>
          <p>Consider refining your search criteria to improve results. Thank you.</p>
          <button className='buttonLink' onClick={returnToStep}>Change the area and date range</button>
        </div>
        <button className='closeMessage' onClick={messageHandler} aria-label="Close Message"><span className="material-icons">close</span></button>
    </div>}
  </>
  )
}
