import React from 'react';
//import { Label, Box, DropZone } from 'admin-bro';
import { Box, Label, DropZone, DropZoneItem } from '@admin-bro/design-system';
//import Label from 'admin-bro'

//import { Label, Box, DropZone } from 'admin-bro'
const Edit = (props) => {
    const { property, onChange, record } = props
    const mimeTypes = ['image/png']
    const maxSize = 1024 * 100
    const onUpload = (files) => {
        //alert(files[0].name,length ? files[0].name : 'no files' ) 
        //onChange('profilePhotoLocation', files[0].name)  }
        onChange(property.name, files[0])
    }

    const uploadedPhoto = record.params.profilePhotoLocation
    const photoToUpload = record.params[property.name]

    return (
        <Box>
            <Label>{property.label}</Label>

            <DropZone
                onChange={onUpload}
                validate={{ maxSize, mimeTypes }}
               
            ></DropZone>
             {uploadedPhoto && !photoToUpload && (
                    <DropZoneItem src={uploadedPhoto} />
                )}
        </Box>
    )
}



export default Edit