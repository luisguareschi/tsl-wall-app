"use client";
import styles from './CreatePost.module.css'
import {useState} from "react";
import {BsImage} from "react-icons/bs";
import server from "@/Functions/Server";

interface props {
    show: boolean
    setShow: (value: boolean) => void
}

const CreatePost = ({show, setShow}:props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [imgPreview, setImgPreview] = useState('')
    if (show) {
        document.body.style.overflow = 'hidden'
    }
    const hide = (event: any) => {
        document.body.style.overflow = 'auto'
        setShow(false)
        setTitle('')
        setContent('')
        setImage('')
        setImgPreview('')
    }
    const handleClickOnContainer = (event: any) => {
        event.stopPropagation()
    }

    const handleImageChange = (e: any) => {
        if (e.target.files.length === 0) {
            setImage('')
            setImgPreview('')
            return
        }
        setImage(e.target.files[0])
        setImgPreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleDeletePreview = () => {
        setImage('')
        setImgPreview('')
    }

    const handleSubmit = () => {
        let form = new FormData()
        if (title === '') {
            alert('Title cannot be blank')
            return
        }
        if (content === '') {
            alert('Content cannot be blank')
            return
        }
        form.append('title', title)
        form.append('content', content)
        form.append('image', image)
        server.post('/create_post/', form).then(r => {
            alert('Post created successfully')
            window.location.reload()
            setShow(false)
        }).catch(r => {
            console.log(r.response.data)
            alert('There was an error creating the post')
            setShow(false)
        })
    }

    if (!show) return
    return (
        <div className={styles.outerContainer} onClick={hide}>
            <div className={styles.container} onClick={handleClickOnContainer}>
                <div className={styles.title}>Create Post</div>
                <div className={styles.inputContainer}>
                    Title
                    <input type="text" placeholder="Title" value={title}
                           onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div className={styles.inputContainer}>
                    Content
                    <textarea placeholder="Content" value={content}
                              onChange={(event)=>setContent(event.target.value)}/>
                </div>
                {image === '' && (
                    <div>
                        <button onClick={()=>document.getElementById("fileInput")?.click()}
                                className={styles.fileInputButton}>
                            <div>Upload Image</div>
                            <BsImage/>
                        </button>
                        <input type="file" accept="image/png, image/jpeg"
                               onChange={handleImageChange} className={styles.fileInput} id={"fileInput"}/>
                    </div>
                )}
                {image !== '' && (
                    <div className={styles.imagePreviewContainer}>
                        <img src={imgPreview} alt="preview" className={styles.imagePreview}/>
                        <button className={styles.deletePreview} onClick={handleDeletePreview}>
                            X
                        </button>
                    </div>
                )}
                <div className={styles.submitButton}>
                    <button onClick={handleSubmit}>POST</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost