"use client"
import React, { useEffect, useState } from 'react'
import Countup from 'react-countup'
function ReactCountUpWrapper({value}:{value:number}) {

    const [mounted, setMounted] = React.useState(false)
    useEffect(() => {
        setMounted(true)
    },[])
    if(!mounted) {
        return "-"
    }
  return (
    <Countup duration={0.5} preserveValue end={value} decimals={0}/>
  )
}

export default ReactCountUpWrapper