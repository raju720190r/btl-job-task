import { useState } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Bar } from "react-chartjs-2";

const FormTwo = ({ formData }) => {
  
  const [csvData, setCsvData] = useState([]);

  const [fileUploaded, setFileUploaded] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});
  const [maxX, setMaxX] = useState(0);
  const [minX, setMinX] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const [minY, setMinY] = useState(0);
  const [maxZ, setMaxZ] = useState(0);
  const [minZ, setMinZ] = useState(0);
  const navigate = useNavigate();

  const [chartData, setChartData] = useState([]);
  const datas = chartData.filter(
    (x) => !isNaN(x.KP) & !isNaN(x.X) & !isNaN(x.Y) & !isNaN(x.Z)
  );
  const [Datas, setDatas] = useState({});


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target.result;
        Papa.parse(csvContent, {
          complete: handleCsvParsed,
        });
      };
      reader.readAsText(file);
      setFileUploaded(true);
    }
  };
  const handleCsvParsed = (result) => {
    const parsedCsvData = result.data;

    setCsvData(parsedCsvData);
    const dataObjects = parsedCsvData.map((row) => ({
      KP: parseInt(row[0]),
      X: parseFloat(row[1]),
      Y: parseFloat(row[2]),
      Z: parseFloat(row[3]),
    }));
    setChartData(dataObjects);
    updateMinMaxValues(dataObjects);
  };
  const updateMinMaxValues = (dataObjects) => {
    const kpValues = dataObjects
      .map((row) => row.KP)
      .filter((value) => !isNaN(value));
    const xValues = dataObjects
      .map((row) => row.X)
      .filter((value) => !isNaN(value));
    const yValues = dataObjects
      .map((row) => row.Y)
      .filter((value) => !isNaN(value));
    const zValues = dataObjects
      .map((row) => row.Z)
      .filter((value) => !isNaN(value));

    const maxX = Math.max(...xValues);
    const minX = Math.min(...xValues);
    const maxY = Math.max(...yValues);
    const minY = Math.min(...yValues);
    const maxZ = Math.max(...zValues);
    const minZ = Math.min(...zValues);

    setDatas({
      kpValues,
      max_X: maxX,
      min_X: minX,
      max_Y: maxY,
      min_Y: minY,
      max_Z: maxZ,
      min_Z: minZ,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let max_X = e.target.max_X.value;
    let min_X = e.target.min_X.value;
    let max_Y = e.target.max_Y.value;
    let min_Y = e.target.min_Y.value;
    let max_Z = e.target.max_Z.value;
    let min_Z = e.target.min_Z.value;
    if (
      !fileUploaded &&
      (max_X === "" ||
        min_X === "" ||
        max_Y === "" ||
        min_Y === "" ||
        max_Z === "" ||
        min_Z === "")
    ) {
      return;
    }
    if (!fileUploaded) {
      max_X = maxX;
      min_X = minX;
      max_Y = maxY;
      min_Y = minY;
      max_Z = maxZ;
      min_Z = minZ;
    }

    const projectDetails = {
      max_X,
      min_X,
      max_Y,
      min_Y,
      max_Z,
      min_Z,
    };

    setProjectDetails(projectDetails);
    localStorage.setItem("project", JSON.stringify(projectDetails, formData));
    navigate("/results");
  };

  return (
    <div>
      <div className="h-20 w-full  bg-pink-300 text-white text-center">
        <h2 className="items-center text-3xl pt-5 text-white font-bold">
          Project Information Displayed
        </h2>
      </div>
      <div className="max-w-6xl mx-auto">
        <table className="table rounded-none bg-gray-200 mt-5">
          {/* head */}
          <thead>
            <tr className="font-bold text-xl">
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Client</th>
              <th>Contractor</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>{formData.projectName}</th>
              <td>{formData.projectDescription}</td>
              <td>{formData.client}</td>
              <td>{formData.contractor}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Cvs Data Show */}
      <div>
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          {fileUploaded === true ? (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  max_X
                </label>

                <input
                  type="number"
                  name="max_X"
                  defaultValue={Datas.max_X}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter max_X value"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  min_X
                </label>
                <input
                  type="number"
                  name="min_X"
                  defaultValue={Datas.min_X}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter min_X value"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  max_Y
                </label>
                <input
                  type="number"
                  name="max_Y"
                  defaultValue={Datas.max_Y}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter max_Y value"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  min_Y
                </label>
                <input
                  type="number"
                  name="min_Y"
                  defaultValue={Datas.min_Y}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter min_Y value"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  max_Z
                </label>
                <input
                  type="number"
                  name="max_Z"
                  defaultValue={Datas.max_Z}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter max_Z value"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  min_Z
                </label>
                <input
                  type="number"
                  name="min_Z"
                  defaultValue={Datas.min_Z}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter min_Z value"
                  readOnly
                />
              </div>
            </section>
          ) : (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  max_X
                </label>
                <input
                  type="number"
                  name="max_X"
                  onChange={(e) => setMaxX(e.target.value)}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter max_X value"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  min_X
                </label>
                <input
                  type="number"
                  name="min_X"
                  onChange={(e) => setMinX(e.target.value)}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter min_X value"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  max_Y
                </label>
                <input
                  type="number"
                  name="max_Y"
                  onChange={(e) => setMaxY(e.target.value)}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter max_Y value"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  min_Y
                </label>
                <input
                  type="number"
                  name="min_Y"
                  onChange={(e) => setMinY(e.target.value)}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter min_Y value"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  max_Z
                </label>
                <input
                  type="number"
                  name="max_Z"
                  onChange={(e) => setMaxZ(e.target.value)}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter max_Z value"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-400 mb-2">
                  min_Z
                </label>
                <input
                  type="number"
                  name="min_Z"
                  onChange={(e) => setMinZ(e.target.value)}
                  className="w-full rounded-2xl border  ps-10 py-2 "
                  placeholder="Enter min_Z value"
                />
              </div>
            </section>
          )}

          <div className="grid grid-cols-2">
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Upload Your CVS File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
              />
            </div>
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="KP" />
                  <YAxis dataKey="X" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="X" fill="#cf179a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="my-10 text-center">
            <button className=" btn lg:w-72 w-full  text-white px-8   bg-gradient-to-r from-pink-100 via-pink-300 to-pink-500 shadow-lg shadow-pink-300 ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTwo;
