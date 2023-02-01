import React from "react";
import { useEffect, useState } from "react";
import OtpLessImg from "./assets/otpless.png";

const LOCAL_API = "http://localhost:8000/api/getUserDetails";

function App() {
  const [user, setUser] = useState(null);

  let waId = window.location.search.split("=")[1];

  useEffect(() => {
    if (waId) {
      try {
        fetch(LOCAL_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ waId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setUser(data);
              localStorage.setItem("user", JSON.stringify(data));
              localStorage.setItem("accessToken", data.accessToken);
            }
          });
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [waId]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <img
        src={OtpLessImg}
        alt="otpless"
        loading="lazy"
        className="w-48 my-4"
      />

      {user && (
        <div className="min-w-72">
          <div className="border rounded-xl my-6 p-6 ">
            <div className="py-2 flex flex-col">
              <h2> Congratulations {user?.user.name}! </h2>
              <h2> You have successfully logged in. </h2>
            </div>
            <hr className="py-2" />
            <div className="">
              <h4 className="flex flex-col border rounded-xl my-1 p-1">
                <span className="flex-1 text-sm">WhatsApp ID : </span>
                <span className="text-blue-500 flex-1">{user?.user.waId}</span>
              </h4>
              <h4 className="flex flex-col border rounded-xl my-1 p-1">
                <span className="flex-1 text-sm">WhatsApp Name : </span>
                <span className="text-blue-500 flex-1">
                  {user?.user.waName}
                </span>
              </h4>
              <h4 className="flex flex-col border rounded-xl my-1 p-1">
                <span className="flex-1 text-sm">WhatsApp Number : </span>
                <span className="text-blue-500 flex-1">
                  {user?.user.waNumber}
                </span>
              </h4>
            </div>
          </div>
        </div>
      )}
      {user === null && (
        <div className="flex flex-col justify-center items-center">
          <button id="whatsapp-login" className={`p-2 hover:scale-95`} />
        </div>
      )}
      {user?.user && (
        <div className="flex flex-col justify-center items-center">
          <button
            className="p-2 bg-gray-800 text-white hover:scale-95 rounded-lg px-6"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("accessToken");
              setUser(null);
              window.location.replace("http://localhost:3000/");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
