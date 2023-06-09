import React, { useEffect, useRef, useState } from 'react'

const FormInput = () => {
    const iName=useRef('');
    const iProductId=useRef();
    const iCatagorey=useRef('');
    const iPrice= useRef('');

    const [storeData,setStoreData] = useState([]);
    const [total,setTotal] = useState(0);

    useEffect(()=>{
        const storedData = localStorage.getItem('storeData');
        if(storedData){
            setStoreData(JSON.parse(storedData));
        }

        const storedTotal = localStorage.getItem('total');
        if(storedTotal){
            setTotal(JSON.parse(storedTotal));
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('storeData', JSON.stringify(storeData));

    },[storeData]);

    useEffect(()=>{
        localStorage.setItem('total', parseInt(total));

    },[total])

    const addBtnHandler=(e)=>{
        e.preventDefault();
        setTotal(total+parseInt(iPrice.current.value));
        setStoreData((prevData)=>{
            return [...prevData,{name:iName.current.value, pId:iProductId.current.value, catagorey:iCatagorey.current.value,price:iPrice.current.value,id:Math.random().toString()}]
        });
    }
    const deleteBtn=(id)=>{
        const targetData= storeData.find((d)=>d.id == id);
        const updateData = storeData.filter((d)=>d.id != id);
        setStoreData(updateData);
        setTotal(total-targetData.price);
    }

  return (
    <>
      <form>
        <label htmlFor='pid'>Product Id</label>
        <input id='pid' type='number' ref={iProductId}></input>

        <label htmlFor='price'>Selling Price</label>
        <input id='price' type='number' ref={iPrice}></input>

        <label htmlFor='name'>Product Name</label>
        <input id='name' type='text' ref={iName}></input>

        <label htmlFor='option'>Choose a Ctagorey</label>
        <select id='option' ref={iCatagorey}>
            <option value="Electronics">Electronics</option>
            <option value="Food">Food</option>
            <option value="Skin Care">Skin Care</option>

        </select>

        <button type='submit' onClick={addBtnHandler}>Add Product</button>
      </form>
      <h1>Products</h1>
     
      <h3 id='electronics'> Electronics </h3>
     
      {storeData.map((data)=>{
        return (data.catagorey == 'Electronics' ?
            <li key={data.id}>{data.price} - {data.catagorey} - {data.name} <button onClick={()=>deleteBtn(data.id)}>Delete</button></li>:'')
      })}

      <h3 id='food'> Food </h3>
      {storeData.map((data)=>{
        return (data.catagorey =='Food' ?
            <li key={data.id}>{data.price} - {data.catagorey} - {data.name} <button onClick={()=>deleteBtn(data.id)}>Delete</button></li>:'')
      })}
      <h3 id='skin'> Skin Care </h3>
      {storeData.map((data)=>{
        return (data.catagorey == 'Skin Care' ?
            <li key={data.id}>{data.price} - {data.catagorey} - {data.name} <button onClick={()=>deleteBtn(data.id)}>Delete</button></li>:'')
      })}
    </>
  )
}

export default FormInput
