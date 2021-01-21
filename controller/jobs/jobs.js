import pkg from '@prisma/client';
const {PrismaClient} = pkg;


const prisma = new PrismaClient();


export const findAllJobs = async  (req, res) =>{
    var dataRetrieved;
    try{
        dataRetrieved = await prisma.jobs.findMany();
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

export const addJob =async  (req, res) =>{
    let job ;
    try{
        job =  await prisma.jobs.create({
            data: {

                id_job: req.body.id_job,
                id_entreprise: req.body.id_entreprise,
                title_job: req.body.title_job,
                description_job: req.body.description_job,
                tags: req.body.tags,
                ville: req.body.ville,
                profil:req.body.profil


            }
        })
    }catch (e) {
        console.error(e)
    }
    finally {
        await prisma.$disconnect()
    }
    await res.send(job?true:false)
}

/**
 * @return return the id of the job deleted
 */

export const deleteJob = async (req, res ) =>{
    let job,exep
    try
    {
        job = await prisma.jobs.delete({
            where : {
                id_job: req.body.id_job,
            }

        })


    }catch (e) {
        exep=e;

    }
    finally {
        await prisma.$disconnect()
    }
    res.send(job?job:exep)
}




/**
 * @param req the params is the username and new role
 * @return return the usrname of the user is updated
 */

export const updateJob = async (req, res ) =>{
    let job,exep
    try
    {
        job = await prisma.jobs.update({
            where : {id_job: req.body.id_job,},
            data: {
                id_entreprise: req.body.id_entreprise,
                title_job: req.body.title_job,
                description_job: req.body.description_job,
                tags: req.body.tags,
                ville: req.body.ville,
                profil:req.body.profil

            }

        })


    }catch (e) {
        exep=e;

    }
    finally {
        await prisma.$disconnect()
    }
    res.send(job?job:exep)
}
