import React, { useState, useEffect } from "react";

import "../css/monsters.css";
import { api } from "../functions/ApiCall";

export default function Monsters(props) {
  const [data, setData] = useState(null);
  const [fixed_arr, setFiexdArr] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      let map_senses = new Map(Object.entries(data.senses));
      let arr_senses = Array.from(map_senses);
      setFiexdArr(loopNestArr(arr_senses));
    }
  }, [data]);

  async function fetchData() {
    let monsterData = await api.ApiCall(props.url);
    setData(monsterData);
  }

  const loopNestArr = (array) => {
    if (array) {
      let arr = array;
      let arr_length = arr.length;
      for (let i = 0; i < arr_length; i++) {
        let el = arr[i];
        let el_length = el.length;
        for (let j = 0; j < el_length; j++) {
          let item = el.shift();
          let thing = item.replace("_", " ");
          let word = capitalizeFLetter(thing);
          el.splice(0, 0, word);
        }
      }
      return arr;
    } else {
      return null;
    }
  };

  const capitalizeFLetter = (s) => {
    if (s) {
      var splitStr = s.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      // Directly return the joined string
      return splitStr.join(" ");
    } else {
      return s;
    }
  };

  return (
    <div>
      {data && (
        <div>
          <div className="name-container">{data.name}</div>
          <div className="border">
            <strong>Size: </strong>
            {data.size}
          </div>
          <div className="border" id="type">
            <strong>Type: </strong>
            {capitalizeFLetter(data.type)}
          </div>
          <div className="border">
            <strong>Subtype: </strong>
            {data.subtype ? capitalizeFLetter(data.subtype) : "None"}
          </div>
          <div className="border">
            <strong>Alignment: </strong>
            {capitalizeFLetter(data.alignment)}
          </div>
          <div className="border">
            <strong>Armor Class: </strong>
            {data.armor_class.toString()}
          </div>
          <div className="border">
            <strong>Hit Points: </strong>
            {data.hit_points.toString()}
          </div>
          <div className="border">
            <strong>Hit Dice: </strong>
            {data.hit_dice}
          </div>
          <div className="border">
            <strong>Speeds: </strong>
            <li>Walking Speed: {data.speed.walk ? data.speed.walk : "N/A"}</li>
            <li>Flying Speed: {data.speed.fly ? data.speed.fly : "N/A"}</li>
            <li>Swimming Speed: {data.speed.swim ? data.speed.swim : "N/A"}</li>
          </div>
          <div className="border">
            <div>
              <strong>Strength: </strong>
              {data.strength.toString()}
            </div>
            <div>
              <strong>Dexterity: </strong>
              {data.dexterity.toString()}
            </div>
            <div>
              <strong>Constitution: </strong>
              {data.constitution.toString()}
            </div>
            <div>
              <strong>Intelligence: </strong>
              {data.intelligence.toString()}
            </div>
            <div>
              <strong>Wisdom: </strong>
              {data.wisdom.toString()}
            </div>
            <div>
              <strong>Charisma:</strong>
              {data.charisma.toString()}
            </div>
          </div>
          <div className="border">
            <strong>Proficiencies: </strong>
            {data.proficiencies.map((e) => {
              return (
                <div>
                  <div>{e.name}</div>
                  <div>Value: {e.value}</div>
                </div>
              );
            })}
          </div>
          {data.damage_vulnerabilities.length ? (
            <div className="border">
              <strong>Damage Vulnerabilities: </strong>
              {data.damage_vulnerabilities.map((e) => {
                return <div>{e}</div>;
              })}
            </div>
          ) : null}
          {data.damage_resistances.length ? (
            <div className="border">
              <strong>Damage Resistances: </strong>
              {data.damage_resistances.map((e) => {
                return <div>{e}</div>;
              })}
            </div>
          ) : null}
          {data.damage_immunities.length ? (
            <div className="border">
              <strong>Damage Immunities: </strong>
              {data.damage_immunities.map((e) => {
                return <div>{capitalizeFLetter(e)}</div>;
              })}
            </div>
          ) : null}
          {data.condition_immunities.length ? (
            <div className="border">
              <strong>Condition Immunities: </strong>
              {data.condition_immunities.map((e) => {
                return <div>{capitalizeFLetter(e)}</div>;
              })}
            </div>
          ) : null}
          <div className="border">
            <strong>Senses:</strong>

            {fixed_arr &&
              fixed_arr.map((el) => {
                return <li>{capitalizeFLetter(el.join(": "))}</li>;
              })}
          </div>
          <div className="border">
            <strong>Languages: </strong>
            {capitalizeFLetter(data.languages)}
          </div>
          <div className="border">
            <strong>Challenge Rating: </strong>
            {data.challenge_rating.toString()}
          </div>
          <div className="border">
            <strong>Special Abilities: </strong>
            {data.special_abilities.map((e) => {
              return (
                <div>
                  <div>
                    <strong>{e.name}</strong>
                  </div>
                  <div>Description: {e.desc}</div>
                </div>
              );
            })}
          </div>
          <div className="border">
            <strong>Actions: </strong>
            {data.actions.map((e) => {
              return (
                <div>
                  <div>
                    <strong>{e.name}</strong>
                  </div>
                  <div>Description: {e.desc}</div>
                </div>
              );
            })}
          </div>
          {data.legendary_actions ? (
            <div className="border">
              <strong>Legendary Actions: </strong>
              {data.legendary_actions.map((e) => {
                return (
                  <div>
                    <div>
                      <strong>{e.name}</strong>
                    </div>
                    <div>Description: {e.desc}</div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
