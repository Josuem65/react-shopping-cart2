import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, addToFiltered } from '../products/productsSlice'

export default function SizeChart() { 
    const dispatch = useDispatch()
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    let sizeObjects = []
    for(let i=0; i < sizes.length; i++) {
        sizeObjects.push({key: i, value: sizes[i], toggled: 0})
    }
    const [ currState, setCurrState ] = useState(sizeObjects)

    function handleSize(size, index) {
        const selectedSize = currState.find((item) => item.value == size)
        if(!selectedSize.toggled) {
            const restOfArr = currState.filter((item) => item.value !== size)
            const updatedItem = {...selectedSize, toggled: 1}
            setCurrState([...restOfArr, updatedItem])
        } else if(selectedSize.toggled) {
            console.log(selectedSize)
            const restOfArr2 = currState.filter((item) => item.value !== size)
            const updatedItem2 = {...selectedSize, toggled: 0}
            setCurrState([...restOfArr2, updatedItem2])
        }
    }
    
    const selectedArr = currState.filter((item) => item.toggled === 1).map((x) => x.value)
    useEffect(() => {
        dispatch(addToFiltered(selectedArr))
        console.log(selectedArr)
    }, currState)
    
    return (
        <div>
          <h3>Sizes:</h3>
          <div>
            {sizes.map((size, index) => {
                let thisObj = currState.find((x) => x.key == index)
                return <button className={thisObj.toggled ? 'sizeBtn toggled': 'siztBtn'} onClick={() => handleSize(size, index)}>{size}</button>
            })}
          </div>
        </div>
    )
}