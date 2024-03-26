import React, { useEffect, useState } from "react";
import EyeImg from "../assets/eye.png";
import EyeCross from "../assets/eyecross.png";
import { useRef } from "react";
import deleteIcon from "../assets/bin.png";
import editIcon from "../assets/edit.png";

import { v4 as uuidv4 } from "uuid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordarray, setPasswordarray] = useState([]);
  const ref = useRef();
  const ref2 = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordarray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    ref2.current.type = "text";
    if (ref.current.src.includes(EyeCross)) {
      ref.current.src = EyeImg;
      ref2.current.type = "text";
    } else {
      ref.current.src = EyeCross;
      ref2.current.type = "password";
    }
  };

  const savePassword = () => {
    setPasswordarray([...passwordarray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordarray, { ...form, id: uuidv4() }])
    );
    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    const confirmation = confirm("Do you really want to delete this ?");
    if (confirmation) {
      setPasswordarray(
        passwordarray.filter((item) => {
          return item.id !== id;
        })
      );
      localStorage.setItem(
        "passwords",
        JSON.stringify(
          passwordarray.filter((item) => {
            return item.id !== id;
          })
        )
      );
    }
    toast("Deleted Successfully !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editPassword = (id) => {
    const selectedItem = passwordarray.find((item) => item.id === id);
    setForm(selectedItem);
    setPasswordarray(
      passwordarray.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (item) => {
    toast("Copied to clipboard !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(item);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div className="master mx-auto max-w-4xl py-4 text-black">
        <h1 className="text-center text-3xl ">Pass-Store</h1>
        <p className="text-center text-sm">Your Own Password Manager</p>
        <div className="container flex flex-col gap-9 p-4 text-black items-center">
          <input
            value={form.site}
            onChange={handlechange}
            className="rounded-full border-2 w-full border-violet-400 py-1 px-4 bg-violet-100"
            placeholder="Enter website URL"
            type="text"
            name="site"
            key="siteInput"
          />

          <div className="container flex justify-between w-full gap-2">
            <input
              value={form.username}
              onChange={handlechange}
              className="smcontainer rounded-full border-2 w-2/3 border-violet-400 py-1 px-4 bg-violet-100"
              placeholder="Enter username"
              type="text"
              name="username"
              key="siteInput"
            />

            <div className="relative">
              <input
                value={form.password}
                ref={ref2}
                onChange={handlechange}
                className="rounded-full border-2 w-full border-violet-400 py-1 px-4 bg-violet-100"
                placeholder="Enter password"
                type="password"
                name="password"
                key="siteInput"
              />
              <span
                className="absolute right-0 top-0.5 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1 mr-3"
                  width={30}
                  src={EyeCross}
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-1 text-black bg-violet-300 hover:bg-violet-400 rounded-full px-3 py-0.5 w-fit border-2 border-violet-400 text-sm"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="w-full overflow-auto" >
          <h2 className="text-center text-xl font-bold mb-5 mt-14">
            Your Passwords
          </h2>
          {passwordarray.length === 0 && (
            <div className="text-center border-2 border-violet-400 w-full my-3 py-4 bg-violet-300 rounded-lg">
              No Passwords to show !
            </div>
          )}

          <div className="tables mb-10">
            {passwordarray.length != 0 && (
              <table className="table-auto w-full border-2 border-violet-400 rounded-xl overflow-auto">
                <thead className="bg-violet-300">
                  <tr>
                    <th className="border-2 py-1 border-violet-300">Website</th>
                    <th className="border-2 py-1 border-violet-300">
                      Username
                    </th>
                    <th className="border-2 py-1 border-violet-300">
                      Password
                    </th>
                    <th className="border-2 py-1 px-14 border-violet-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-violet-100">
                  {passwordarray.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="border-2 py-1 px-4 border-violet-300">
                          <div className="flex items-center justify-center gap-3">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="size-10 mt-2 cursor-pointer"
                              onClick={() => copyText(item.site)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/lomfljuq.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="border-2 py-1 px-4 border-violet-300">
                          <div className="flex items-center justify-center gap-3">
                            {item.username}
                            <div
                              className="size-10 mt-2 cursor-pointer"
                              onClick={() => copyText(item.username)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/lomfljuq.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="border-2 py-1 px-4 border-violet-300">
                          <div className="flex items-center justify-center gap-3">
                            {item.password}
                            <div
                              className="size-10 mt-2 cursor-pointer"
                              onClick={() => copyText(item.password)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/lomfljuq.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="border-2 py-1 px-4 border-violet-300">
                          <div className="flex justify-center items-center gap-3 p-0 m-0">
                            <span>
                              <img
                                onClick={() => deletePassword(item.id)}
                                className="cursor-pointer"
                                src={deleteIcon}
                                alt="Delete"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </span>
                            <span>
                              <img
                                onClick={() => editPassword(item.id)}
                                className="cursor-pointer"
                                src={editIcon}
                                alt="Edit"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
