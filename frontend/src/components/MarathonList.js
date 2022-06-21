import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";

import { API_URL } from "../utils/urls";
import Loader from "./Loader";
import MarathonCard from "./MarathonCard";

import ui from "../reducers/ui";
import user from "../reducers/user";

const CardContainer = styled.section`
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

// displayMode is either "all" or "bucket"
const MarathonList = ({ displayMode }) => {
  const [marathonList, setMarathonList] = useState([]);

  const userId = useSelector((store) => store.user.userId);
  const isLoading = useSelector((store) => store.ui.isLoading);

  const dispatch = useDispatch();

  const getAllMarathons = () => {
    dispatch(ui.actions.setLoading(true));

    fetch(API_URL("marathons"))
      .then((res) => res.json())
      .then((data) => setMarathonList(data))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)));
  };

  const getBucketMarathons = () => {
    dispatch(ui.actions.setLoading(true));

    fetch(API_URL(`users/${userId}/marathons`))
      .then((res) => res.json())
      .then((data) => setMarathonList(data.response.marathons))
      .catch((error) => console.error(error))
      .finally(() => dispatch(ui.actions.setLoading(false)));
  };

  if (displayMode === "all") {
    useEffect(() => {
      getAllMarathons();
    }, []);
  } else if (displayMode === "bucket") {
    useEffect(() => {
      getBucketMarathons();
    }, []);
  }

  let text = "Leva loppan";

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Race list</h1>
          {displayMode === "all" && <h2>Add or delete marathons</h2>}
          {displayMode === "bucket" && <h3>{text}</h3>}
          <CardContainer>
            {marathonList.map((marathon) => (
              <MarathonCard
                key={marathon._id}
                id={marathon._id}
                name={marathon.name}
                city={marathon.city}
                image={marathon.image}
              />
            ))}
          </CardContainer>
        </>
      )}
    </>
  );
};

export default MarathonList;
