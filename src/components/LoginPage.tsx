import React, { useState } from "react";
import { RxEyeOpen } from "react-icons/rx";
import { VscEyeClosed } from "react-icons/vsc";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/redux/services/authSlice";

const LoginPage = () => {
    const dispatch:any=useDispatch()
  const [show, setShow] = useState(false);
  const [getLoading, setGetLoading] = useState(false);

  const initialValues = {
    uniqueId: "",
    password: "",
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const validationSchema = Yup.object({
    uniqueId: Yup.string().email("Invalid email format").required("Please enter your email"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Must include uppercase, lowercase, number, and symbol."
      )
      .min(8, "Enter at least 8 characters")
      .required("Please enter your password"),
  });

  const onSubmit = async (values: any) => {
    try {
        let response = await dispatch(login(values)).unwrap();
        if (response.status === 200) {
          toast.success("Login successfull!");
          resetForm();
        } else {
          toast.error(response?.message || "Login failed.");
        }
      } catch (err) {
        toast.error("Something went wrong!");
      } finally {
        setGetLoading(false);
      }
  };

  const {
    handleChange,
    errors,
    touched,
    handleSubmit,
    resetForm,
    handleBlur,
    values,
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <section className="bg-white mx-auto 3xl:w-[386px] 2xl:w-[386px] xl:w-[386px] md:w-[386px] sm:w-[340px] h-[450px] py-6 px-4 space-y-10 border-2 border-gray-300 rounded-xl overflow-none">
        <div className="flex flex-col items-center justify-center space-y-4 h-full">
          <span className="text-black text-3xl py-4 capitalize select-none">
            Welcome
          </span>
          <form onSubmit={handleSubmit} className="flex flex-col w-full h-full">
            <div className="flex flex-col space-y-5 w-full h-full">
              <div>
                <input
                  className="text-black text-md px-4 py-6 border border-gray-300 h-10 w-full rounded-lg focus:outline-none focus:border-gray-400"
                  type="text"
                  name="uniqueId"
                  value={values.uniqueId}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter Your Email Address"
                  autoComplete="off"
                />
                {errors.uniqueId && touched.uniqueId && (
                  <p className="mt-1 px-2 text-red-600 text-sm">{errors.uniqueId}</p>
                )}
              </div>

              <div>
                <div className="relative w-full">
                  <input
                    className="text-black text-md px-4 py-6 border border-gray-300 h-10 w-full rounded-lg focus:outline-none focus:border-gray-400"
                    type={show ? "text" : "password"}
                    name="password"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-blue-600 rounded-e-md focus:outline-none"
                  >
                    {show ? <VscEyeClosed title="Hide Password" /> : <RxEyeOpen title="Show Password" />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="mt-1 px-2 text-red-600 text-sm">{errors.password}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center bg-orange-400 hover:bg-orange-500 text-white text-xl capitalize w-full h-20 rounded-lg"
            >
              {getLoading ? <div className="loader"></div> : "Log In"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
