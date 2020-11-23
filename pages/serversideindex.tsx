import { GetServerSideProps } from 'next';
import Link from 'next/link';

export interface Person{
   id:number;
   name:string;
   details:string;
}

//コンポーネントで受け取るpropsのデータ型定義
export interface ServerSideIndexProps{
   persons:Person[];
}


const ServerSideIndex = ({persons}:ServerSideIndexProps) =>{
   return (
       <div> 
           <h3>this is test for  GetServerSideProps</h3>
            {
               persons.map(
                   (person)=>{
                       return(
                           <div key={person.id}>
                           <Link as={`/ssrpersons/${person.id}`} href="/ssrpersons/[id].tsx">
                               <a>{person.id}:{person.name}</a>
                           </Link>
                       </div>
                       );
                   }
                   )
           }
           <pre>
               {JSON.stringify(persons,null,4)}
           </pre>


       </div>
   );
}

export default ServerSideIndex


//リクエストごとにデータフェッチ
export const getServerSideProps:GetServerSideProps = async (ctx) =>{
   
   const response = await fetch('http://localhost:4001/persons');
   const persons = await response.json();
   return {props:{persons}};
}