import {PrismaClient} from '@prisma/client'

const prismaClientSingletion =() => {
return new PrismaClient()
}

declare const globalThis: {
    prismaGlobal:ReturnType<typeof prismaClientSingletion>

} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingletion()

export default prisma

if(process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma