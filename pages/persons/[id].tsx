import { Person } from "../staticindex"; //データ構造はexportしている定義から流用
import { GetStaticProps,GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

export type PersonDetailProps = Person;
//これは以下と同等
//export interface PersonDetailProps extends Person{
//
//}

const PersonDetail =({id,name,details}:PersonDetailProps) =>{
   
   //fallback処理中かの判定
   const router = useRouter();

   if(router.isFallback){
       console.log("now loading");
       return(
           <div>loading....</div>
       );
   }

    return(
       <div>
           this is persons/[id].tsx page!
           <div>hello {name}</div>
           <pre>{details}</pre>
                           
       </div>
   );

}
export default PersonDetail

//データフェッチ
export const getStaticProps:GetStaticProps = async (ctx) =>{
   
   //明示的に文字列型と宣言
   const id = ctx.params?.id as string;
   
   const response = await fetch('http://localhost:4001/persons?id='+id);
   const persons = await response.json();
   
   return {
           props:{
               id:persons[0].id,
               name:persons[0].name,
               details:persons[0].details}
           };

}

//ダイナミックSSGなのでStaticPathを作成
export const getStaticPaths: GetStaticPaths = async () =>{
    const response = await fetch('http://localhost:4001/persons');
    const persons:Person[] = await response.json();
 
    const paths = persons.map(
        (person) =>{
            return {
                params:{ id:person.id.toString() }
            };
    });
 
    return (
        {
            fallback:true,
            paths,
        }
    );
 
 }