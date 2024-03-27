"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { countryList } from "@/data/countryList";
import { Modal } from "./Modal";

export const Form = () => {
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const schema = yup.object().shape({
    fname: yup
      .string()
      .max(20, "Must be at most 20 characters")
      .required("First name is required!"),
    lname: yup
      .string()
      .max(20, "Must be at most 20 characters")
      .required("Last name is required!"),
    street: yup
      .string()
      .max(60, "Must be at most 60 characters!")
      .required("Street name is required!"),
    city: yup.string().required("City is required!"),
    state: yup.string().required("State is required!"),
    country: yup.string().required("Country is required!"),
    zipCode: yup
      .string()
      .matches(/^\d{2,5}|([\s\-]-\d{3})?$/, "Invalid ZIP Code")
      .required("Zip code is required!"),
    email: yup.string().required("Email is required!").email("Invalid email!"),

    areaCode: yup
      .string()
      .nullable()
      .test("is-blank", "Invalid code", function (value) {
        return !value || /^\+\d{1,3}$/.test(value);
      }),

    phoneNumber: yup
      .string()
      .nullable()
      .test("is-blank", "Invalid phone", function (value) {
        return !value || /^(\(\d{1,3}\)|\d{1,3})[\s\-]|\d{2,8}$/.test(value);
      }),

    message: yup.string().max(300, "Message must be at most 300 characters!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    console.log(data);
    setShowModal(true);
    setFormData(data);
  };

  useEffect((data) => {
    if (isSubmitSuccessful) {
      reset(data);
    }
  });

  const countries = countryList.map((country) => (
    <option
      key={country.value}
      value={country.value}
      className=" text-gray-500"
    >
      {country.label}
    </option>
  ));

  return (
    <div className="flex flex-col items-center px-2">
      <h1 className="text-3xl text-center my-2 mt-4 md:text-5xl">
        Membership Application
      </h1>
      <p className="text-center px-3 pb-3 text-gray-400 md:text-xl">
        To apply for membership please complete all questions.
      </p>

      <div
        className="w-[90%] py-4
md:w-[70%] lg:w-[50%] xl:w-[45%] pb-8 bg-purple-700/50 
rounded-lg mb-5"
      >
        <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
          <label htmlFor="fname" className="font-medium mt-3 ml-5">
            Name
          </label>

          {/* NAME */}

          <div className="mt-2 flex flex-col gap-3 mx-5 md:flex-row md:gap-3">
            <div className="w-full">
              <input
                type="text"
                placeholder="First name"
                className="pl-1 w-full"
                id="fname"
                {...register("fname")}
              ></input>

              <div>
                {errors.fname && (
                  <p className="text-red-600">{errors.fname.message}</p>
                )}
              </div>
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Last name"
                className="pl-1 w-full "
                id="lname"
                {...register("lname")}
              ></input>

              <div>
                {errors.lname && (
                  <p className="text-red-600">{errors.lname.message}</p>
                )}
              </div>
            </div>
          </div>

          {/*ADDRESS*/}

          <div className="mx-5 mt-3 flex flex-col">
            <label htmlFor="street" className="font-medium pb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="1234 Elm Street, Apt 450, Building C"
              className="pl-1"
              id="street"
              {...register("street")}
            ></input>
            <div>
              {errors.street && (
                <p className="text-red-600">{errors.street.message}</p>
              )}
            </div>

            {/*city*/}

            <div className="flex mt-3 gap-3">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="City"
                  id="city"
                  className="pl-1 w-full"
                  {...register("city")}
                ></input>
                <div>
                  {errors.city && (
                    <p className="text-red-600">{errors.city.message}</p>
                  )}
                </div>
              </div>

              {/*State*/}
              <div className="w-full">
                <input
                  type="text"
                  placeholder="State"
                  id="state"
                  className="w-full pl-1"
                  {...register("state")}
                ></input>
                <div>
                  {errors.state && (
                    <p className="text-red-600">{errors.state.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/*Country*/}

            <div className="flex mt-3 gap-3">
              <div className="w-full">
                <select
                  name="country"
                  id="country"
                  className="pl-1 w-full text-gray-300/70"
                  {...register("country")}
                >
                  <option value="">Country</option>
                  {countries}
                </select>

                <div>
                  {errors.country && (
                    <p className="text-red-600">{errors.country.message}</p>
                  )}
                </div>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  id="zipCode"
                  placeholder="Zip Code"
                  className="pl-1 w-full"
                  {...register("zipCode")}
                ></input>
                <div>
                  {errors.zipCode && (
                    <p className="text-red-600">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* EMAIL*/}

          <div className="mx-5 md:flex gap-3">
            <div className="mt-3 flex flex-col md:w-2/4">
              <label htmlFor="email" className="font-medium pb-2">
                Email
              </label>
              <input
                type="text"
                placeholder="example@email.com"
                autoComplete="on"
                id="email"
                className="pl-1"
                {...register("email")}
              ></input>
              <div>
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* PHONE*/}

            <div className="mt-3 flex flex-col md:w-2/4">
              <label htmlFor="areaCode" className="font-medium pb-2">
                Phone
              </label>
              <div className="flex gap-3 w-full">
                <div className="flex flex-col w-[20%]">
                  <input
                    type="text"
                    id="areaCode"
                    className="px-1"
                    placeholder="+55"
                    {...register("areaCode")}
                  ></input>
                  <div className="">
                    {errors.areaCode && (
                      <p className="text-red-600">{errors.areaCode.message}</p>
                    )}
                  </div>
                </div>

                <div className="w-[87%]">
                  <input
                    type="text"
                    id="phoneNumber"
                    className="pl-1 w-full"
                    placeholder="065 99915 4567"
                    {...register("phoneNumber")}
                  ></input>
                  <div>
                    {errors.phoneNumber && (
                      <p className="text-red-600">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MESSAGE*/}
          <div className="flex flex-col mt-3 mx-5">
            <label htmlFor="message" className="font-medium pb-2">
              Message
            </label>
            <textarea
              id="message"
              className="pl-1 py-1"
              placeholder="Leave your message here..."
              {...register("message")}
            ></textarea>
            <div>
              {errors.message && (
                <p className="text-red-600">{errors.message.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-5 h-[38px]">
            <button
              type="submit"
              className="bg-green-300
               md:hover:bg-green-400 w-full 
               mx-5 md:hover:text-lg rounded-lg font-bold
                text-purple-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <Modal formData={formData} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};
