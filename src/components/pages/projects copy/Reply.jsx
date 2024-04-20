/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import Loader from "../Loader";
import { useAddCommentMutation, useAddReplyMutation } from "../../../services/api";

export default function Reply({ source, commentId, projectID }) {
  // console.log(source, commentId, projectID)
  const [files, setFiles] = useState();
  const [encodedFile, setEncodedFile] = useState([]);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [maxFileSizeErr, setMaxFileSizeErr] = useState("");
  const [comment, setComment] = useState("")
  const [commentErr, setcommentErr] = useState("")
  const [apiErr, setApiErr] = useState("")
  
  useEffect(() => {
    setTimeout(() => {
          setMaxFileSizeErr("");
        },5500)
  }, [maxFileSizeErr]);
  

  
    useEffect(() => {
    setTimeout(() => {
          setApiErr("");
        },5500)
      }, [apiErr]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileLoaded(true);
    console.log(file.size > 2 * 1024 * 1024);
    if (file.size > 2 * 1024 * 1024) {
      console.log(file.size)
      setMaxFileSizeErr("File size exceeds the maximum allowed limit of 2 MB.");
      setFileLoaded(false)
      return
    }



    const reader = new FileReader();
    reader.onload = (e) => {
      setEncodedFile([e.target.result]);
      setFiles(file);
      console.log(file, file.name);
    };
    reader.onerror = (error) => {
      console.error("File reading error:", error);
    };
    reader.readAsDataURL(file);
    setFileLoaded(false)
  };

  const onRemoveFiles = () => {
    setEncodedFile([]);
    setFiles();
  };

  const [addComment, { data: commentresp, isLoading: commentLoading }] = useAddCommentMutation()
  const [addReply, { data: replyresp, isLoading: replyLoading }] =useAddReplyMutation();

  const handleAddComment = async () => {
    
    console.log("inside", files, files?.name)

const formData = new FormData();
    if (files?.name) {
      formData.append("attachment", files, files?.name);
    }
    console.log(source)
    if (source == "childComment" || source == "ParentComment") {
      formData.append("project_id", projectID);
      formData.append("comment", comment);
      formData.append("comment_id", commentId);
      const response = await addReply(formData);
      console.log(response, formData, "resp");
      if (response?.data?.status) {
        console.log(response);
        setComment("");
        setFiles();
        setEncodedFile([]);
      } else {
        console.log(response?.error);
      }
    } else {
      formData.append("project_id", projectID);
      formData.append("comment", comment);
      // formData.append("comment_id", commentId);
      const response = await addComment(formData);
      console.log(response, formData, "resp");
      if (response?.data?.status) {
        console.log(response);
        setComment("");
        setFiles()
        setEncodedFile([])
      } else {
        console.log(response?.error);
      }
    }
  }

  return (
    <>
      {commentLoading && <Loader />}
      {replyLoading && <Loader/>}

      <form className="mt-4">
        <div className="row g-3">
          <div className="col-12">
            {encodedFile.length > 0 && (
              <div className="mt-4">
                {encodedFile.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-2 bg-light border-light rounded-t-xl pt-2 text-sm"
                  >
                    {file.includes("data:image/") ? (
                      <img
                        src={file}
                        className="max-h-[100px] max-w-[100px] m-2"
                        alt="img"
                      />
                    ) : (
                      <>
                        <div className="flex items-center gap-2 p-2  w-full rounded-md ">
                          {fileLoaded && (
                            <span className="border-2  shadow-lg !border-t-white rounded-full p-2 spinner-border"></span>
                          )}
                          <i
                            className={`ri-file-3-fill fs-20 ${
                              fileLoaded
                                ? "absolute left-[30px]"
                                : "shadow-sm border !border-white rounded-full p-2"
                            }`}
                          />

                          <div className="gap-2 block">
                            <div>
                              <span className="filename font-bold">
                                {files?.name}
                              </span>
                            </div>
                            <span className="file-size">
                              {files?.size} kb
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    <button
                      type="button"
                      className="text-xl text-muted font-semibold cursor-pointer"
                      onClick={() => onRemoveFiles()}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
            {fileLoaded && (
              <>
                <div className="flex items-center gap-2 p-2  w-full rounded-md ">
                  {fileLoaded && (
                    <span className="border-2  shadow-lg !border-t-white rounded-full p-2 spinner-border"></span>
                  )}
                  <i
                    className={`ri-file-3-fill fs-20 ${
                      fileLoaded
                        ? "absolute left-[30px]"
                        : "shadow-sm border !border-white rounded-full p-2"
                    }`}
                  />

                  <div className="gap-2 block">
                    <div>
                      <span className="filename font-bold">
                        {files[0]?.name}
                      </span>
                    </div>
                    <span className="file-size">{files[0]?.size} kb</span>
                  </div>
                </div>
              </>
            )}
            <textarea
              className="form-control bg-light border-0 pt-0"
              id="exampleFormControlTextarea1"
              rows="1"
              value={comment}
              placeholder="Enter your comment..."
              onChange={(e) => setComment(e?.target?.value)}
            />
            <p className="text-red-600">{maxFileSizeErr}</p>
            <p className="text-red-600">{commentErr}</p>
          </div>
          <div className="col-12 text-end">
            <label
              htmlFor="file-input"
              className="btn btn-ghost-secondary btn-icon waves-effect me-1"
            >
              <i className="ri-attachment-line fs-16" />
            </label>
            <input
              type="file"
              id="file-input"
              className="d-none"
              onChange={handleFileChange}
            />
            <button
              onClick={() => handleAddComment()}
              className="btn btn-primary bg-primary"
              type="button"
              disabled={!comment}
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
