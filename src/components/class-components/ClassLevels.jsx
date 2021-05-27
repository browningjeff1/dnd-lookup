import React, { useState, useEffect } from "react";
import { api } from "../../functions/ApiCall.js";
import Features from "./features.component.jsx";

export default function ClassLevels(props) {
  const [classLevels, setClassLevels] = useState(null);

  async function fetchData() {
    const result = await api.ApiCall(props.url);
    setClassLevels(result);
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchData();

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      {classLevels && (
        <div className="jumpTarget border" id="class-levels">
          <strong>Class Levels: </strong>
          {classLevels.map((level) => {
            return (
              <div className="level-container">
                <br />
                <div>
                  <strong>Level: </strong>
                  {level.level}
                </div>
                <div>
                  <strong>Ability Score Bonuses: </strong>
                  {level.ability_score_bonuses}
                </div>
                <div>
                  <strong>Proficiency Bonus: </strong>
                  {level.prof_bonus}
                </div>
                <div id="feature-choices">
                  Feature Choices:{" "}
                  {level.features.map((feat) => {
                    return (
                      <div>
                        <div>
                          <strong>{feat.name}</strong>:
                        </div>
                        <div>{<Features url={feat.url} />}</div>
                        <br />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
