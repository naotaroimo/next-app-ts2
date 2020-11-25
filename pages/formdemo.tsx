import { Form, Formik, Field, useField} from 'formik';
import {Box, Checkbox, FormControlLabel, FormGroup, MenuItem, TextField} from '@material-ui/core';
import {CheckboxProps} from '@material-ui/core';

//Fomikにあてるフォーム用のデータ構造
import {VtuberDetails} from '../interfaces/vtuberdetails';
import React from 'react';

//Formik用データ構造初期値
const initialValues: VtuberDetails ={
   fullName:'', 
   height:0,
   language:[],
   details:'',
   groupid:-1,
   inAction:false
};

const FormDemo = ()=>{

   return (
       <div>
           {/*入力フォームにFormikを利用する */}
           <Formik initialValues={initialValues} onSubmit={ ()=>{} }>
               {( {values} ) => (
                   <Form>
                       <Box mb={20}>
                       <FormGroup>
                           <Field name ="fullName" as={TextField} label="Full Name" />
                       </FormGroup>
                       </Box>

                       <Box mb={2}>
                       <FormGroup>
                           {/* material-uiのtype props でnumber指定 */}
                           <Field name ="height" as={TextField} type="number" label="height"/>
                       </FormGroup>
                       </Box>

                       {/* type でcheckbox指定 */}
                       <Box mb={2}>
                       <FormGroup>
                            <label>
                                <Field name ="language" as={Checkbox} value="japanese" />
                                japanese
                            </label>
                            <label>
                                <Field name ="language" as={Checkbox} value="english" />
                                english
                            </label>
                            <label>
                                <Field name ="language" as={Checkbox} value="other" label="japanese"/>
                                other
                            </label>
                       </FormGroup>
                       </Box>

                       <Box mb={2}>
                       <FormGroup>
                           {/* マルチラインのtextarea相当 */}
                           <Field name ="details" as={TextField} multiline rows={5}/>
                       </FormGroup>
                       </Box>

                       {/* option */}
                       <Box mb={2}>
                       <FormGroup>
                           {/* textFeildのselect propでセレクトフォームを作成する */}
                           <Field name ="groupid" as={TextField} select>
                               <MenuItem value={-1}>----</MenuItem>
                               <MenuItem value={0}>freelance</MenuItem>
                               <MenuItem value={1}>VOMS</MenuItem>
                               <MenuItem value={2}>holostars</MenuItem>
                               <MenuItem value={3}>nijisanji</MenuItem>
                               <MenuItem value={4}>hololive</MenuItem>
                               <MenuItem value={5}>animare</MenuItem>
                           </Field>
                       </FormGroup>
                       </Box>

                       <Box mb={2}>
                       <FormGroup>
                           <MyCheckbox name ="inAction" label="inAction"/>
                           </FormGroup>
                       </Box>

                       {/* カスタムコンポーネントでmaterial-uiとformikの紐づけ */}
                       <Box mb={2}>
                       <FormGroup>
                           <MyCheckbox name ="language" value="japanese" label="japanese"/>
                           <MyCheckbox name ="language" value="english" label="english"/>
                           <MyCheckbox name ="language" value="other" label="other"/>
                       </FormGroup>
                       </Box>

                       <pre>{JSON.stringify(values,null,4)}</pre>
                   </Form>
               )}
           </Formik>
       </div>
   );
}

export default FormDemo


//
//カスタムコンポーネントが受け取るデータの構造
export interface MyCheckboxProps extends CheckboxProps{
    name: string;
    value?: string|number;
    label?:string;
 }

//カスタムコンポーネント
const MyCheckbox = (props:MyCheckboxProps)=>{

    //useFieldでreact custom hook
    const [field] = useField({
        name:props.name,
        type:'checkbox',
        value:props.value
    })


return(
    <FormControlLabel control={ <Checkbox {...props} {...field} /> } label={props.label}/>
);
}