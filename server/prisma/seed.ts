import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '0735cjvr-d039-4194-9571-01ba2ca0efbd'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = 'ahhgccgk-d039-4194-9571-01cc2dd0efbd'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

async function run() {
    await prisma.habit.deleteMany()
    await prisma.day.deleteMany()

    /**
     * create habits
     */

    await Promise.all([
        prisma.habit.create({
            data: {
                id: firstHabitId,
                title: 'Beber 2L água',
                created_at: firstHabitCreationDate,
                weekDays:{
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 }
                    ]
                }
            }
        }),
        prisma.habit.create({
            data: {
                id: secondHabitId,
                title: 'Exercitar',
                created_at: secondHabitCreationDate,
                weekDays:{
                    create: [
                        { week_day: 3 },
                        { week_day: 4 },
                        { week_day: 5 }
                    ]
                }
            }
        }),
        prisma.habit.create({
            data: {
                id: thirdHabitId,
                title: 'Dormir 8h',
                created_at: thirdHabitCreationDate,
                weekDays:{
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                        { week_day: 4 },
                        { week_day: 5 }
                    ]
                }
            }
        }),
    ])

    /**
     * Habits (Complete/Available): 1/1
     */

    await Promise.all([
        prisma.day.create({
            data: {
                /** Monday */
                date: new Date('2023-01-02T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    }
                }
            }
        }),

        /**
         * Habits (Complete/Available): 1/1
         */
        prisma.day.create({
            data: {
                /** Friday */
                date: new Date('2023-01-06T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    }
                }
            }
        }),

        /**
         * Habits (Complete/Available):2/2
         */
        prisma.day.create({
            data: {
                /** Wednesdy */
                date: new Date('2023-01-04T03:00:00.000z'),
                dayHabits: {
                    create: [
                        { habit_id: firstHabitId },
                        { habit_id: secondHabitId }
                    ]
                }
            }
        }),
    ])

    // await prisma.habit.create({
    //     data: {
    //         title: 'Beber 2L de Água',
    //         created_at: new Date('2023-01-10T00:00:00.000z')
    //     }
    // })
}

run().then(async  ()=> {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })