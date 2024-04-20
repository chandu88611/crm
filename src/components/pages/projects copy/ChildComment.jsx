/* eslint-disable react/prop-types */
import { useState } from "react";
import Reply from "./Reply";
import GLightbox from "glightbox";


export default function ChildComment({data, projectID }) {
  const [replyComment, setReplyComment] = useState();
    const imageTypes = ["png", "jpg", "jpeg", "webp", "avif", "svg", "gif"];
  const [viewReplies, setViewReplies] = useState()


  const handleReplyComment = (id) => {

    if (id == replyComment) {
      setReplyComment();
    } else {
      setReplyComment(id);
    }

  };

  const openImg = (comment) => {
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
  
  return (
    <>
      <div className="flex-grow-1 ms-3">
        {data?.length > 0 &&
          data?.map((reply, ind) => (
            <div key={ind} className="mb-2 ">
              <div className="flex items-top gap-2">
               
                <div className="flex-shrink-0">
                  <img
                    src="/assets/images/users/avatar-10.jpg"
                    alt=""
                    className="avatar-xs rounded-circle"
                  />
                </div>
                <div>
                  <h5 className="fs-13 h5 capitalize">
                    {reply?.staff?.name}
                    <small className="text-muted ms-2">
                      {new Date(reply?.comment_date).toLocaleDateString(
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
                  {reply?.attachment && (
                    <a
                      className=""
                      onClick={() =>
                        openImg(
                          reply,
                          imageTypes?.includes( reply?.attachment?.split(".").pop().toLowerCase())
                        )
                      }
                    >
                      {imageTypes?.includes(
                        reply?.attachment?.split(".").pop().toLowerCase()
                      ) ? (
                        <img
                          className="!w-28 !h-28 object-cover drop-shadow-sm rounded-lg"
                          src={reply?.attachment}
                          alt="attachment"
                        />
                      ) : (
                        <p className="!align-middle fs-16">
                          {/* <div className="  text-primary flex items-center">
                            <i className="ri-file-pdf-fill"></i>
                            <span className>
                              {reply?.attachment
                                ?.split(".")
                                .pop()
                                .toLowerCase()}
                            </span>
                          </div> */}
                          {/* <div className="  text-primary flex items-center">
                          <i className="ri-file-pdf-fill"></i>
                        </div> */}
                          <div className="avatar-title bg-light text-danger rounded">
                            <i className="ri-file-pdf-fill text-4xl"></i>
                          </div>
                          <span className="avatar-title bg-light text-danger rounded fs-24">
                            {reply?.attachment?.split(".").pop().toLowerCase()}
                          </span>
                        </p>
                      )}
                    </a>
                  )}
                  <p className="text-muted py-2">{reply?.comment}</p>
                  <a
                    onClick={() => handleReplyComment(reply?.id)}
                    className="badge cursor-pointer text-muted bg-light my-2"
                  >
                    <i className="mdi mdi-reply"></i>{" "}
                    {replyComment != reply?.id ? "Reply" : "close"}
                  </a>
                  {reply?.replies?.length > 0 && (
                    <p
                      className="cursor-pointer ml-2 text-secondary badge badge-soft-secondary"
                      onClick={() => {
                        if (viewReplies == reply?.id) {
                          setViewReplies();
                        } else {
                          setViewReplies(reply?.id);
                        }
                      }}
                    >
                      {viewReplies == reply?.id ? "Hide" : "View"} Replies{" "}
                      {reply?.replies?.length}
                    </p>
                  )}
                </div>
              </div>
              {replyComment == reply?.id && (
                <Reply
                  source={"childComment"}
                  projectID={projectID}
                  commentId={reply?.id}
                />
              )}
              {viewReplies == reply?.id && (
                <div className="d-flex mt-4">


                  <ChildComment data={reply?.replies} projectID={projectID} />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}