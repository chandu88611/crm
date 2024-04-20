/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

// Import the necessary plugins
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useUploadAttachmentMutation } from "../../../services/api";
import { successAlert } from "../swAlert";
import Loader from "../Loader";

// Register the plugins
registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

const AttachmentUploadComponent = ({ projectId }) => {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileuploadErr, setFileuploadErr] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setFileuploadErr("");
    }, 5000);
  }, [fileuploadErr]);

  const handleFileChange = (files) => {
    if (files.length > 0) {
      const uploadedFile = files[0];
      if (uploadedFile.fileSize <= 2000000) {
        // 2MB in bytes
        setFile(uploadedFile);
        setIsUploaded(true);
      } else {
        // Reset file and show error message
        setFile(null);
        setIsUploaded(false);

        setFileuploadErr("File size should be within 2MB");
      }
    }
  };

  const [uploadAttachment, {data:uploadRes, isLoading:uploadLoading}] = useUploadAttachmentMutation()

  const handleFileUpload = async () => {
    console.log(file, file?.file)
    const formData = new FormData();
    formData.append("file", file?.file, file?.filename);
    formData.append("project_id", projectId);
    formData.append("name", file.filename);
    const response = await uploadAttachment(formData);
    if (response?.data?.status) {
      successAlert(response?.data?.message)
    } else {
      console.log(response)
      if (response?.error?.data?.errors?.length) {
        setFileuploadErr(response?.error?.data?.errors?.file)
      } else {
        setFileuploadErr(response?.error?.data?.error?.message);
      }
    }
  }

      const onRemoveFiles = async (updatedFiles) => {
        console.log("removed");
        setIsUploaded(false);
        setFile(null);
      };

  return (
    <div>
      {uploadLoading && <Loader />}
      <FilePond
        labelIdle="Upload files within 2MB"
        allowMultiple={false}
        maxFiles={1}
        onRemoveFiles={onRemoveFiles}
        onupdatefiles={handleFileChange}
        required
        acceptedFileTypes={"image/*,application/*"}
        allowFileTypeValidation
        maxFileSize="2MB"
      />
      {fileuploadErr && <span className="text-red-600">{fileuploadErr}</span>}
      <button
        className="btn btn-secondary bg-secondary my-2"
        disabled={!isUploaded}
        type="submit"
        onClick={() => {
          handleFileUpload();
        }}
      >
        Upload
      </button>
      <hr className="border-dashed"/>
    </div>
  );
};

export default AttachmentUploadComponent;
