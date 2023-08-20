import { useState } from "react";
import { Link } from "react-router-dom";

const FormOne = ({ onNext }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [client, setClient] = useState("");
  const [contractor, setContractor] = useState("");

  const handleNext = () => {
    const formData = {
      projectName,
      projectDescription,
      client,
      contractor,
    };
     localStorage.setItem("formData", JSON.stringify(formData));
     onNext(formData);
  };
  return (
    <div>
      <div className="h-20 w-full  bg-pink-300 text-white text-center">
        <h2 className="items-center text-3xl pt-5 font-bold">
          Project Information
        </h2>
      </div>
      <div className="max-w-5xl mx-auto mt-5 bg-gray-200 text-center p-5">
        <div className=" text-center  grid gap-10 grid-cols-2">
          <input
            type="text"
            className="border p-2 rounded-xl"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 rounded-xl"
            placeholder="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 rounded-xl"
            placeholder="Client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 rounded-xl"
            placeholder="Contractor"
            value={contractor}
            onChange={(e) => setContractor(e.target.value)}
          />
        </div>
        <button
          className="btn bg-pink-200 hover:bg-pink-400 mt-5"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormOne;
