"use client"

import { getAvailableCredits } from '@/actions/billing/getAvailiableCredits'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Coins, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { use } from 'react'
import ReactCountUpWrapper from './ReactCountUpWrapper'
import { buttonVariants } from './ui/button'

function UserAvailbleCreditsBadge() {
    const query = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: () => getAvailableCredits(),
    refetchInterval: 30* 1000, // 30 seconds

    })

  return (
    <Link href={"/billing"} className={cn("w-full space-x-2 items-center", buttonVariants({variant:"outline"}))}>
        <Coins size={20} className='text-primary' />
        <span className="font-semibold capitalize">
            {query.isLoading && <Loader2Icon className='animate-spin w-4 h-4' />}
            {!query.isLoading && query.data  && <ReactCountUpWrapper value={query.data}/>}
            {!query.isLoading && !query.data  && "-"}
        </span>
    </Link>
  )
}

export default UserAvailbleCreditsBadge