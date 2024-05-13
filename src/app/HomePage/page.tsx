import React from 'react'
import HeroCard from './HeroCard'
import AboutUs from './AboutUs'
import MenuItems from './MenuItems'
import SpecialSelection from './SpecialSelection'

const HomeLayout = () => {
  return (
    <div>
      <HeroCard />
      <AboutUs />
      <SpecialSelection/>
      <MenuItems />
      
    </div>
  )
}

export default HomeLayout