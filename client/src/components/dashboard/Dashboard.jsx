import Agefilter from './Agefilter.jsx'
import Regionfilter from './Regionfilter.jsx'
import Skillsfilter from './Skillsfilter.jsx'
import React, { Component } from 'react'

export class Dashboard extends Component {
  static propTypes = {}

  render() {
    return (
      <>
      
      <Skillsfilter/>
      <Agefilter/>
      <Regionfilter/>
      </>
    )
  }
}

export default Dashboard