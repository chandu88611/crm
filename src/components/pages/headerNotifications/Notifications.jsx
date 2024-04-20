/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import SimpleBar from "simplebar-react";
import Loader from "../Loader";
import {useSelector} from "react-redux"
import { useUpdateTopicStatusMutation } from "../../../services/api";
import { errorRedirect, successAlert } from "../swAlert";


export default function Notifications() {
    const userData = useSelector((state) => state?.user?.value);
  const [isAccepted, setIsAccepted] = useState({})
  const [toggleRating, setToggleRating] = useState(false)
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState("")
  const [feedbackErr, setFeedbackErr] = useState("")

  const [updateStatus, {isLoading: topicUpdateLoading}] = useUpdateTopicStatusMutation()

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating)
  };

  useEffect(() => {
    if (feedback) {
      setFeedbackErr("")
    }
  },[feedback])

  const handleSubmit = async (id) => {
    if (feedback == "") {
      setFeedbackErr("feedback is required")
      return
    }
    const response = await updateStatus({
      topic_id: isAccepted?.id,
      type: isAccepted?.status,
      feedback: feedback,
      rating: rating
    })
    if (response?.data?.message) {
      setToggleRating(false);
      setIsAccepted({});
      setFeedback();
      setRating(5);
      successAlert(response?.data?.message)

    } else {
      errorRedirect(response?.error?.data?.message)
    }
  }
  return (
    <>
      <SimpleBar className=" max-h-[250px]">
        {userData?.topics_notification?.map((topic, ind) => (
          <div
            key={ind}
            className="card bg-gradient-to-r from-sky-100 to-slate-50 "
          >
            {topicUpdateLoading && <Loader />}
            <div className="card-header border-b-0 pb-0 bg-gradient-to-r from-sky-100 to-slate-50 h5 text-gray-500">
              {topic?.topic?.title}
            </div>
            <div className="card-body news-component">
              {/* <small className="text-muted font-semibold">
                  {topic?.topic?.title} details
                </small> */}
              <p className="text-muted">
                Could you confirm whether the executive provided a thorough and
                clear explanation of the process?
              </p>
              <small className="font-semibold text-muted">
                Account manager details
              </small>
              <p className="text-xs">
                Staff :-{" "}
                <b className="badge badge-soft-primary border-l-2 text-capitalize border-l-primary">
                  {topic?.staff?.name}
                </b>
              </p>

              {isAccepted?.id != topic?.id && (
                <div className="flex gap-1 my-1 justify-end items-center">
                  <button
                    className="btn btn-outline-success btn-sm btn-border"
                    type="button"
                    onClick={() => {
                      setIsAccepted({ id: topic?.id, status: "accept" });
                      setToggleRating(true);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className=" btn btn-outline-danger btn-border btn-sm"
                    type="button"
                    onClick={() => {
                      setIsAccepted({ id: topic?.id, status: "reject" });
                      setToggleRating(false);
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
              {isAccepted?.id == topic?.id && (
                <>
                  <div className="my-2">
                    {toggleRating && (
                      <span className="text-muted">
                        Provide your rating for <b>{topic?.topic?.title}</b>
                      </span>
                    )}
                    {toggleRating && (
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        value={rating}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                    )}
                    <label className="text-muted">
                      Feedback for <b>{topic?.topic?.title}</b>
                    </label>
                    <textarea
                      type="textarea"
                      cols={2}
                      value={feedback}
                      onChange={(e) =>
                        setFeedback(e?.target?.value?.trimStart())
                      }
                      className="form-control"
                      placeholder={`Enter your feedback`}
                    ></textarea>
                    <p className="text-danger text-xs">{feedbackErr}</p>
                  </div>
                  <button
                    onClick={() => {
                      setToggleRating(false);
                      setIsAccepted({});
                      setFeedback();
                      setRating(5);
                    }}
                    className="btn btn-outline-danger btn-border btn-sm float-end ml-1"
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-outline-success btn-sm btn-border float-end"
                    onClick={() => handleSubmit(ind)}
                    // disabled={!feedback}
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </SimpleBar>
    </>
  );
}