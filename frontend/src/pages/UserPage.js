import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components/macro";

import Logo from "components/Logo";
import MarathonList from "components/MarathonList";
import Profile from "components/Profile";

import user from "../reducers/user";

const UserPage = () => {
  const [display, setDisplay] = useState("races");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    confirm("Logout?");
    dispatch(user.actions.setAccessToken(null));
    alert("Tack för besöket!");
    navigate("/");
  };

  const deleteAccount = () => {
    confirm("Do you want to delete your account?");
  };

  return (
    <>
      <header>
        <Link to="/">
          <Logo />
        </Link>
        <nav>
          <button onClick={() => setDisplay("races")}>All races</button>
          <button onClick={() => setDisplay("profile")}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <main>
        <>
          {display === "races" && <MarathonList displayMode="all" />}
          {display === "profile" && <Profile />}
        </>
      </main>
      <footer>
        <p>
          Click<button onClick={deleteAccount}>here</button>to delete your
          account
        </p>
      </footer>
    </>
  );
};

export default UserPage;
