import { useState } from "react";
import Header from "./Header";
import SimpleBar from "simplebar-react";
import { Emojis } from "../../utils/Emojis";


export default function ProfileChat() {
  const [chatSelected, setChatSelected] = useState(false)
  const data = Object.keys(Emojis);
  const emojisTypes = [...data]
  console.log(emojisTypes)
  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <p
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: "9",
              fontSize: "xxx-large",
              transform: " translate(-50%, -50%)",
              overflow: "hi",
            }}
          >
            <img
              src="https://kaysvillefamilydentistry.com/wp-content/uploads/2022/07/coming_soon.gif"
              alt="comming Soon"
            />
          </p>
          <div className="page-content blur-sm pointer-events-none select-none">
            <div className="container-fluid">
              <div className="chat-wrapper  d-lg-flex gap-1 mt-n4 py-1">
                <div className="chat-leftsidebar ">
                  <div className="px-4 pt-4 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="flex-grow-1">
                        <h5 className="mb-4">Chats</h5>
                      </div>
                      <div className="flex-shrink-0">
                        <div
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          data-bs-placement="bottom"
                          title="Add Contact"
                        >
                          {/* <!-- Button trigger modal --> */}
                          <button
                            type="button"
                            className="btn btn-soft-primary bg-[#f0f2ff]  btn-sm"
                          >
                            <i className="ri-add-line align-bottom"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control bg-light border-light"
                        placeholder="Search here..."
                      />
                      <i className="ri-search-2-line search-icon"></i>
                    </div>
                  </div>
                  {/* <!-- .p-4 --> */}

                  <ul
                    className="nav nav-tabs nav-tabs-custom nav-success nav-justified"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        href="#chats"
                        role="tab"
                      >
                        Chats
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#contacts"
                        role="tab"
                      >
                        Contacts
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content text-muted">
                    <div className="tab-pane active" id="chats" role="tabpanel">
                      <SimpleBar className="chat-room-list pt-3" data-simplebar>
                        <div className="d-flex align-items-center px-4 mb-2">
                          <div className="flex-grow-1">
                            <h4 className="mb-0 fs-11 text-muted text-uppercase">
                              Direct Messages
                            </h4>
                          </div>
                          <div className="flex-shrink-0">
                            <div
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="bottom"
                              title="New Message"
                            >
                              {/* <!-- Button trigger modal --> */}
                              <button
                                type="button"
                                className="btn btn-soft-primary bg-[#f0f2ff]  btn-sm shadow-none"
                              >
                                <i className="ri-add-line align-bottom"></i>
                              </button>
                            </div>
                          </div>
                        </div>

                        <SimpleBar className="chat-message-list max-h-[250px] overflow-y-auto">
                          <ul
                            className="list-unstyled chat-list chat-user-list"
                            id="userList"
                          >
                            {Array.from({ length: 10 }, (_, ind) => (
                              <li
                                key={ind}
                                id="contact-id-1"
                                data-name="direct-message"
                                className=""
                              >
                                <a
                                  href="javascript: void(0);"
                                  onClick={() => setChatSelected(!chatSelected)}
                                >
                                  <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                                      <div className="avatar-xxs">
                                        {" "}
                                        <img
                                          src="/assets/images/users/default_proile_image.png"
                                          className="rounded-circle img-fluid userprofile"
                                          alt=""
                                        />
                                        <span className="user-status"></span>{" "}
                                      </div>{" "}
                                    </div>{" "}
                                    <div className="flex-grow-1 overflow-hidden">
                                      {" "}
                                      <p className="text-truncate mb-0">
                                        Lisa Parker
                                      </p>{" "}
                                    </div>{" "}
                                  </div>{" "}
                                </a>{" "}
                              </li>
                            ))}
                          </ul>
                        </SimpleBar>

                        <div className="d-flex align-items-center px-4 mt-4 pt-2 mb-2">
                          <div className="flex-grow-1">
                            <h4 className="mb-0 fs-11 text-muted text-uppercase">
                              Channels
                            </h4>
                          </div>
                          <div className="flex-shrink-0">
                            <div
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="bottom"
                              title="Create group"
                            >
                              {/* <!-- Button trigger modal --> */}
                              <button
                                type="button"
                                className="btn btn-soft-success btn-sm"
                              >
                                <i className="ri-add-line align-bottom"></i>
                              </button>
                            </div>
                          </div>
                        </div>

                        <SimpleBar className="chat-message-list max-h-[150px] overflow-y-auto">
                          <ul
                            className="list-unstyled chat-list chat-user-list mb-0"
                            id="channelList"
                          >
                            {Array.from({ length: 10 }, (_, ind) => (
                              <li
                                key={ind}
                                id="contact-id-1"
                                data-name="direct-message"
                                className=""
                              >
                                <a href="javascript: void(0);">
                                  <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                                      <div className="avatar-xxs">
                                        {" "}
                                        <img
                                          src="/assets/images/users/default_proile_image.png"
                                          className="rounded-circle img-fluid userprofile"
                                          alt=""
                                        />
                                        <span className="user-status"></span>{" "}
                                      </div>{" "}
                                    </div>{" "}
                                    <div className="flex-grow-1 overflow-hidden">
                                      {" "}
                                      <p className="text-truncate mb-0">
                                        Lisa Parker
                                      </p>{" "}
                                    </div>{" "}
                                  </div>{" "}
                                </a>{" "}
                              </li>
                            ))}
                          </ul>
                        </SimpleBar>
                        {/* <!-- End chat-message-list --> */}
                      </SimpleBar>
                    </div>
                    <div className="tab-pane" id="contacts" role="tabpanel">
                      <SimpleBar className="chat-room-list pt-3" data-simplebar>
                        <div className="sort-contact"></div>
                      </SimpleBar>
                    </div>
                  </div>
                  {/* <!-- end tab contact --> */}
                </div>
                {/* <!-- end chat leftsidebar --> */}
                {/* <!-- Start User chat --> */}
                <div
                  className={`user-chat ${
                    chatSelected ? "user-chat-show" : ""
                  } w-100 overflow-hidden`}
                >
                  <div className="chat-content d-lg-flex">
                    {/* <!-- start chat conversation section --> */}
                    <div className="w-100 overflow-hidden position-relative">
                      {/* <!-- conversation user --> */}
                      <div className="position-relative">
                        <div className="position-relative" id="users-chat">
                          <div className="p-3 user-chat-topbar">
                            <div className="row align-items-center">
                              <div className="col-sm-4 col-8">
                                <div className="d-flex align-items-center">
                                  <div className="flex-shrink-0 d-block d-lg-none me-3">
                                    <a
                                      href="javascript: void(0);"
                                      onClick={() => setChatSelected(false)}
                                      className="user-chat-remove fs-18 p-1"
                                    >
                                      <i className="ri-arrow-left-s-line align-bottom"></i>
                                    </a>
                                  </div>
                                  <div className="flex-grow-1 overflow-hidden">
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                        <img
                                          src="/assets/images/users/default_proile_image.png"
                                          className="rounded-circle avatar-xs"
                                          alt=""
                                        />
                                        <span className="user-status"></span>
                                      </div>
                                      <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="text-truncate mb-0 fs-16">
                                          <a
                                            className="text-reset username"
                                            data-bs-toggle="offcanvas"
                                            href="#userProfileCanvasExample"
                                            aria-controls="userProfileCanvasExample"
                                          >
                                            Lisa Parker
                                          </a>
                                        </h5>
                                        <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                          <small>Online</small>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-8 col-4">
                                <ul className="list-inline user-chat-nav text-end mb-0">
                                  <li className="list-inline-item m-0">
                                    <div className="dropdown">
                                      <button
                                        className="btn btn-ghost-secondary btn-icon"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        <i
                                          data-feather="search"
                                          className="icon-sm"
                                        ></i>
                                      </button>
                                      <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg">
                                        <div className="p-2">
                                          <div className="search-box">
                                            <input
                                              type="text"
                                              className="form-control bg-light border-light"
                                              placeholder="Search here..."
                                              onKeyUp="searchMessages()"
                                              id="searchMessage"
                                            />
                                            <i className="ri-search-2-line search-icon"></i>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>

                                  <li className="list-inline-item d-none d-lg-inline-block m-0">
                                    <button
                                      type="button"
                                      className="btn btn-ghost-secondary btn-icon"
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#userProfileCanvasExample"
                                      aria-controls="userProfileCanvasExample"
                                    >
                                      <i
                                        data-feather="info"
                                        className="icon-sm"
                                      ></i>
                                    </button>
                                  </li>

                                  <li className="list-inline-item m-0">
                                    <div className="dropdown">
                                      <button
                                        className="btn btn-ghost-secondary btn-icon"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        <i
                                          data-feather="more-vertical"
                                          className="icon-sm"
                                        ></i>
                                      </button>
                                      <div className="dropdown-menu dropdown-menu-end">
                                        <a
                                          className="dropdown-item d-block d-lg-none user-profile-show"
                                          href="#"
                                        >
                                          <i className="ri-user-2-fill align-bottom text-muted me-2"></i>{" "}
                                          View Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                          <i className="ri-inbox-archive-line align-bottom text-muted me-2"></i>{" "}
                                          Archive
                                        </a>
                                        <a className="dropdown-item" href="#">
                                          <i className="ri-mic-off-line align-bottom text-muted me-2"></i>{" "}
                                          Muted
                                        </a>
                                        <a className="dropdown-item" href="#">
                                          <i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i>{" "}
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          {/* <!-- end chat user head --> */}
                          <SimpleBar
                            className="chat-conversation p-3 p-lg-4 overflow-y-auto"
                            id="chat-conversation"
                            data-simplebar={true}
                          >
                            {/* <div id="elmLoader">
                              <div
                                className="spinner-border text-primary avatar-sm"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div> */}
                            <ul
                              className="list-unstyled chat-conversation-list pb-5"
                              id="users-conversation"
                            >
                              <li className="chat-list left" id="1">
                                {" "}
                                <div className="conversation-list">
                                  <div className="chat-avatar">
                                    <img
                                      src="/assets/images/users/default_proile_image.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="user-chat-content">
                                    <div className="ctext-wrap">
                                      <div
                                        className="ctext-wrap-content"
                                        id="1"
                                      >
                                        <p className="mb-0 ctext-content">
                                          Good morning 😊
                                        </p>
                                      </div>
                                      <div className="dropdown align-self-start message-box-drop">
                                        {" "}
                                        <a
                                          className="dropdown-toggle"
                                          href="#"
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          {" "}
                                          <i className="ri-more-2-fill"></i>{" "}
                                        </a>{" "}
                                        <div className="dropdown-menu">
                                          {" "}
                                          <a
                                            className="dropdown-item reply-message"
                                            href="#"
                                          >
                                            <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                            Reply
                                          </a>{" "}
                                          <a className="dropdown-item" href="#">
                                            <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                            Forward
                                          </a>{" "}
                                          <a
                                            className="dropdown-item copy-message"
                                            href="#"
                                          >
                                            <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                            Copy
                                          </a>{" "}
                                          <a className="dropdown-item" href="#">
                                            <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                            Bookmark
                                          </a>{" "}
                                          <a
                                            className="dropdown-item delete-item"
                                            href="#"
                                          >
                                            <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                            Delete
                                          </a>{" "}
                                        </div>{" "}
                                      </div>
                                    </div>
                                    <div className="conversation-name">
                                      <span className="d-none name">
                                        Lisa Parker
                                      </span>
                                      <small className="text-muted time">
                                        09:07 am
                                      </small>{" "}
                                      <span className="text-success check-message-icon">
                                        <i className="bx bx-check-double"></i>
                                      </span>
                                    </div>
                                  </div>{" "}
                                </div>{" "}
                              </li>
                              <li className="chat-list right" id="2">
                                {" "}
                                <div className="conversation-list">
                                  <div className="user-chat-content">
                                    <div className="ctext-wrap">
                                      <div
                                        className="ctext-wrap-content"
                                        id="2"
                                      >
                                        <p className="mb-0 ctext-content">
                                          Good morning, How are you? What about
                                          our next meeting?
                                        </p>
                                      </div>
                                      <div className="dropdown align-self-start message-box-drop">
                                        {" "}
                                        <a
                                          className="dropdown-toggle"
                                          href="#"
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          {" "}
                                          <i className="ri-more-2-fill"></i>{" "}
                                        </a>{" "}
                                        <div className="dropdown-menu">
                                          {" "}
                                          <a
                                            className="dropdown-item reply-message"
                                            href="#"
                                          >
                                            <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                            Reply
                                          </a>{" "}
                                          <a className="dropdown-item" href="#">
                                            <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                            Forward
                                          </a>{" "}
                                          <a
                                            className="dropdown-item copy-message"
                                            href="#"
                                          >
                                            <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                            Copy
                                          </a>{" "}
                                          <a className="dropdown-item" href="#">
                                            <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                            Bookmark
                                          </a>{" "}
                                          <a
                                            className="dropdown-item delete-item"
                                            href="#"
                                          >
                                            <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                            Delete
                                          </a>{" "}
                                        </div>{" "}
                                      </div>
                                    </div>
                                    <div className="conversation-name">
                                      <span className="d-none name">
                                        Frank Thomas
                                      </span>
                                      <small className="text-muted time">
                                        09:08 am
                                      </small>{" "}
                                      <span className="text-success check-message-icon">
                                        <i className="bx bx-check-double"></i>
                                      </span>
                                    </div>
                                  </div>{" "}
                                </div>{" "}
                              </li>
                              <li className="chat-list left" id="3">
                                <div className="conversation-list">
                                  <div className="chat-avatar">
                                    <img
                                      src="/assets/images/users/default_proile_image.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="user-chat-content">
                                    <div className="ctext-wrap">
                                      <div
                                        className="ctext-wrap-content"
                                        id="3"
                                      >
                                        <p className="mb-0 ctext-content">
                                          Yeah everything is fine. Our next
                                          meeting tomorrow at 10.00 AM
                                        </p>
                                      </div>
                                      <div className="dropdown align-self-start message-box-drop">
                                        <a
                                          className="dropdown-toggle"
                                          href="#"
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          <i className="ri-more-2-fill"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                          <a
                                            className="dropdown-item reply-message"
                                            href="#"
                                          >
                                            <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                            Reply
                                          </a>
                                          <a className="dropdown-item" href="#">
                                            <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                            Forward
                                          </a>
                                          <a
                                            className="dropdown-item copy-message"
                                            href="#"
                                          >
                                            <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                            Copy
                                          </a>
                                          <a className="dropdown-item" href="#">
                                            <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                            Bookmark
                                          </a>
                                          <a
                                            className="dropdown-item delete-item"
                                            href="#"
                                          >
                                            <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                            Delete
                                          </a>
                                        </div>{" "}
                                      </div>
                                    </div>
                                    <div className="ctext-wrap">
                                      <div
                                        className="ctext-wrap-content"
                                        id="4"
                                      >
                                        <p className="mb-0 ctext-content">
                                          Hey, I&apos;m going to meet a friend
                                          of mine at the department store. I
                                          have to buy some presents for my
                                          parents 🎁.
                                        </p>
                                      </div>
                                      <div className="dropdown align-self-start message-box-drop">
                                        {" "}
                                        <a
                                          className="dropdown-toggle"
                                          href="#"
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          {" "}
                                          <i className="ri-more-2-fill"></i>{" "}
                                        </a>{" "}
                                        <div className="dropdown-menu">
                                          {" "}
                                          <a
                                            className="dropdown-item reply-message"
                                            href="#"
                                          >
                                            <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                            Reply
                                          </a>{" "}
                                          <a className="dropdown-item" href="#">
                                            <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                            Forward
                                          </a>{" "}
                                          <a
                                            className="dropdown-item copy-message"
                                            href="#"
                                          >
                                            <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                            Copy
                                          </a>{" "}
                                          <a className="dropdown-item" href="#">
                                            <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                            Bookmark
                                          </a>{" "}
                                          <a
                                            className="dropdown-item delete-item"
                                            href="#"
                                          >
                                            <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                            Delete
                                          </a>{" "}
                                        </div>{" "}
                                      </div>
                                    </div>
                                    <div className="conversation-name">
                                      <span className="d-none name">
                                        Lisa Parker
                                      </span>
                                      <small className="text-muted time">
                                        09:10 am
                                      </small>{" "}
                                      <span className="text-success check-message-icon">
                                        <i className="bx bx-check-double"></i>
                                      </span>
                                    </div>
                                  </div>{" "}
                                </div>{" "}
                              </li>
                              <li className="chat-list right" id="5">
                                {" "}
                                <div className="conversation-list">
                                  <div className="user-chat-content">
                                    <div className="ctext-wrap">
                                      <div
                                        className="ctext-wrap-content"
                                        id="5"
                                      >
                                        <p className="mb-0 ctext-content">
                                          Wow that&apos;s great
                                        </p>
                                      </div>
                                      <div className="dropdown align-self-start message-box-drop">
                                        {" "}
                                        <a
                                          className="dropdown-toggle"
                                          href="#"
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          {" "}
                                          <i className="ri-more-2-fill"></i>{" "}
                                        </a>{" "}
                                        <div className="dropdown-menu">
                                          {" "}
                                          <a
                                            className="dropdown-item reply-message"
                                            href="#"
                                          >
                                            <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                            Reply
                                          </a>{" "}
                                          <a className="dropdown-item" href="#">
                                            <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                            Forward
                                          </a>{" "}
                                          <a
                                            className="dropdown-item copy-message"
                                            href="#"
                                          >
                                            <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                            Copy
                                          </a>{" "}
                                          <a className="dropdown-item" href="#">
                                            <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                            Bookmark
                                          </a>{" "}
                                          <a
                                            className="dropdown-item delete-item"
                                            href="#"
                                          >
                                            <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                            Delete
                                          </a>{" "}
                                        </div>{" "}
                                      </div>
                                    </div>
                                    <div className="conversation-name">
                                      <span className="d-none name">
                                        Frank Thomas
                                      </span>
                                      <small className="text-muted time">
                                        09:30 am
                                      </small>{" "}
                                      <span className="text-success check-message-icon">
                                        <i className="bx bx-check-double"></i>
                                      </span>
                                    </div>
                                  </div>{" "}
                                </div>{" "}
                              </li>
                              <li className="chat-list left" id="6">
                                {" "}
                                <div className="conversation-list">
                                  <div className="chat-avatar">
                                    <img
                                      src="/assets/images/users/default_proile_image.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="user-chat-content">
                                    <div className="ctext-wrap">
                                      <div className="message-img mb-0">
                                        <div className="message-img-list">
                                          {" "}
                                          <div>
                                            {" "}
                                            <a
                                              className="popup-img d-inline-block"
                                              href="assets/images/small/img-1.jpg"
                                            >
                                              {" "}
                                              <img
                                                src="/assets/images/small/img-1.jpg"
                                                alt=""
                                                className="rounded border"
                                              />{" "}
                                            </a>{" "}
                                          </div>{" "}
                                          <div className="message-img-link">
                                            {" "}
                                            <ul className="list-inline mb-0">
                                              {" "}
                                              <li className="list-inline-item dropdown">
                                                {" "}
                                                <a
                                                  className="dropdown-toggle"
                                                  href="#"
                                                  role="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-haspopup="true"
                                                  aria-expanded="false"
                                                >
                                                  {" "}
                                                  <i className="ri-more-fill"></i>{" "}
                                                </a>{" "}
                                                <div className="dropdown-menu">
                                                  {" "}
                                                  <a
                                                    className="dropdown-item"
                                                    href="assets/images/small/img-1.jpg"
                                                    download=""
                                                  >
                                                    <i className="ri-download-2-line me-2 text-muted align-bottom"></i>
                                                    Download
                                                  </a>{" "}
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                  >
                                                    <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                                    Reply
                                                  </a>{" "}
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                  >
                                                    <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                                    Forward
                                                  </a>{" "}
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                  >
                                                    <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                                    Bookmark
                                                  </a>{" "}
                                                  <a
                                                    className="dropdown-item delete-image"
                                                    href="#"
                                                  >
                                                    <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                                    Delete
                                                  </a>{" "}
                                                </div>{" "}
                                              </li>{" "}
                                            </ul>{" "}
                                          </div>{" "}
                                        </div>
                                        <div className="message-img-list">
                                          {" "}
                                          <div>
                                            {" "}
                                            <a
                                              className="popup-img d-inline-block"
                                              href="assets/images/small/img-2.jpg"
                                            >
                                              {" "}
                                              <img
                                                src="/assets/images/small/img-2.jpg"
                                                alt=""
                                                className="rounded border"
                                              />{" "}
                                            </a>{" "}
                                          </div>{" "}
                                          <div className="message-img-link">
                                            {" "}
                                            <ul className="list-inline mb-0">
                                              {" "}
                                              <li className="list-inline-item dropdown">
                                                {" "}
                                                <a
                                                  className="dropdown-toggle"
                                                  href="#"
                                                  role="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-haspopup="true"
                                                  aria-expanded="false"
                                                >
                                                  {" "}
                                                  <i className="ri-more-fill"></i>{" "}
                                                </a>{" "}
                                                <div className="dropdown-menu">
                                                  {" "}
                                                  <a
                                                    className="dropdown-item"
                                                    href="assets/images/small/img-2.jpg"
                                                    download=""
                                                  >
                                                    <i className="ri-download-2-line me-2 text-muted align-bottom"></i>
                                                    Download
                                                  </a>{" "}
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                  >
                                                    <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                                    Reply
                                                  </a>{" "}
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                  >
                                                    <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                                    Forward
                                                  </a>{" "}
                                                  <a
                                                    className="dropdown-item"
                                                    href="#"
                                                  >
                                                    <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                                    Bookmark
                                                  </a>{" "}
                                                  <a
                                                    className="dropdown-item delete-image"
                                                    href="#"
                                                  >
                                                    <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                                    Delete
                                                  </a>{" "}
                                                </div>{" "}
                                              </li>{" "}
                                            </ul>{" "}
                                          </div>{" "}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="conversation-name">
                                      <span className="d-none name">
                                        Lisa Parker
                                      </span>
                                      <small className="text-muted time">
                                        10:15 am
                                      </small>{" "}
                                      <span className="text-success check-message-icon">
                                        <i className="bx bx-check-double"></i>
                                      </span>
                                    </div>
                                  </div>{" "}
                                </div>{" "}
                              </li>
                            </ul>
                            {/* <!-- end chat-conversation-list --> */}
                          </SimpleBar>
                          <div
                            className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                            id="copyClipBoard"
                            role="alert"
                          >
                            Message copied
                          </div>
                        </div>

                        {/* <!-- end chat-conversation --> */}

                        <div className="chat-input-section p-3 p-lg-4">
                          <form
                            id="chatinput-form"
                            encType="multipart/form-data"
                          >
                            <div className="row g-0 align-items-center">
                              <div className="col-auto">
                                <div className="chat-input-links me-2">
                                  <div className="links-list-item">
                                    <button
                                      type="button"
                                      className="btn btn-link text-decoration-none emoji-btn"
                                      id="emoji-btn"
                                    >
                                      <i className="bx bx-smile align-middle"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="col">
                                <div className="chat-input-feedback">
                                  Please Enter a Message
                                </div>
                                <input
                                  type="text"
                                  className="form-control chat-input bg-light border-light"
                                  id="chat-input"
                                  placeholder="Type your message..."
                                  autoComplete="off"
                                />
                              </div>
                              <div className="col-auto">
                                <div className="chat-input-links ms-2">
                                  <div className="links-list-item">
                                    <button
                                      type="submit"
                                      className="btn btn-success bg-success chat-send waves-effect waves-light"
                                    >
                                      <i className="ri-send-plane-2-fill align-bottom"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="replyCard">
                          <div className="card mb-0">
                            <div className="card-body py-3">
                              <div className="replymessage-block mb-0 d-flex align-items-start">
                                <div className="flex-grow-1">
                                  <h5 className="conversation-name"></h5>
                                  <p className="mb-0"></p>
                                </div>
                                <div className="flex-shrink-0">
                                  <button
                                    type="button"
                                    id="close_toggle"
                                    className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                  >
                                    <i className="bx bx-x align-middle"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end chat-wrapper --> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}

          <footer className="footer w-100">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  {new Date().getFullYear()} © All Rights Reserved.
                </div>
                <div className="col-sm-6">
                  <div className="text-sm-end d-none d-sm-block">
                    Designed and Developed by Call Center Projects
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <div className="fg-emoji-picker top-[831px] left-[-26px]">
        <div className="fg-emoji-picker-categories"></div>
      </div>
    </>
  );
}