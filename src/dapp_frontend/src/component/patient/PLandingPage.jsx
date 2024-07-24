import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/use-auth-client";
import { Cpu, CircleEllipsis, BookCheck, UserRound } from "lucide-react";
import Piechart from "./Piechart";
import { Spinner } from "@material-tailwind/react";
import Bar2chart from "./Bar2chart";

const PLandingPage = () => {
  const { whoamiActor } = useAuth();
  const [whoamiResult, setWhoamiResult] = useState("");
  const [count, setCount] = useState({
    completed: 0,
    pending: 0,
    processing: 0,
  });
  const [loading, setLoading] = useState(true);
  const [Pdata, setPdata] = useState([]);
  const [bdata, setBdata] = useState([]);
  const [odata, setOdata] = useState([]);

  useEffect(() => {
    const result = async () => {
      try {
        const prescriptioncount = Number(
          await whoamiActor.getPrescriptionCount()
        );
        const medicount = Number(await whoamiActor.getMedicationCount());
        const fetchData = async () => {
          try {
            const result = await whoamiActor.getMedicationList();
            if (result.ok) {
              const medications = result.ok;
              const transformedData = transformData(medications);
              setBdata(transformedData);
            } else {
              console.error(result.err);
            }
          } catch (error) {
            console.error("Error fetching medication list:", error);
          }
        };

        fetchData();

        const results = await whoamiActor.getPrescriptionList();
        if (results.ok) {
          const prescriptions = results.ok;
          const transformedData = transformData(prescriptions);
          setPdata(transformedData);
        } else {
          console.error(results.err);
        }
        console.log(prescriptioncount, medicount, "these are the counts");
        setCount({
          completed: medicount,
          pending: prescriptioncount,
          processing: 0,
        });

        // Assuming you fetch count, Pdata, bdata, and odata here
        // const fetchedCount = await fetchCount();
        // setCount(fetchedCount);
        // const fetchedPdata = await fetchPdata();
        // setPdata(fetchedPdata);
        // const fetchedBdata = await fetchBdata();
        // setBdata(fetchedBdata);
        // const fetchedOdata = await fetchOdata();
        // setOdata(fetchedOdata);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    result();
  }, [whoamiActor]);

  const transformData = (medications) => {
    // Aggregate the medication counts by month
    const aggregatedData = {};

    medications.forEach((med) => {
      const date = new Date(Number(med.timestamp) / 1000000); // Convert nanoseconds to milliseconds
      const month = date.toLocaleString("default", { month: "long" });

      if (!aggregatedData[month]) {
        aggregatedData[month] = {
          name: month,
          medications: 0,
          prescriptions: 0,
        };
      }

      // Increment medication and prescription counts
      aggregatedData[month].medications += 1;
      aggregatedData[month].prescriptions += 1; // Adjust if you have a separate way to count prescriptions
    });

    // Convert aggregated data into an array
    return Object.values(aggregatedData);
  };

  return (
    <div className="h-full overflow-y-auto w-full flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-6 gap-4 bg-gradient-to-r from-[#FEFDED] to-[#C6EBC5] p-4">
      <div className="bg-blue-400 rounded-md drop-shadow-md flex flex-row p-2 gap-2 hover:bg-blue-300 hover:cursor-pointer hover:shadow-2xl">
        <div className="w-1/5 bg-white rounded-lg flex items-center justify-center font-bold text-lg drop-shadow-lg">
          <Cpu />
        </div>
        <div className="w-4/5 h-full flex flex-col items-center justify-center font-bold text-white drop-shadow-sm">
          <p>Medications</p>
          <p className="text-2xl drop-shadow-md">{count.completed}</p>
        </div>
      </div>

      <div className="bg-green-400 rounded-md drop-shadow-md flex flex-row p-2 gap-2 hover:bg-green-300 hover:cursor-pointer hover:shadow-2xl">
        <div className="w-1/5 bg-white rounded-lg flex items-center justify-center font-bold text-lg drop-shadow-lg">
          <CircleEllipsis />
        </div>
        <div className="w-4/5 h-full flex flex-col items-center justify-center font-bold text-white drop-shadow-sm">
          <p>Prescriptions</p>
          <p className="text-2xl drop-shadow-md">{count.pending}</p>
        </div>
      </div>

      <div className="bg-yellow-400 rounded-md drop-shadow-md flex flex-row p-2 gap-2 hover:bg-yellow-300 hover:cursor-pointer hover:shadow-2xl">
        <div className="w-1/5 bg-white rounded-lg flex items-center justify-center font-bold text-lg drop-shadow-lg">
          <BookCheck />
        </div>
        <div className="w-4/5 h-full flex flex-col items-center justify-center font-bold text-white drop-shadow-sm">
          <p>Appointments</p>
          <p className="text-2xl drop-shadow-md">{count.processing}</p>
        </div>
      </div>

      <div className="bg-white lg:row-span-2 rounded-md drop-shadow-md p-1 hover:cursor-pointer hover:shadow-2xl hidden lg:block">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : count.completed === 0 &&
          count.pending === 0 &&
          count.processing === 0 ? (
          <div className="h-full w-full flex items-center justify-center">
            <p>No data Available</p>
          </div>
        ) : (
          <Piechart count={count} />
        )}
      </div>

      <div className="bg-white lg:row-span-2 lg:col-span-3 rounded-md drop-shadow-md hidden sm:block">
        <Bar2chart bdata={bdata} />
      </div>

      <div className="bg-white row-span-4 rounded-md drop-shadow-md flex flex-col items-center p-1 gap-2">
        <p className="text-lg 2xl:text-xl">My DATA</p>
        {loading ? (
          <Spinner />
        ) : Pdata.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center">
            <p>No data Available</p>
          </div>
        ) : (
          Pdata.map((val, index) => (
            <div
              className="h-1/5 border border-black rounded-md hover:cursor-pointer hover:shadow-2xl hover:drop-shadow-2xl w-4/5 flex flex-col hover:bg-sky-200 text-sm"
              key={index}
            >
              <div className="flex flex-row justify-evenly">
                <p>PO Name:</p>
                <p>{val.name}</p>
              </div>
              <div className="flex flex-row justify-evenly">
                <p>Temp name</p>
                <p>{val.template?.name}</p>
              </div>
              <div className="flex flex-row justify-evenly">
                <p>Created</p>
                <p>{val.user?.name}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white lg:row-span-3 lg:col-span-3 rounded-md drop-shadow-md p-2">
        <div className="flex flex-row justify-between items-center h-1/6">
          <p className="text-lg lg:text-2xl font-bold">Recent appointments</p>
          <p className="font-bold">Details</p>
        </div>
        <div className="h-5/6 rounded-sm flex flex-col gap-1">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : odata.length === 0 ? (
            <div className="h-full w-full flex justify-center items-center">
              <p>No data Avalable</p>
            </div>
          ) : (
            odata.map((val, index) => (
              <div
                className="h-1/3 w-full border border-black rounded-xl flex flex-row items-center p-1 justify-between drop-shadow-xl shadow-md hover:cursor-pointer hover:shadow-2xl"
                key={index}
              >
                <div className="h-4/5 w-12 rounded-full border border-sky-500">
                  <UserRound className="h-full w-full" />
                </div>
                <div className="flex flex-col">
                  <p className="font-bold drop-shadow-md">{val.user?.name}</p>
                  <p className="text-sm">Name</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold drop-shadow-md">{val.po?.name}</p>
                  <p className="text-sm">PO name</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold drop-shadow-md">
                    {val.statefrombrand}
                  </p>
                  <p className="text-sm">Status</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PLandingPage;
