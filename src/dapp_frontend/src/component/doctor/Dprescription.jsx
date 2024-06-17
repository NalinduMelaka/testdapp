import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Syringe } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Checkbox,
  Select,
  Option,
} from "@material-tailwind/react";
import { useAuth } from "../../context/use-auth-client";
import { dapp_backend } from "../../../../declarations/dapp_backend";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["Prescriber", "Status", "Created", ""];

const PAGE_SIZE = 6;

const PrescriptionTable = React.memo(
  ({ prescriptions, handleRowClick, currentPage }) => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    return (
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
        <tbody>
          {prescriptions.slice(startIndex, endIndex).map((med, index) => {
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
                    {med.prescriber}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {med.status}
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
                    href={`/doctor/prescription/${index}`}
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
);

const usePrescriptionData = () => {
  const { member, isMember } = useAuth();
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState(null);

  const fetchPrescriptionData = useCallback(async () => {
    try {
      const result = await dapp_backend.getPrescriptionList();
      if ("ok" in result) {
        setPrescriptions(result.ok);
        setLoading(false);
      } else {
        setError("Failed to fetch prescription data");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred while fetching prescription data");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isMember) {
      fetchPrescriptionData();
    }
  }, [isMember, fetchPrescriptionData]);

  return { loading, prescriptions, error };
};

const Dprescription = () => {
  const { loading, prescriptions, error } = usePrescriptionData();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleRowClick = useCallback(
    (id) => {
      navigate(`/doctor/prescription/${id}`);
    },
    [navigate]
  );

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
        <p className="font-bold">Prescription Data</p>
        <div className="flex flex-row justify-between items-center h-24">
          <div className="flex flex-row items-center gap-2 ">
            <Syringe size={48} />
            <p className="md:text-3xl 2xl:text-4xl text-black font-bold ">
              Prescription List
            </p>
          </div>
          <div>
            <Link to="/doctor/prescription/new">
              <div className="text-white bg-black rounded-lg p-2 hover:bg-gray-900 hover:shadow-lg ">
                New prescription
              </div>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />

      <div className="mx-16">
        <Card className="h-full w-full ">
          {loading ? (
            <SkeletonForTable />
          ) : error ? (
            <div className="mx-auto flex">
              <p>{error}</p>
            </div>
          ) : prescriptions.length === 0 ? (
            <div className="mx-auto flex">
              <p>No Data</p>
            </div>
          ) : (
            <PrescriptionTable
              prescriptions={prescriptions}
              handleRowClick={handleRowClick}
              currentPage={currentPage} // Pass currentPage as a prop
            />
          )}
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
              disabled={endIndex >= prescriptions.length}
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

export default Dprescription;

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
