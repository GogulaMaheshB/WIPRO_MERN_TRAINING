import React from 'react'
import {useState} from 'react'

function InventoryCard(props) {
    const [showPrice, setShowPrice] =useState(false);
  return (
    
      <div>
      <h3>{props.name}</h3>
      <p>Category: {props.category}</p>
      <button onClick={() => setShowPrice(!showPrice)}>
        {showPrice ? 'Hide Price' : 'Show Price'}
      </button>

      {showPrice && <p>Price: ₹{props.price}</p>}
      <hr />
    </div>
    
  )
}

export default InventoryCard
