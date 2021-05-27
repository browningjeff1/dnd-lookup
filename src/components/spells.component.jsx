import React, { useState, useEffect } from "react";
import "../css/spells.css";
import { api } from "../functions/ApiCall";

import AuthService from "../services/auth.service";
export default function Spells(props) {
  const [data, setData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
    fetchData();
  });

  async function fetchData() {
    const spellsData = await api.ApiCall(props.url);
    setData(spellsData);
  }

  const handleClick = (e) => {
    e.preventDefault();
    const url = props.url;
    AuthService.save(url, currentUser);
  };

  return (
    <div>
      {data && (
        <div key={data.index} id={props.id} className="spellContainer">
          <button type="submit" onClick={handleClick}>
            Save
          </button>
          <h3 className="name-container">{data.name}</h3>
          <div className="casting-time-container border">
            <strong className="block">Casting Time: </strong>
            {data.casting_time}
          </div>
          <div className="classes-container border">
            <strong className="block">Classes: </strong>
            {data.classes.map((e) => {
              return (
                <div className="classes" key={e.url}>
                  {e.name}
                </div>
              );
            })}
          </div>
          <div className="components-container border">
            <strong className="block">Components: </strong>
            {data.components.map((component) => {
              return (
                <div className="components" key={component}>
                  {component}
                </div>
              );
            })}
          </div>
          <div className="concentration-container border">
            <strong className="block">Require concentration: </strong>
            {data.concentration.toString()}
          </div>
          <div className="desc-container border">
            <strong className="block">Description: </strong>
            {data.desc.map((des) => {
              return (
                <div className="description" key={des}>
                  {des}
                </div>
              );
            })}
          </div>
          <div className="duration-container border">
            <strong className="block">Duration: </strong>
            {data.duration}
          </div>
          <div className="higher-level-container border">
            <strong className="block">Higher Level: </strong>
            {data.higher_level
              ? data.higher_level.map((level) => {
                  return (
                    <div className="higher-level" key={level}>
                      {level}
                    </div>
                  );
                })
              : "N/A"}
          </div>
          <div className="level-container border">
            <strong className="block">Level Requirement: </strong>
            {data.level.toString()}
          </div>
          <div className="material-container border">
            <strong className="block">Materials Required: </strong>
            {data.material}
          </div>
          <div className="range-container border">
            <strong className="block">Range: </strong>
            {data.range}
          </div>
          <div className="ritual-container border">
            <strong className="block">Require Ritual: </strong>
            {data.ritual.toString()}
          </div>
          <div className="school-container border">
            <strong className="block">School: </strong>
            {data.school.name}
          </div>
          <div className="subclasses-container border">
            <strong className="block">Subclasses: </strong>
            {data.subclasses.map((e) => {
              return <div key={e.url}>{e.name}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
