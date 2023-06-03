import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBooks() {
  const Navigate = useNavigate();
  // const [name, setName] = useState("Harsh");
  // const [email, setEmail] = useState("20it033@charusat.edu.in");
  const [user, setUser] = useState([]);
  const [id, setId] = useState([]);
  const initialValues = {
    id: "",
    name: "",
    price: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Enter more than 3 characters"),
    email: Yup.string().email("Enter valid email address"),
  });
  //useeffect:if array is empty means when page will be loaded it will excuted
  //useeffect:if array is filled with variables,it will check changes in varibles if it will be then will be excuted
  useEffect(() => {
    // console.log("New value of name:" + name);
    // return () => {
    //   console.log("Old value of name:" + name);
    // };
    axios
      .get("http://localhost:4000/app/showAllBooks")
      .then((res) => {
        setUser(res.data);
        //console.log(user.length);
      })
      .catch();
  }, []);
  function toHome() {
    //alert("You want to home page!");
    //let name = prompt("What is your name?");
    //console.log(name);
    //console.log(window);
    // let confirm = window.confirm("Do you want to navigate to home?");
    // if (confirm) {
    Navigate("/");
    // }
    // console.log(`name:${name},email:${email}`);
  }
  // function openPopover() {
  //   if (open) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  // }
  const onFormSubmit = (values, { resetForm }) => {
    // console.log("Name:" + name);
    // console.log("Email:" + email);
    console.log("On the form submit", values);
    // const requestData = {
    //   userName: values.name,
    //   userEmail: values.email,
    // }

    // axios.post("https://jsonplaceholder.typicode.com/posts",requestData);
    values.id = user[user.length - 1].id + 1;
    axios
      .post("http://localhost:4000/app/addBook", values)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data.id);
          // toast("Success on form submission!");
          toast.success("Book added!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        toast.error("Error to add book!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
    resetForm({ values: "" });
  };

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          padding: 10,
          rowGap: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onFormSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <ThemeProvider theme={theme}>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Name"
                    name="name"
                    placeholder="enter name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.name && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {formik.errors.name}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="float"
                    variant="outlined"
                    label="Price"
                    name="price"
                    value={formik.values.price}
                    placeholder="enter price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.email && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {formik.errors.email}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Description"
                    name="description"
                    placeholder="enter description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.email && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {formik.errors.email}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ margin: 10 }}
                >
                  add book
                </Button>
              </ThemeProvider>
            </form>
          )}
        </Formik>
      </div>

      <ToastContainer />
    </div>
  );
}
