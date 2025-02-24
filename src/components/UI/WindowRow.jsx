const WindowRow = ({ label, value, title = "", capitalize }) => {
    return (
      <div className="flex justify-between text-left w-full">
        <div className="w-[30%]">
          <label className="font-semibold text-black/90"> {label} </label>
        </div>
  
        <div className="w-[70%] text-left font-medium">
          <label title={title} className={`text-gray-600 w-100 mx-auto ${capitalize && 'capitalize'}`}>
            {" "}
            : &nbsp;{value}{" "}
          </label>
        </div>
      </div>
    );
  }

  export default WindowRow;