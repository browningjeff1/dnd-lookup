import React, { useState, useEffect } from "react";
import { api } from "../functions/ApiCall";

export default function AbilityScores(props) {
  const [data, setData] = useState(null);

  async function fetchData() {
    const dataResult = await api.ApiCall(props.url);
    setData(dataResult);
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchData();
    return () => {
      abortController.abort();
    };
  });

  return (
    <div>
      {data && (
        <div className="abilityScoresContainer">
          <h3 className="name-container">{data.full_name}</h3>
          <div className="descContainer border">
            <strong>Description: </strong>
            {data.desc.map((e) => {
              return <p>{e}</p>;
            })}
          </div>
          <div className="border">
            <strong>Skills that use this ability score: </strong>
            {data.skills.map((e) => {
              return <p>{e.name}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
