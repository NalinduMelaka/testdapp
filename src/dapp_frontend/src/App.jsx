import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import About from "./component/About";
import Fandq from "./component/Fandq";
import Missing from "./component/Missing";
import Dashboard from "./component/Dashboard";
import RequreAuth from "./component/RequireAuth";
import Frontpage from "./component/Frontpage";
import Land from "./component/Land";
import New from "./component/patient/New";
import RegistredAuth from "./component/RegistredAuth";
import Test from "./component/Test";
import Mainlayout from "./component/Mainlayout";
import PAuth from "./component/patient/PAuth";
import DAuth from "./component/doctor/DAuth";
import PHAuth from "./component/pharmacist/PHAuth";
import Settings from "./component/Settings";
import PMedications from "./component/patient/PMedications";
import T2 from "./component/T2";
import NewMedication from "./component/patient/NewMedication";
import PLandingPage from "./component/patient/PLandingPage";
import APIRegister from "./component/APIuser/APIRegister";
import Register from "./component/Register";
import APIauth from "./component/APIuser/APIauth";
import Upload from "./component/patient/Upload";
import Psettings from "./component/patient/Psettings";
import Pmedicatoindynamic from "./component/patient/Pmedicatoindynamic";
import UploadP from "./component/patient/UploadP";
import Pprescription from "./component/patient/Pprescription";
import Dprescription from "./component/doctor/Dprescription";
import PAppointment from "./component/patient/PAppointment";
import PEmergency from "./component/patient/PEmergency";
import Preports from "./component/patient/Preports";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public routes */}
        <Route path="/" element={<Land />} />
        <Route path="about" element={<PAppointment />} />
        <Route path="register" element={<Register />} />
        <Route path="fandq" element={<Fandq />} />
        <Route path="testtwo" element={<T2 />} />

        {/*fail */}
        <Route element={<RequreAuth />}></Route>

        {/*we want to protected these routes we can protec this using requreauth*/}
        <Route element={<Test />}>
          <Route path="datauserreg" element={<APIRegister />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* filter registed usre or not if not show the registration*/}
          <Route element={<RegistredAuth />}>
            <Route path="new" element={<New />} />
            {/* add a layout based on user type */}
            <Route element={<Mainlayout />}>
              <Route path="/settings" element={<Settings />} />
              {/* for patients only urls */}
              <Route path="/patient" element={<PAuth />}>
                <Route index element={<PLandingPage />} />
                <Route path="upload" element={<UploadP />} />
                <Route path="medications" element={<PMedications />} />
                <Route path="medications/new" element={<NewMedication />} />
                <Route
                  path="medications/:id"
                  element={<Pmedicatoindynamic />}
                />
                <Route path="prescription" element={<Pprescription />} />
                <Route path="appointment" element={<PAppointment />} />
                <Route path="emergency" element={<PEmergency />} />
                <Route path="reports" element={<Preports />} />

                <Route path="test2" element={<div> test2</div>} />
                <Route path="dashboard" element={<div>this is dashbord</div>} />
                <Route path="upload" element={<Upload />} />
              </Route>
              {/* for doctors only */}
              <Route path="/doctor" element={<DAuth />}>
                <Route
                  index
                  element={<div>This is the doctor home page</div>}
                />
                <Route
                  path="dashboard"
                  element={<div> this is doctor dashboard</div>}
                />
              </Route>
              {/*for API users only */}
              <Route path="/datauser" element={<APIauth />}>
                <Route index element={<div>This is the api home page</div>} />
                <Route
                  path="dashboard"
                  element={<div>this is api dashboard</div>}
                />
              </Route>
              {/* for pharma only */}
              <Route path="/pharmacist" element={<PHAuth />}>
                <Route
                  index
                  element={<div>This is the pharma home page</div>}
                />
                <Route
                  path="dashboard"
                  element={<div>this is pharmasit dashboard</div>}
                />
              </Route>
            </Route>
          </Route>
        </Route>
        {/*catch all*/}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
