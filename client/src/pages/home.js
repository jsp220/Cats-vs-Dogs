import React, {useEffect} from 'react'

// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3000");

export const Home = () => {
  // const sendMessage = () => {
  //   socket.emit("send_message", { message: "Hello" })
  // };

  // useEffect(() => {
  //   socket.on("receive_message", (message) => {
  //     alert(message);
  //   })
  // }, [socket])

  return (
    <div>
        <div className=''>home</div>
        {/* <div>
          <button onClick={sendMessage}>Send Message</button>
        </div> */}
    </div>
  )
}

export default Home;