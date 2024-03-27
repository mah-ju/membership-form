export const Modal = ({ formData, onClose }) => {
  return (
    <div className="bg-black/80 w-full h-full px-5 fixed flex justify-center items-center">
      <div className="w-[600px] bg-purple-900 rounded-lg pb-8 pt-5">
        <h2 className="text-4xl text-green-300 text-center font-bold py-3">
          Wellcome our community!
        </h2>
        <p className="text-2xl mx-8 text-justify font-thin text-gray-300">
          Hi, <strong>{formData.fname}</strong>{" "}
          <strong>{formData.lname}</strong>. Now you are part of our time! We
          are glad have you with us!{" "}
          <p className="pt-4 text-center">
            {" "}
            Wait for more informations in you email{" "}
            <strong>{formData.email} </strong>{" "}
          </p>
        </p>
        <p className="text-center text-2xl mt-4 font-bold text-gray-300">
          See you soon!
        </p>
        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="bg-green-300 px-8 py-1 rounded-lg font-bold text-lg text-purple-800"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};
