import { executionPhase } from "@prisma/client";

type Phase = Pick<executionPhase,"creditsConsume">
export function GetPhasesTotalCost(phases:Phase[]){
    return phases.reduce((acc, phase) => 
        acc + (phase.creditsConsume || 0),0)
}