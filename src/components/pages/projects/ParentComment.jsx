/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import ChildComment from "./ChildComment";
import Reply from "./Reply";
import { useGetCommentsQuery } from "../../../services/api";
import Loader from "../Loader";
import GLightbox from "glightbox";

export default function MainComment({ projectID, projectData }) {
  const [replyComment, setReplyComment] = useState();
  const [viewReplies, setViewReplies] = useState();
  const imageTypes = ["png", "jpg", "jpeg", "webp", "avif", "svg", "gif"];

      const colors = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
      ];

  const handleReplyComment = (id) => {
    if (id == replyComment) {
      setReplyComment();
    } else {
      setReplyComment(id);
    }
  };

  const openImg = (comment, isImage) => {
    const lbElements = [
      {
        href: comment?.attachment,
      },
    ];
    const myGallery = GLightbox({
      elements: lbElements,
      autoplayVideos: false,
    });
    console;
    myGallery.open();
  };

  const { data: commentsData, isLoading } = useGetCommentsQuery(projectID);
  return (
    <>
      {isLoading && <Loader />}
      <div className="flex-grow-1 ms-3">
        {commentsData?.data?.comments?.map((comment, ind) => (
          <div key={ind}>
            <div className="flex items-top gap-2">
              <div className="avatar-xs flex-shrink-0 me-3">
                <div
                  className={`avatar-title bg-soft-${
                    colors[parseInt(comment?.staff?.id % 6)]
                  } text-${
                    colors[parseInt(comment?.staff?.id % 6)]
                  } rounded-circle uppercase`}
                >
                  {comment?.staff?.name?.split(" ")?.length > 1
                    ? `${comment?.staff?.name?.split(" ")[0][0]}${comment?.staff?.name?.split(" ")[1][0]}`
                    : comment?.staff?.name[0]}
                </div>
              </div>
              <div className="my-2">
                <h5 className="fs-13 h5 capitalize">
                  {comment?.staff?.name}
                  <small className="text-muted ms-2">
                    {new Date(comment?.comment_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </small>
                </h5>
                {comment?.attachment && (
                  <a
                    className="!w-5 !h-5 drop-shadow-lg"
                    onClick={() =>
                      openImg(
                        comment,
                        imageTypes?.includes(
                          comment?.attachment?.split(".").pop().toLowerCase()
                        )
                      )
                    }
                  >
                    {imageTypes?.includes(
                      comment?.attachment?.split(".").pop().toLowerCase()
                    ) ? (
                      <img
                        className="!w-28 !h-28 object-cover drop-shadow-lg"
                        src={comment?.attachment}
                        alt="attachment"
                      />
                    ) : (
                      <p className="!align-middle fs-16">
                        {/* <div className="  text-primary flex items-center">
                          <i className="ri-file-pdf-fill"></i>
                        </div> */}
                        <div className="avatar-title bg-light text-danger rounded">
                          <i className="ri-file-pdf-fill text-4xl"></i>
                        </div>
                        <span className="avatar-title bg-light text-danger rounded fs-24">
                          {comment?.attachment?.split(".").pop().toLowerCase()}
                        </span>
                      </p>
                    )}
                  </a>
                )}
                <p className="text-muted m-2 my-2">{comment?.comment}</p>
                <a
                  onClick={() => handleReplyComment(comment?.id)}
                  className="badge cursor-pointer text-muted bg-light my-2"
                >
                  <i className="mdi mdi-reply"></i>{" "}
                  {replyComment != comment?.id ? "Reply" : "Close"}
                </a>
                {comment?.replies?.length > 0 && (
                  <p
                    className="cursor-pointer ml-2 text-secondary badge badge-soft-secondary"
                    onClick={() => {
                      if (viewReplies == comment?.id) {
                        setViewReplies();
                      } else {
                        setViewReplies(comment?.id);
                      }
                    }}
                  >
                    {viewReplies == comment?.id ? "Hide" : "View"} Replies{" "}
                    {comment?.replies?.length}
                  </p>
                )}
                {replyComment == comment?.id && (
                  <Reply
                    source={"ParentComment"}
                    commentId={comment?.id}
                    projectID={projectID}
                  />
                )}
              </div>
            </div>

            {viewReplies == comment?.id && (
              <div className="d-flex mt-4">
                {/* child comment */}
                <ChildComment data={comment?.replies} projectID={projectID} />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
