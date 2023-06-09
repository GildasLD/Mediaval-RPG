import { LicenseInfo } from "@mui/x-license-pro";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import CharacterSelector from "./components/Characters/CharacterSelector";
import Login from "./components/Login";
import Quest from "./components/Quest";
import Quests from "./components/Quests";
import Register from "./components/Register";
LicenseInfo.setLicenseKey(
  "41bb5af2e7f0c0377375a0beeedfd1f6Tz01ODAxNDY3MixFPTE3MTAxNTMyNTA0NjAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y",
);
export default function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="characters" element={<CharacterSelector />} />
          <Route path="quests" element={<Quests />} />
          <Route path="quests">
            <Route path=":questId/:stageId" element={<Quest />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return <Outlet />;
}

function NoMatch() {
  return (
    <div>
      <p className="mx-3">
        <Link to="/">Aller à la page d'accueil</Link>
      </p>
    </div>
  );
}
