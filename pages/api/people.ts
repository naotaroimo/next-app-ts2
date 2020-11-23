import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../openDB';

export default async function getPeople (req:NextApiRequest,res:NextApiResponse){

   //db接続
   const db = await openDB();

   const people = await db.all('select * from person');

   res.status(200).json(people);

}