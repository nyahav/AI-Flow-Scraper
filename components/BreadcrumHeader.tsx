"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
 } from './ui/breadcrumb'

function BreadcrumHeader() {
    const pathName = usePathname()
    const paths = pathName ==="/"? [""]:pathName.split("/")
  return (
    <div className='flex items-center flex-start'>
        <Breadcrumb>
        <BreadcrumbList>
        </BreadcrumbList>{paths.map((path,index)=> (
            <React.Fragment key={index}>
                <BreadcrumbItem>
                    <BreadcrumbLink className='capitalize' href={`/${path}`}>
                        {path === "" ? "home " : path}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </React.Fragment>
        ))}</Breadcrumb>
        </div>
  )
}

export default BreadcrumHeader