import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components/macro";

import { API_URL } from "utils/urls";
import Loader from "components/Loader";
// import Map from "components/Map";

const MarathonPage = () => {
  const { id } = useParams();
  const [marathon, setMarathon] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL(`marathons/${id}`))
      .then((res) => res.json())
      .then((data) => {
        setMarathon(data.response);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>{marathon.name}</h2>
          <Link to="/userpage">Back</Link>
        </>
      )}
    </div>
  );
};

export default MarathonPage;
