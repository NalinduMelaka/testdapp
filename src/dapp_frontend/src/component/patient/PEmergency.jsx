import React, { useEffect, useState } from "react";
import { ContactRound } from "lucide-react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { dapp_backend } from "../../../../declarations/dapp_backend";
import { useAuth } from "../../context/use-auth-client";

const TABLE_HEAD = ["Type", "phone", "Created", ""];

const PAGE_SIZE = 6;

const PEmergency = () => {
  const { member, isMember } = useAuth();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMember) {
      const getdata = async () => {
        try {
          const result = await dapp_backend.getContacts();
          if ("ok" in result) {
            setContacts(result.ok);
            console.log("reslt ====,", result);
          }
        } catch (error) {
          console.error("Failed to fetch contacts", error);
        } finally {
          setLoading(false);
        }
      };
      getdata();
    }
  }, [isMember, member]);

  const handleRowClick = (id) => {
    navigate(`/patient/emergency/${id}`);
  };

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
        <p className="font-bold">Contact Data</p>
        <div className="flex flex-row justify-between items-center h-24">
          <div className="flex flex-row items-center gap-2">
            <ContactRound size={48} />
            <p className="md:text-3xl 2xl:text-4xl text-black font-bold">
              Contact List
            </p>
          </div>
          <div>
            <Link to="/patient/emergency/new">
              <div className="text-white bg-black rounded-lg p-2 hover:bg-gray-900 hover:shadow-lg">
                New contact
              </div>
            </Link>
          </div>
        </div>
        <ToastContainer />
      </div>
      <div className="mx-16">
        <Card className="h-full w-full">
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
            ) : contacts.length === 0 ? (
              <div className="mx-auto flex">
                <p>No Data</p>
              </div>
            ) : (
              <tbody>
                {contacts
                  .slice(startIndex, endIndex)
                  .map((contactObj, index) => {
                    // Convert nanoseconds to a readable date format
                    const type = Object.keys(contactObj)[0];
                    const contact = contactObj[type];
                    const readableDate = new Date(
                      Number(contact.timestamp) / 1000000
                    ).toLocaleString();
                    return (
                      <tr
                        onClick={() => handleRowClick(index)} // Assuming `med` has a unique `id`
                        key={index}
                        className="even:bg-blue-gray-50/50 hover:bg-[#C6EBC5] hover:shadow-md transition duration-300 ease-in-out hover:rounded-xl hover:font-bold"
                      >
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {type}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {contact.email}
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
                            href={`/patient/emergency/${contact.id}`}
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
              disabled={endIndex >= contacts.length}
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

export default PEmergency;

function SkeletonForTable() {
  return (
    <tbody>
      {[...Array(6)].map((_, index) => (
        <React.Fragment key={index}>
          <tr className="animate-pulse w-full">
            <td className="bg-[#e4e5f5] h-8" colSpan="4"></td>
          </tr>
          <tr className="h-2"></tr>
        </React.Fragment>
      ))}
    </tbody>
  );
}
