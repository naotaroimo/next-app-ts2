import { GetStaticProps } from 'next';
import Link from 'next/link';


export interface Person{
   id:number;
   name:string;
   details:string;
}


interface StaticIndexProps{
   persons:Person[];
}

const StaticIndex = ({persons}:StaticIndexProps) =>{
   return (
       <div> 
           <h3>this is test for  GetStaticProps</h3>

           {
               persons.map(
                   (person) =>{
                       return(
                           <div key={person.id}>
                               <Link as={`/persons/${person.id}`} href="/persons/[id].tsx">
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

export default StaticIndex


export const getStaticProps:GetStaticProps = async (ctx) =>{
   
   const response = await fetch('http://localhost:4001/persons');
   const persons = await response.json();
   return {props:{persons}};
}