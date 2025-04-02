"use client"

import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/getWorkflowExecutionWithPhases'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>

export function ExecutionViewer({initialData}:{initialData:ExecutionData}) {
  
  const query= useQuery({
    queryKey:["execution", initialData?.id],
    initialData,
  })

    return (
    <div>ExecutionViewer</div>
  )
}

export default ExecutionViewer