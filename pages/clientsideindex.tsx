import {useState, useEffect} from 'react';

//クライアントサイドレンダリング
const ClientSideIndex =()=>{

   //react hook
   const [persons,setPersons] = useState([]);

   useEffect(
       ()=>{
           async function loadData(){
               const response = await fetch('http://localhost:4001/persons');
               const personsList = await response.json();
               setPersons(personsList);
           }
        //コンポーネントのレンダリングの直前に実行
        loadData();

       },[]);//マウント・アンマウント時に必ず実行


       return(
           <div>
               <h3>this is client side rendering</h3>
               <pre>
                   {JSON.stringify(persons,null,4)}
               </pre>
           </div>
       );

}

export default ClientSideIndex
