import React, { useEffect } from 'react'
import { useState } from 'react';
import { api } from '../functions/ApiCall';

export default function Equipment(props) {
  const [data, setData] = useState(null)

  async function fetchData() {
    const result = await api.ApiCall(props.url)
    setData(result)
  }

  useEffect(() => {
    const abortController = new AbortController()
    fetchData()
    return () => {
      abortController.abort()
    }
  }, [])

  console.log(data);

  return(
    <div>
      {data && <div className="equipmentContainer">
        <strong>{ data.name }</strong>
        <div>{ data.equipment_category.name ? data.equipment_category.name : null }</div>
        <div>{ data.gear_category.name }</div>
        <div>{ data.weapon_category }</div>
        <div>{ data.weapon_range }</div>
        <div>{ data.category_range }</div>
        <div>{ data.vehicle_category }</div>
        <div>{ data.cost.quantity }</div>
        <div>{ data.damage }</div>
        <div>{ data.weight }</div>
        <div>{ data.desc }</div>
      </div>}
    </div>
  )
}

console.log();