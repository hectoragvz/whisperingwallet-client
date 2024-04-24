/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { FormControl, FormHelperText } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

function Form({ route, method }) {
  const [loading, setLoading] = useState(false);

  const name = method === "login" ? "Login" : "Register";

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await api.post(route, data);
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/expenses");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <div className="pt-40 flex justify-center items-center">
        <div className="text-center rounded-xl p-5 pr-20 pl-20 ">
          <h1 className=" text-2xl font-bold ">
            {name} to begin your tracking
          </h1>

          <FormControl
            className="mt-2 mx-auto max-w-90 flex flex-col w-90 "
            onSubmit={onSubmit}
          >
            <input
              className="text-black mb-3 mt-2 rounded-md bg-slate-100 p-2 border border-stone-500"
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />

            <input
              className="text-black mb-1 rounded-md bg-slate-100 p-2 border border-stone-500"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />

            {name === "Register" && (
              <FormHelperText className="text-stone-500 font-semibold ">
                We will never share your password 🤐
              </FormHelperText>
            )}
            {loading ? (
              <Button
                colorScheme="messenger"
                isLoading
                loadingText="Submitting"
                type="submit"
                onClick={onSubmit}
                className="mt-5  mb-5"
              >
                {name}
              </Button>
            ) : (
              <Button
                colorScheme="messenger"
                type="submit"
                onClick={onSubmit}
                className="mt-5 mb-5"
              >
                {name}
              </Button>
            )}
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default Form;
