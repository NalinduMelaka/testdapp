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
import RegistredAuth from './component/RegistredAuth';
import Test from "./component/Test";
import Mainlayout from "./component/Mainlayout";
import PAuth from "./component/patient/PAuth";
import DAuth from './component/doctor/DAuth';
import PHAuth from './component/pharmacist/PHAuth';
import Settings from "./component/Settings";

function App() {



  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/*public routes */}
        <Route path="/" element={<Land />} />
        <Route path="about" element={<About />} />
        <Route path="fandq" element={<Fandq />} />

        {/*fail */}
        <Route element={<RequreAuth />}>


        </Route>

        {/*we want to protected these routes we can protec this using requreauth*/}
        <Route element={<Test />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* filter registed usre or not if not show the registration*/}
          <Route element={<RegistredAuth />}>
            <Route path="new" element={<New />} />
            {/* add a layout based on user type */}
            <Route element={<Mainlayout />} >
              <Route path="/settings" element={<Settings />} />
              {/* for patients only urls */}
              <Route path="/patient" element={<PAuth />}>
                <Route index element={<div>This is the patient home page</div>} />
                <Route path="test2" element={<div> test2</div>} />
                <Route path="dashboard" element={<div>this is dashbord</div>} />
              </Route>
              {/* for doctors only */}
              <Route path="/doctor" element={<DAuth />}>
                <Route index element={<div>This is the doctor home page</div>} />
                <Route path="dashboard" element={<div> this is doctor dashboard</div>} />
              </Route>
              {/* for pharma only */}
              <Route path="/pharmacist" element={<PHAuth />}>
                <Route index element={<div>This is the pharma home page</div>} />
                <Route path="dashboard" element={<div>this is pharmasit dashboard</div>} />
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