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



// find a  single user

export const findsingleUser = async  (req, res) =>{
    var dataRetrieved;
    try{
        dataRetrieved = await prisma.users.findUnique({
            where:{
                username: req.body.username,
                password: req.body.password,
                role : req.body.role
            }

        });
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await prisma.$disconnect()
    }

    res.send(dataRetrieved?true:false)

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
                username: req.body.username,
                role: req.body.role


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

/**
 * @return return the usrname of the user delted
 */

export const deleteUser = async (req, res ) =>{
    let user,exep
    try
    {
        user = await prisma.users.delete({
            where : {
                username: req.body.username
            }

        })


    }catch (e) {
        exep=e;
        
    }
    finally {
        await prisma.$disconnect()
    }
    res.send(user?user:exep)
}


/**
 * @param req the params is the username and new role
 * @return return the usrname of the user is updated
 */

export const updateUser = async (req, res ) =>{
    let user,exep
    try
    {
        user = await prisma.users.update({
            where : {username: req.body.username},
            data:{role:req.body.role}

        })


    }catch (e) {
        exep=e;

    }
    finally {
        await prisma.$disconnect()
    }
    res.send(user?user:exep)
}
