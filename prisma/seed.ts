import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const doctors = [
        {
            name: 'Dr. Gregory House',
            specialty: 'Diagnostic Medicine',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=House',
        },
        {
            name: 'Dr. Stephen Strange',
            specialty: 'Neurosurgery',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Strange',
        },
        {
            name: 'Dr. Meredith Grey',
            specialty: 'General Surgery',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grey',
        },
        {
            name: 'Dr. Shaun Murphy',
            specialty: 'Surgery',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Murphy',
        },
    ]

    console.log('Start seeding...')
    for (const doctor of doctors) {
        const d = await prisma.doctor.create({
            data: doctor,
        })
        console.log(`Created doctor with id: ${d.id}`)
    }
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
