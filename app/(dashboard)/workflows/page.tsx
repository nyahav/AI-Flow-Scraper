
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'
import { Alert,AlertDescription,AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { GetWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser'
function page() {
    return (
        <div className='flex-1 flex flex-col h-full'>
            <div className="flex justify-between">
                <div className="flex-col flex">
                    <h1 className='text-3xl font-bold'>Workflows</h1>
                    <p className="text-muted-foreground">
                        Manage your workflows
                    </p>
                </div>
            </div>

            <div className="h-full py-6">
                <Suspense fallback={<UserWorkflowsSkeleton />}>
                    <UserWorkFlows />
                </Suspense>
            </div>
        </div>
    )
}


function UserWorkflowsSkeleton(){
    return <div className="space-y-2">
        {
           [1,2,3,4].map(i => <Skeleton  key={i} className='h-32 w-full'/>) 
        }
    </div>
}

async function UserWorkFlows(){
    const workflows = await GetWorkflowsForUser();
    //await waitFor(3000);
    if(!workflows){
        return(
        <Alert variant={"destructive"}>
            <AlertCircle className='w-4 h-4'/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Something went wrong. Please try again later
            </AlertDescription>
        </Alert>
        )
    }
    return <div className=""></div>
}
export default page