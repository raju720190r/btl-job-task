import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

const ResultsPage = () => {
    const pdfRef = useRef();
  const [data, SetData] = useState(JSON.parse(localStorage.getItem("project")));
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("formData"))
    );
     const downloadPdf = () => {
       const input = pdfRef.current;
       html2canvas(input).then((canvas) => {
         const imgData = canvas.toDataURL("image/png");
         const pdf = new jsPDF("p", "mm", "a4", true);
         const pdfWidth = pdf.internal.pageSize.getWidth();
         const pdfHeight = pdf.internal.pageSize.getHeight();
         const imgWidth = canvas.width;
         const imgHeight = canvas.height;
         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
         const imgX = (pdfWidth - imgWidth * ratio) / 2;
         const imgY = 30;
         pdf.addImage(
           imgData,
           "PNG",
           imgX,
           imgY,
           imgWidth * ratio,
           imgHeight * ratio
         );
         pdf.save("project.pdf");
       });
     };

  return (
    <div>
      <div ref={pdfRef}>
        <div
          className="h-20 w-full bg-pink-300 text-white text-center"
        >
          <h2 className="items-center text-3xl pt-5 font-bold">
            Project Results
          </h2>
        </div>
        <table className="table max-w-6xl mx-auto mt-5">
          {/* head */}
          <thead>
            <tr className="bg-gray-200 font-bold">
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Client</th>
              <th>Contractor</th>
              <th>Max X</th>
              <th>Min X</th>
              <th>Max Y</th>
              <th>Min Y</th>
              <th>Max Z</th>
              <th>Min Z</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td>{formData?.projectName}</td>
              <td>{formData?.projectDescription}</td>
              <td>{formData?.client}</td>
              <td>{formData?.contractor}</td>
              <td>{data?.max_X}</td>
              <td>{data?.min_X}</td>
              <td>{data?.max_Y}</td>
              <td>{data?.min_Y}</td>
              <td>{data?.max_Z}</td>
              <td>{data?.min_Z}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <button
          className=" btn mt-6  text-white px-8 shadow-lg bg-gradient-to-r from-pink-300 via-pink-200 to-purple-300 rounded-lg"
          onClick={downloadPdf}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
