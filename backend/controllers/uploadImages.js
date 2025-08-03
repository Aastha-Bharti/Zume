import fs from 'fs'
import path from 'path'

import Resume from '../models/resumeModel.js'
import upload from '../middleware/uploadMiddleware.js'

export const uploadResumeImage = async (req,res) => {
    try {
        //CONFIGURE MULTER TO HANDLE IMAGES
        upload.fields([ { name: "thumbnail"} , {name: "profileImage"}])
        (req, res , async(err) => {
            if(err){
                return res.status(400).json({ message: "File upload failed", error: err.message})
            }

            const resumeId = req.params.id
            const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id})

            if(!resume){
                return res.status(404).json({message: "Resume not found or unauthorized."})
            }

            //USE PROCESS CWD TO LOCATE THE UPLOADS FOLDER
            const uploadsFolder = path.join(process.cwd() , 'uploads')
            const baseUrl = `${req.protocol}://${req.get("host")}`

            const newThumbnail = req.files.Thumbnail?.[0]
            const newProfileImage = req.files.profileImage?.[0]

            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink))
                    if(fs.existsSync(oldThumbnail)){
                        fs.unlinkSync(oldThumbnail)
                    }
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`
            }

            //FOR PROFILEPREVIEW IMAGE
            if(newProfileImage){
                if(resume.profileInfo?.profilePreviewUrl){
                    const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl))
                    if(fs.existsSync(oldProfile)){
                        fs.unlinkSync(oldProfile)
                    }
                }
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`
            }

            await resume.save()
            res.status(200).json({
                message: "Image uploaded successfully.",
                thumbnailLink : resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo.profilePreviewUrl
            })

        })
    } catch (err) {
        console.error("Error uploading images :" , err)
        res.status(500).json({ 
            message: " Failed to upload images",
            error: err.message})
        
    }
    
}