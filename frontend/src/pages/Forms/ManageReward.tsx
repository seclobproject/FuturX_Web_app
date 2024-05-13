import { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { setPageTitle } from '../../store/themeConfigSlice';
import { clearUploadData, uploadImage } from '../../store/adminSlice';
import { useAppDispatch, useAppSelector } from '../../store';

const ManageReward = () => {
    const dispatch = useAppDispatch();

    const { data: uploadedData } = useAppSelector((state: any) => state.uploadImageReducer);

    useEffect(() => {
        dispatch(setPageTitle('Upload Reward'));
    });

    const [codeArr, setCodeArr] = useState<string[]>([]);

    const [file, setFile] = useState<File | null>(null);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const [images, setImages] = useState<any>([]);
    // const [images2, setImages2] = useState<any>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    // const onChange2 = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    //     setImages2(imageList as never[]);
    // };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
        }
    };

    const uploadHandler = () => {
        if (images) {
            dispatch(uploadImage(images[0]));
        }
    };

    useEffect(() => {
        if (uploadedData) {
            alert('Image uploaded successfully');
        }

        return () => {
            dispatch(clearUploadData());
        }
    }, [uploadedData]);

    return (
        <div>
            <div className="pt-5 space-y-8">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel" id="single_file">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Upload Reward Poster</h5>
                            {/* <button type="button" className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" onClick={() => toggleCode('code1')}>
                                <span className="flex items-center">
                                    <IconCode className="me-2" />
                                    Code
                                </span>
                            </button> */}
                        </div>
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="myFirstImage">
                                <div className="label-container">
                                    <label>Upload </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setImages([]);
                                        }}
                                    >
                                        x
                                    </button>
                                </div>
                                <label className="custom-file-container__custom-file"></label>
                                <div className="flex">
                                    <button type="button" className="btn rounded-lg p-2 mt-4 text-white" onClick={uploadHandler}>
                                        Upload
                                    </button>
                                    <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" onChange={changeHandler} />
                                </div>
                                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </button>
                                            &nbsp;
                                            {imageList.map((image, index) => (
                                                <div key={index} className="custom-file-container__image-preview relative">
                                                    <img src={image.dataURL} alt="img" className="m-auto" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                                {images.length === 0 ? <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto" alt="" /> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageReward;
