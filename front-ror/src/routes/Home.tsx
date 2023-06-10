import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));
const Home = () => {
  return (
    <div className="bg">
      <Suspense fallback={<p>Loading...</p>}>
        <Dashboard />
      </Suspense>
    </div>
  );
};
export default Home;
