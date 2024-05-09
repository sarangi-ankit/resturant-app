import React from 'react'
import HeroCard from './HeroCard'
import AboutUs from './AboutUs'
import BestSeller from './BestSeller'

const HomeLayout = () => {
  return (
      <div>
          <HeroCard />
          <AboutUs />
          <BestSeller/>
    </div>
  )
}

export default HomeLayout