import React from 'react'

/**chứa trang user, product detail, search products*/
const Container = (props) => {
  return (
    <div className='container'>
        {props.children}
    </div>
  )
}

export default Container