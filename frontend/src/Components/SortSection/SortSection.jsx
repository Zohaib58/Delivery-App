import { useContext } from 'react'
import React from 'react'
import { SortingContext } from '../../context/SortingContext'
import './style.css'

const SortSection = () => {
  const [setSortCriteria] = useContext(SortingContext)

  const handleAscendingAlpha = () => {
    setSortCriteria("A - Z")
  }

  const handleDescendingAlpha = () => {
    setSortCriteria("Z - A")
  }

  const handleAscendingPrice = () => {
    setSortCriteria("Low - High")
  }

  const handleDescendingPrice = () => {
    setSortCriteria("High - Low")
  }

  return (
    <div className='sort-section'>
      <button onClick={handleAscendingAlpha}>A-Z</button>
      <button onClick={handleDescendingAlpha}>Z-A</button>
      <button onClick={handleDescendingPrice}>High - Low</button>
      <button onClick={handleAscendingPrice}>Low - High</button>
    </div>
  )
}

export default SortSection