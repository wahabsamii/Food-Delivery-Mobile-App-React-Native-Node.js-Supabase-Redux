import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import HomeHeader from '../components/HomeHeader'
import PromoBanner from '../components/PromoBanner'
import Categories from '../components/Categories'
import PopularFoods from '../components/PopularFoods'
import Recommended from '../components/Recommended'
import FastDelivery from '../components/FastDelivery'

const Home = () => {
  return (
    <ScrollView>
      <HomeHeader/>
      <PromoBanner />
        <Categories />
        <PopularFoods />
        {/* <Recommended /> */}
        <FastDelivery />
    </ScrollView>
  )
}

export default Home