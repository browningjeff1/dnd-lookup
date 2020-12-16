import React, { useState, useEffect } from 'react'
import { api } from '../functions/ApiCall'

export default function Skills(props) {
  const [data, setData] = useState(null)

  async function fetchData() {
    const dataResult = await api.ApiCall(props.url);
    setData(dataResult); 
  }

  useEffect(() => {
    const abortController = new AbortController()
    fetchData();

    return () => {
      abortController.abort()
    }
  })

  return(
    <div>
      {data && 
        <div className="skillsContainer">
          <h3 className="name-container">{ data.name }</h3>
          <div className="descContainer border"><strong>Description: </strong>
            {data.desc.map((e) => {
              return(
               <p>{ e }</p>
              )
            })}
          </div>
          <div className="abilityScoreContainer border"><strong>Ability Score: </strong>{ data.ability_score.name }</div>
        </div>
      }
    </div>
  )
}