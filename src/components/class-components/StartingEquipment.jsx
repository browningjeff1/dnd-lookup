import React, { useState, useEffect } from 'react'
import { api } from '../../functions/ApiCall'

export default function StartingEquipment(props) {
  const [startingEquipment, setStartingEquipment] = useState(null)

  async function fetchData() {
    const result = await api.ApiCall(props.url)
    setStartingEquipment(result)
  }

  useEffect(() => {
    const abortController = new AbortController()
    
    fetchData()

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  useEffect(() => () => console.log('unmount'), [] )


  function iteration(e) {
    for (let i = 0; i < e.from.length - 1; i++) {
      return (
        <div>
          { e.from.equipment.name }
        </div>
      )
      
    }
  }

  console.log(startingEquipment);
  return (
    <div>
      {startingEquipment && <div className="border">
        <div className="jumpTarget" id="starting-equipment"><strong>Starting Equipment: </strong>{ startingEquipment.starting_equipment.map((e) =>{
          return (
          <div>
            <br />
            <div>{ e.equipment.name }</div>
            <div><strong>Quantity: </strong>{ e.quantity.toString() }</div>    
          </div>
          )}) 
        }</div>
        <div>{ startingEquipment.starting_equipment_options.map((typeOfEquipment)=> {
          const fromIsArray = (!!typeOfEquipment.from) && (typeOfEquipment.from.constructor === Array)
          const fromIsObject = (!!typeOfEquipment.from) && (typeOfEquipment.from.constructor === Object)
          console.log(typeOfEquipment.from.constructor);
          // when 'from' is an array
          if (fromIsArray) {
            console.log('from is array');
            return (
            <div className="equipment-list">
              <h1>Choose { typeOfEquipment.choose } item:</h1>
              <div>
                { typeOfEquipment.from.map((equipment) => {

                  if (equipment.equipment !== undefined) {
                    return (
                      <div>
                        { equipment.equipment.name }
                      </div>
                    );
                  } 
                  
                  else if (equipment.equipment_option !== undefined) {
                    return(
                      <div>
                        { equipment.equipment_option.from.equipment_category.name }
                      </div>
                    )
                  } 
                  
                  else if (typeOfEquipment.from[0].length > 0 && typeOfEquipment.from[1].length === undefined) {
                    console.log(typeOfEquipment.from[0].length);
                    if (equipment.equipment !== undefined) {
                      return (
                        <div>
                          { equipment.equipment.name }
                        </div>
                      );
                    } 
                    
                    else if (equipment.equipment_option !== undefined) {
                      return(
                        <div>
                          { equipment.equipment_option.from.equipment_category.name }
                        </div>
                      )
                    } 
                    
                    return(
                      <div>
                        { typeOfEquipment.from[0].map((equipment) => {
                          return(
                            <div>
                              { equipment.equipment.name }
                            </div>
                          )
                        }) }
                      </div>
                    )
                  } 
                  
                  else {
                    return(
                      <div>There seems to be a problem</div>
                    )
                  }
                  
                })}
              </div>
            </div>
            );
          }

          // when 'from' is a single object
          else if (fromIsObject) {
            return (
              <div className="equipment-list">
                <h1>Choose { typeOfEquipment.choose } item: </h1>
                <div>
                  <div>
                    { typeOfEquipment.from.equipment_category.name }
                  </div>
                </div>
              </div>
            );
          }

          // there might be something wrong with the api
          return (
            <div className="equipment-list">
              <h1>There seems to be something wrong! Try again later.</h1>
            </div>
          );
        })}</div>
      </div>}
    </div>
  )
}