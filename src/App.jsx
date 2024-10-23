import { useState, useEffect } from "react";

function App() {
  const [birthdate, setBirthdate] = useState("");
  const [daysOld, setDaysOld] = useState(null);
  const [nextMetricBirthday, setNextMetricBirthday] = useState("");
  const [pageviewCount, setPageviewCount] = useState(0);

  useEffect(() => {
    if (birthdate) {
      calculateDaysOld();
      calculateNextMetricBirthday();
    }
  }, [birthdate]);

  useEffect(() => {
    fetchPageviewCount();
  }, []);

  const calculateDaysOld = () => {
    const today = new Date();
    const birthDateObj = new Date(birthdate);
    const timeDifference = today - birthDateObj;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    setDaysOld(days);
  };

  const calculateNextMetricBirthday = () => {
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    const timeDifference = today - birthDateObj;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const nextMetric = Math.ceil(days / 1000) * 1000;

    const nextMetricBirthday = new Date(
      birthDateObj.getTime() + nextMetric * 24 * 60 * 60 * 1000
    );
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setNextMetricBirthday(
      nextMetricBirthday.toLocaleDateString(undefined, options)
    );
  };

  const fetchPageviewCount = async () => {
    try {
      const response = await fetch('/.netlify/functions/pageViewCount');
      const data = await response.json();
      setPageviewCount(data);
    } catch (error) {
      console.error('Error fetching pageview count:', error);
    }
  };

  return (
    <div className="min-h-screen bg-sky-200 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-black mb-6">
        Metric Birthday System
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <label className="block text-black text-sm font-bold mb-2">
          Enter your birthdate:
        </label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />

        {daysOld !== null && (
          <div className="text-black">
            <p className="mb-2">
              You are <strong>{daysOld}</strong> days old!
            </p>
            <p>
              Your next 1000th-day birthday is on{" "}
              <strong>{nextMetricBirthday}</strong>, and you will be{" "}
              <strong>{(daysOld + (1000 - (daysOld % 1000))) / 1000}</strong>{" "}
              kilodays old.
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-1 right-1 text-black">
        views: <strong>{pageviewCount}</strong>
      </div>
    </div>
  );
}

export default App;