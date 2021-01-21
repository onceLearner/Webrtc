import pkg from '@prisma/client';
const {PrismaClient} = pkg;
import fs from "fs"


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
 */

export const findsingleEntreprise= async  (req, res) =>{
    var dataRetrieved;
    try{
        dataRetrieved = await prisma.entreprise.findMany({
            where:{
                id_entreprise:req.params.id_entreprise
            }

        });
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await prisma.$disconnect()
    }

    res.send(dataRetrieved?dataRetrieved:false)

}





/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>} retuen a promise
 */

export const addEntreprise =async  (req, res) =>{
    let entreprise ;
    try{
        entreprise =  await prisma.entreprise.create({
            data: {

                id_entreprise : req.body.id_entreprise,
                username_admin : req.body.username_admin,
                title_entreprise : req.body.title_entreprise,
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
    await res.send(entreprise?true:false)
}

/**
 * @return return the id of the entreprise deleted
 */

export const deleteEntreprise = async (req, res ) =>{
    let entreprise,exep
    try
    {
        entreprise = await prisma.entreprise.delete({
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
    res.send(entreprise?entreprise:exep)
}




/**
 * @param req the params is the username and new role
 * @return return the usrname of the user is updated
 */

export const updateEntreprise = async (req, res ) =>{
    let entreprise,exep
    try
    {
        entreprise = await prisma.entreprise.update({
            where : {id_entreprise : req.body.id_entreprise,},
            data:{
                username_admin : req.body.username_admin,
                title_entreprise : req.body.title_entreprise,
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
    res.send(entreprise?entreprise:exep)
}


// get entreprise image

export  const getEntrepriseImg = async(req, res) =>{
    let entrepriseId =req.params.id_entreprise
    let exep,file;

     fs.readFile(`assets/images/${entrepriseId}.jpg` , (err, data ) => {
         if(err) res.status(500).send(err);
         res.send(data)
     })


}