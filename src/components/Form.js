import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from "yup";

// form schema
const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    size: yup.string().required("Must Select a Size"),
    pepperoni: yup.boolean().defined(),
    mushrooms: yup.boolean().defined(),
    peppers: yup.boolean().defined(),
    sausage: yup.boolean().defined(),
    specInstr: yup.string().notRequired()
  });

export default function Form(){
// states
    //state for form
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        pepperoni: false,
        mushrooms: false,
        peppers: false,
        sausage: false,
        specInstr: ""
    })
    //state for errors
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni: "",
        mushrooms: "",
        peppers: "",
        sausage: "",
        specInstr: ""
    })
    //state for button
    const [buttonDisabled, setButtonDisabled] = useState(true);
    //state for post
    const [post, setPost] = useState([]);
// event handlers
    // input change
    const inputChange = e => {
        e.persist();
        const newFormData = {
          ...formState,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
      };
    // button disabled
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [formState]);
    // validate changes
    const validateChange = e => {
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.errors[0]
            });
          });
      };
    // on submit
    const formSubmit = e => {
        e.preventDefault();
        // axios error!
        axios
          .post("https://reqres.in/api/users", formState)
          .then(res => {
            setPost(res.data);
            console.log("success", post);
            console.log(res.data.size)
            setFormState({
                name: "",
                size: res.data.size,
                pepperoni: false,
                mushrooms: false,
                peppers: false,
                sausage: false,
                specInstr: ""
            });
          })
          .catch(err => console.log(err.response));
      };
} 