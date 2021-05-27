import React, { useState, useEffect } from "react";
import { api } from "../functions/ApiCall";

export default function Proficiencies(props) {
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
        <div className="proficienciesContainer">
          <h3 className="name-container">{data.name}</h3>
          <div className="profClassesContainer border">
            {data.classes.length &&
              data.classes.map((profClass) => {
                return <div key={profClass.index}>{profClass.name}</div>;
              })}
          </div>
          <div className="profRacesContainer border">
            {data.races.length &&
              data.races.map((races) => {
                return <div key={races.index}>{races.name}</div>;
              })}
          </div>
        </div>
      )}
    </div>
  );
}
