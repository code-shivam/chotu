import React, { useEffect, useRef, useState } from "react";

function ShowCurrentTime() {
  const [count, setCount] = useState(0);
  const ref = useRef(0);
 
 useEffect(() => {
 const firstRender = ref.current;
 console.log(firstRender);

 })
  const GetDateMonthTime = () => {
    setCount(count+1);
    const date = Date.now();
    const dateObj = new Date(date);
    const options = {
    //   day: "numeric",
    //   month: "short",
    //   year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const dateTime = dateObj.toLocaleString("en-IN", options).replace(",", "");
    console.log(dateTime);
  };
  console.log(count);

  return (
    <div>
      <button
        onClick={() => {
          GetDateMonthTime();
        }}
      >
        show
      </button>
    </div>
  );
}

export default ShowCurrentTime;
