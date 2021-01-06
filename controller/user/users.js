import pkg from '@prisma/client';
const {PrismaClient} = pkg;


const prisma = new PrismaClient();


export const findAllUsers = async  (req, res) =>{
    var dataRetrieved;
    try{
        dataRetrieved = await prisma.users.findMany();
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await prisma.$disconnect()
    }

    res.send(dataRetrieved)

}


/**
 *
 * @param req icoming request with username and password
 * @param res
 * @returns {Promise<void>} retuen a promise
 */

export const addUser =async  (req, res) =>{
    let user ;
    try{
        user =  await prisma.users.create({
            data: {

                password: req.body.password,
                username: req.body.username


            }
        })
    }catch (e) {
        console.error(e)
    }
    finally {
        await prisma.$disconnect()
    }
    await res.send(user?true:false)
}
