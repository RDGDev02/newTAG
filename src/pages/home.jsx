import React from 'react'
import styles from '../style'
import { Navbar , Hero } from '../components'
import ParticleBg from '../components/ParticleBg'

const App = () => {
  return (
   <>
 
      <ParticleBg />
      <div className={`${styles.paddingX} ${styles.flexCenter} w-full fixed z-10 shadow-md backdrop-filter backdrop-blur-lg`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`bg-transparent ${styles.flexStart} pt-16`}>
        <div className={` ${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      <div className={`bg-transparent ${styles.flexStart}`}>
        <div className={` ${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      
      
      <div className={`bg-transparent ${styles.paddingX} ${styles.flexStart}`}>
        <div className={` ${styles.boxWidth}`}>
          Story
          Benefits
          Billing
          CardDeal
          Footer
        </div>
      </div>

    </>
  )
}

export default App