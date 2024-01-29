import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import addPostImg from '../../assets/file-upload.svg'
import { Button } from '../ui/button';
import { cn } from "@/lib/utils"


interface FileUploaderProps {
    fieldChange: (files: File[]) => void;
    mediaUrl: string,
    className?:string
}

const FileUploader: React.FC<FileUploaderProps> = ({ fieldChange, mediaUrl ,className=''}) => {

    const [fileUrl, setFileUrl] = useState<string>(mediaUrl || '');
    const [file, setFile] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.gif']
        }
    })
    // 'flex-1 h-[95%] w-full object-cover p-2'
    return (
        <div {...getRootProps()} className='h-full flex-center border-2 border-light-4 rounded-xl'>

            <input {...getInputProps()} />
            {
                fileUrl ?
                    <div className={cn('flex flex-col px-2 h-[400px] w-full flex-center',className)}>
                        <img className={cn('flex-1 h-[300px] w-full object-cover p-2',className && 'rounded-full flex-[0] w-[300px] scale-75 md:scale-100')} src={fileUrl} />
                        <p className='text-light-3 text-center pt-2'> Click or drag img to replace</p>
                    </div> :
                    <div className='h-80 flex-center flex-col'>
                        <img src={addPostImg} />
                        <p className='text-light-4 text-sm mb-4'>svg,png,jpg,jpeg</p>
                        <p className='text-light-3 text-center'>Drag 'n' drop your image, or click to select files</p>
                        <Button className='shad-button_dark_4 m-2'>Browse from PC</Button>
                    </div>
            }
        </div>
    )
}

export default FileUploader
