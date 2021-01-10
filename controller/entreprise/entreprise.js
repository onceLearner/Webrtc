import pkg from '@prisma/client';
const {PrismaClient} = pkg;


const prisma = new PrismaClient();


export const findAllEntreprises = async  (req, res) =>{
    var dataRetrieved;
    try{
        dataRetrieved = await prisma.entreprise.findMany();
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
 * @param req
 * @param res
 * @returns {Promise<void>} retuen a promise
 */

export const addEntreprise =async  (req, res) =>{
    let entrepise ;
    try{
        entrepise =  await prisma.entreprise.create({
            data: {

                id_entreprise : req.body.id_entreprise,
                username_admin : req.body.username_admin,
                title_entrepise : req.body.title_entrepise,
                domaine : req.body.domaine,
                code_conf : req.body.code_conf,
                interests : req.body.interests,
                description : req.body.description

            }
        })
    }catch (e) {
        console.error(e)
    }
    finally {
        await prisma.$disconnect()
    }
    await res.send(entrepise?true:false)
}

/**
 * @return return the id of the entrepise deleted
 */

export const deleteEntreprise = async (req, res ) =>{
    let entrepise,exep
    try
    {
        entrepise = await prisma.entreprise.delete({
            where : {
                id_entreprise : req.body.id_entreprise,
            }

        })


    }catch (e) {
        exep=e;

    }
    finally {
        await prisma.$disconnect()
    }
    res.send(entrepise?entrepise:exep)
}




/**
 * @param req the params is the username and new role
 * @return return the usrname of the user is updated
 */

export const updateEntreprise = async (req, res ) =>{
    let entrepise,exep
    try
    {
        entrepise = await prisma.entreprise.update({
            where : {id_entreprise : req.body.id_entreprise,},
            data:{
                username_admin : req.body.username_admin,
                title_entrepise : req.body.title_entrepise,
                domaine : req.body.domaine,
                code_conf : req.body.code_conf,
                interests : req.body.interests,
                description : req.body.description
            }

        })


    }catch (e) {
        exep=e;

    }
    finally {
        await prisma.$disconnect()
    }
    res.send(entrepise?entrepise:exep)
}
