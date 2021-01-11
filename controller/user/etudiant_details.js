import pkg from '@prisma/client';
const {PrismaClient} = pkg;


const prisma = new PrismaClient();


export const findAllEtudiant_details = async  (req, res) =>{
    var dataRetrieved;
    try{
        dataRetrieved = await prisma.etudiant_details.findMany();
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
 * @returns {Promise<void>} retuen a promise
 */

export const addEtudiantDetails =async  (req, res) =>{
    let user ;
    try{
        user =  await prisma.etudiant_details.create({
            data: {
                username: req.body.username,
                name: req.body.name,
                prenom: req.body.prenom,
                ecole: req.body.ecole,
                filiere: req.body.filiere,
                cv: req.body.cv

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

export const deleteEtudiantDetails = async (req, res ) =>{
    let user,exep
    try
    {
        user = await prisma.etudiant_details.delete({
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

export const updateEtudiantDetails = async (req, res ) =>{
    let user,exep
    try
    {
        user = await prisma.etudiant_details.update({
            where : {username: req.body.username},
            data:{
                name: req.body.name,
                prenom: req.body.prenom,
                ecole: req.body.ecole,
                filiere: req.body.filiere,
                cv: req.body.cv
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
