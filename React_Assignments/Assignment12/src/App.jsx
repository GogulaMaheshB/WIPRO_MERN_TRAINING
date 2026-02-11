
import { lazy, Suspense, useState, useContext } from "react";
import Loader from "./components/Loader";
import StatsCard from "./components/StatsCard";
import ErrorBoundary from "./components/ErrorBoundary";
import ProductCard from "./components/ProductCard";
import Modal from "./components/Modal";
import ThemeToggle from "./components/ThemeToggle";
import OfflineBanner from "./components/OfflineBanner";
import WorkoutTracker from "./components/WorkoutTracker";
import Products from "./components/Products";
import { ThemeContext } from "./context/ThemeContext";

const CourseDetails = lazy(() => import("./components/CourseDetails"));
const InstructorProfile = lazy(() =>
  import("./components/InstructorProfile")
);

export default function App() {
  const [view, setView] = useState(null);
  const [stats, setStats] = useState({ users: 100, sales: 50 });
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen p-6 space-y-6
        ${theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"}`}
    >
      <OfflineBanner />
      <ThemeToggle />

      
      <div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 mr-2 rounded"
          onClick={() => setView("course")}
        >
          View Course
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setView("instructor")}
        >
          View Instructor
        </button>

        <Suspense fallback={<Loader />}>
          {view === "course" && <CourseDetails />}
          {view === "instructor" && <InstructorProfile />}
        </Suspense>
      </div>

  
      <div className="space-y-2">
        <StatsCard title="Users" value={stats.users} lastUpdated="Now" />
        <StatsCard title="Sales" value={stats.sales} lastUpdated="Yesterday" />
        <button
          className="bg-yellow-500 px-4 py-2 rounded"
          onClick={() =>
            setStats((s) => ({ ...s, users: s.users + 1 }))
          }
        >
          Simulate Update
        </button>
      </div>

   
      <ErrorBoundary>
        <ProductCard />
      </ErrorBoundary>

      <button
        className="bg-blue-700 text-white px-4 py-2 rounded"
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>
      {open && <Modal onClose={() => setOpen(false)} />}

    
      <WorkoutTracker />

     
      <Products />
    </div>
  );
}
