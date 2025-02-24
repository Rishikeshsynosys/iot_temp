import React from "react";
import ReactModal from 'react-modal';

const Modal = ({modalIsOpen, heading, children, toggleModal, className="lg:w-2/3"}) => {
  return (
    <ReactModal
    className={`w-full items-center justify-center focus:outline-none gap-3 ${className}`}
    isOpen={modalIsOpen}
    style={{
      overlay: {
        zIndex: 10,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
      },
      content: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        justifyContent: "center",
        zIndex: 10,
        margin: "auto",
        padding: "25px",
        background: "white",
        maxHeight: "90%",
        minHeight: "30%",
      },
    }}
    contentLabel="Example Modal"
    bodyOpenClassName={"ReactModal__Body--open"}
    htmlOpenClassName={"ReactModal__Html--open"}
    ariaHideApp={
      true
      /* Boolean indicating if the appElement should be hidden */
    }
    shouldFocusAfterRender={true}
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    shouldReturnFocusAfterClose={
      true
      /* Boolean indicating if the modal should restore focus to the element
     that had focus prior to its display. */
    }
    role={"dialog"}
    preventScroll={true}
    parentSelector={() => document.body}
    aria={{ labelledby: "heading", describedby: "full_description" }}
    overlayElement={
      (props, contentElement) => <div {...props}>{contentElement}</div>
      /* Custom Overlay element. */
    }
    contentElement={
      (props, children) => <div {...props}>{children}</div>
      /* Custom Content element. */
    }
  >
    {/* heading and close button */}
    <div className="flex w-full relative">
      <h1 className="text-lg font-semibold text-gray mx-auto mb-2 uppercase tracking-wider">
        {heading}
      </h1>
      <button
        className="absolute font-black right-1 top-0 text-lg text-gray cursor-pointer hover:text-black"
        onClick={() => toggleModal()}
      >
        X
      </button>
    </div>
    <div className="border-b w-full border-b-gray-200 shadow"></div>
    {/* content */}
    <div className="w-full overflow-y-auto px-10">{children}</div>
  </ReactModal>
  );
};

export default Modal;
