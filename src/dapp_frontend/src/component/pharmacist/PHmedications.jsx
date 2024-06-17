import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@material-tailwind/react";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { useAuth } from "../../context/use-auth-client";
import { dapp_backend } from "../../../../declarations/dapp_backend";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BriefcaseMedical } from "lucide-react";

const TABLE_HEAD = ["Drug name", "", "Created", ""];

const PAGE_SIZE = 6;

const PHmedications = () => {
  const { member, membertype, logout, isMember } = useAuth();
  const [isprocess, setIsprocess] = useState(false);
  const [loading, setLoading] = useState(true);
  //for the medications
  const [medications, setMedications] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/pharmacist/medications/${id}`); // Dynamic route with ID parameter
  };

  useEffect(() => {
    if (isMember) {
      const getdata = async () => {
        const result = await dapp_backend.getMedicationListforphama();

        console.log(result.ok);
        if ("ok" in result) {
          setMedications(result.ok);
          console.log("in", result.ok);
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      getdata();
    }
  }, [member]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  return (
    <div className="h-full w-full md:text-xl 2xl:text-2xl overflow-y-auto">
      <div className="mx-16 mt-4">
        <p className="font-bold">Medication Data</p>
        <div className="flex flex-row justify-between items-center h-24">
          <div className="flex flex-row items-center gap-2 ">
            <BriefcaseMedical size={48} />
            <p className="md:text-3xl 2xl:text-4xl text-black font-bold ">
              Medication List
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <ToastContainer />
      <div className="mx-16">
        <Card className="h-full w-full ">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {loading ? (
              <SkeletonForTable />
            ) : medications.length == 0 ? (
              <div className="mx-auto flex">
                <p>No Data</p>
              </div>
            ) : (
              <tbody>
                {medications.slice(startIndex, endIndex).map((med, index) => {
                  // Convert nanoseconds to a readable date format
                  const readableDate = new Date(
                    Number(med.timestamp) / 1000000
                  ).toLocaleString();
                  return (
                    <tr
                      onClick={() => handleRowClick(index)}
                      key={index}
                      className="even:bg-blue-gray-50/50 hover:bg-[#C6EBC5] hover:shadow-md transition duration-300 ease-in-out hover:rounded-xl hover:font-bold"
                    >
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {med.pharma.drugname}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {med.pharma.status}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {readableDate}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href={`/pharmacist/medications/${index}`}
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          View
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          <div className="mx-auto flex">
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={handleNextPage}
              disabled={endIndex >= medications.length}
            >
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PHmedications;

function SkeletonForTable() {
  return (
    <tbody className="">
      <tr className="animate-pulse w-full">
        <td className="bg-[#e4e5f5] h-8" colSpan="4"></td>
      </tr>
      <tr className="h-2"></tr>
      <tr className="animate-pulse w-full">
        <td className="bg-[#e4e5f5] h-8" colSpan="4"></td>
      </tr>
      <tr className="h-2"></tr>
      <tr className="animate-pulse w-full">
        <td className="bg-[#e4e5f5] h-8" colSpan="4"></td>
      </tr>
      <tr className="h-2"></tr>
      <tr className="animate-pulse w-full">
        <td className="bg-[#e4e5f5] h-8" colSpan="4"></td>
      </tr>
      <tr className="h-2"></tr>
      <tr className="animate-pulse w-full">
        <td className="bg-[#e4e5f5] h-8" colSpan="4"></td>
      </tr>
      <tr className="h-2"></tr>
      <tr className="animate-pulse w-full">
        <td className="bg-[#e4e5f5] h-8" colSpan="4"></td>
      </tr>
      <tr className="h-2"></tr>
      <tr className="animate-pulse w-full">
        <td className="bg-[#e4e5f5] h-8" colSpan="4"></td>
      </tr>
    </tbody>
  );
}
