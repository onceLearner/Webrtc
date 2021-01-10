import pkg from '@prisma/client';
const {PrismaClient} = pkg;


const prisma = new PrismaClient();


export const findAllAdmin_entreprise= async  (req, res) =>{
    var dataRetrieved;
    try{
        dataRetrieved = await prisma.admin_entreprise.findMany();
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
 * @param req icoming request
 * @param res
 * @returns {Promise<void>} return a promise
 */

export const addAdminEntreprise=async  (req, res) =>{
    let user ;
    try{
        user =  await prisma.admin_entreprise.create({
            data: {
                username: req.body.username,
                name: req.body.name,
                prenom: req.body.prenom,
                entreprise_id: req.body.entreprise_id,
                post: req.body.post,


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

export const deleteAdminEntreprise = async (req, res ) =>{
    let user,exep
    try
    {
        user = await prisma.admin_entreprise.delete({
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

export const updateAdminEntreprise = async (req, res ) =>{
    let user,exep
    try
    {
        user = await prisma.admin_entreprise.update({
            where : {username: req.body.username},
            data:{
                name: req.body.name,
                prenom: req.body.prenom,
                entreprise_id: req.body.entreprise_id,
                post: req.body.post,

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
