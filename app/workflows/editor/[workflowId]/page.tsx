import { waitFor } from '@/lib/helper/waitFor'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import Editor from '../../_components/Editor'

export default async function page({
  params
}: {
  params: { workflowId: string }
}) {
  const { workflowId } = params
  const { userId } = auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const workflow = await prisma.workFlow.findUnique({
    where: {
      id: workflowId,
      userId
    }
  })

  if (!workflow) {
    notFound()
  }

  return <Editor workflow={workflow} />
}

