import messageError from '../helpers/recruiter/messageError.js';
import applicantsSchema from '../models/applicantsModel.js';
import levelEnglishesSchema from '../models/levelEnglishesModel.js';
import senioritiesSchema from '../models/senioritiesModel.js';
import socialMediaSchema from '../models/socialMediaModel.js';
//import technologiesSchema from '../models/technologiesModel.js';

const postApplicants = async (req, res) => {

    try {

        const {
            name,
            last_name,
            email,
            available,
            remuneration,
            description,
            image,
            level_englishes_id,
            seniorities_id,
            technologies_id,
            social_media
        } = req.body


        const newApplicant = await applicantsSchema.create({
            name,
            last_name,
            email,
            available,
            remuneration,
            description,
            image,
            level_englishes_id,
            seniorities_id,
            technologies_id
        })

        const { facebook, instagram, linkedin } = social_media;

        const { id } = newApplicant;

        await socialMediaSchema.create({
            id_postulant: id,
            facebook,
            instagram,
            linkedin
        })

        res.json({
            message: 'Postulant created',
            newApplicant
        })

    } catch (e) {
        res.status(401).json({ error: true, message: 'Error at create a postulant' });
        messageError().catchError('Post', 'postulant', e)
    }

}

const getAtpplicants = async (req, res) => {
    try {

        //console.log(senioritiesSchema)

        const applicants = await applicantsSchema.findAll({
            include: [
                {
                    model: socialMediaSchema
                },
                {
                    model: senioritiesSchema
                },
                {
                    model: levelEnglishesSchema
                }
            ]
        });

        res.json({
            applicants
        })

    } catch (e) {
        res.status(404).json({
            error: true,
            messageError: 'Catch Error'
        })
        messageError().catchError('Get', 'postulant', e);
    }
}


export {
    postApplicants,
    getAtpplicants
}