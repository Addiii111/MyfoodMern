import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Cards(props) {
  let data = useCart()
  let dispatch = useDispatchCart()
  const priceRef = useRef()
  let options = props.options
  let priceoptions = Object.keys(options)
  let foodItem = props.foodItem
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('')

  const handelAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item
        break
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: 'UPDATE',
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        })
        return
      } else if (food.size !== size) {
        await dispatch({
          type: 'ADD',
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: foodItem.img,
        })

        return
      }
      return
    }

    await dispatch({
      type: 'ADD',
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: foodItem.img,
    })
  }
  let finalPrice = qty * parseInt(options[size])
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  return (
    <div>
      <div>
        <div
          className='card mt-3'
          style={{ width: '18rem', maxHeight: '360px' }}
        >
          <img
            src={props.foodItem.img}
            className='card-img-top'
            alt='...'
            style={{ height: '150px', objectFit: 'fill' }}
          />
          <div className='card-body'>
            <h5 className='card-title'>{props.foodItem.name}</h5>
            {/* <p className='card-text'>My favourite food.</p> */}
            <div className='container w-100'>
              <select
                className='m-2 h-100  bg-success rounded'
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  )
                })}
              </select>
              <select
                className='m-2 h-100  bg-success rounded'
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceoptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  )
                })}
              </select>

              <div className='d-inline h-100 fs-5'>{finalPrice}/-</div>
            </div>
            <hr />
            <button
              className='btn btn-success justify-center ms-2'
              onClick={handelAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
