import React from 'react'
import { Helmet } from 'react-helmet-async'

const Metadata = ({title}) => {
  return (
   <Helmet>
    <title>
        {`${title} -aks cart`}
    </title>
   </Helmet>
  )
}

export default Metadata