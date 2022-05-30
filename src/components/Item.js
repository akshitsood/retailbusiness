import {Button} from 'antd'
import React from 'react'

import {useDispatch} from 'react-redux'
function Item({ item }) {
  console.log(item)
  const dispatch = useDispatch()
  function addToCart() 
  {
  dispatch({type:'addToCart', payload:{...item,quantity:1}})
  
  }
  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} alt="" height='100' width='100' />
      <h4 className='price'><b>Price: Rs.{item.price} {item.category != "Snacks" ? "/Kg" : ""}</b></h4>
      <div className="d-flex justify-content-end">
        <Button className='onhover' onClick={() => addToCart()}> Add to Cart</Button>
      </div>
    </div>

  )
}

export default Item