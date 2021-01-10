import pkg from '@prisma/client';
const {PrismaClient} = pkg;


const prisma = new PrismaClient();


export const findAllUserSocials = async  (req, res) =>{
    var dataRetrieved;
    try{
        dataRetrieved = await prisma.user_socials.findMany();
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

export const addUserSocials =async  (req, res) =>{
    let user ;
    try{
        user =  await prisma.user_socials.create({
            data: {


                username: req.body.username,
                linkedin: req.body.linkedin,
                twitter : req.body.twitter


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

export const deleteUserSocials = async (req, res ) =>{
    let user,exep
    try
    {
        user = await prisma.user_socials.delete({
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
 * @param req the params is the username , twitter, linkedin
 * @return return the username of the user is updated
 */

export const updateUserSocials = async (req, res ) =>{
    let user,exep
    try
    {
        user = await prisma.user_socials.update({
            where : {username: req.body.username},
            data:{linkedin: req.body.linkedin,
                twitter : req.body.twitter}

        })


    }catch (e) {
        exep=e;

    }
    finally {
        await prisma.$disconnect()
    }
    res.send(user?user:exep)
}
