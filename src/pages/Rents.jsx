import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";

const Rents = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const daysInMonth = useMemo(() => {
    const days = new Date(year, month, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  }, [year, month]);

  const getCellClasses = (status, loading) =>
    [
      "p-2 border text-sm text-center",
      status === "reserved" ? "bg-orange text-white" : "",
      status === "unavailable" ? "bg-grey cursor-pointer" : "",
      status === "available" ? "bg-white hover:bg-gray-100 cursor-pointer" : "",
      loading ? "opacity-50 pointer-events-none" : "",
    ].join(" ");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}rentings/month`,
        {
          params: { month, year },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const carsData = response.data;

      const combinedData = carsData
        .map((car) => {
          return car.matricules.map((matricule) => ({
            car,
            matricule: matricule.value,
            statuses: matricule.statuses,
            category: car.category,
            unavailablePeriods: matricule.unavailablePeriods,
          }));
        })
        .flat();

      setData(combinedData);
    } catch (error) {
      console.error("Data fetch error:", error);
      setErrorMessage(error.response?.data?.error || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCellClick = useCallback(
    async (carId, matricule, day, currentStatus) => {
      if (loading || currentStatus === "reserved") return;

      try {
        const date = new Date(Date.UTC(year, month - 1, day));
        const isoDate = date.toISOString().split("T")[0];

        const { data: existing } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}unavailability`,
          {
            params: {
              car: carId,
              matricule,
              startDate: isoDate,
              endDate: isoDate,
            },
          }
        );

        if (existing.length > 0) {
          await axios.delete(
            `${process.env.REACT_APP_BASE_URL}unavailability/${existing[0]._id}`
          );
        } else {
          await axios.post(`${process.env.REACT_APP_BASE_URL}unavailability`, {
            car: carId,
            matricule,
            startDate: isoDate,
            endDate: isoDate,
            source: "manual",
          });
        }

        await fetchData();
      } catch (error) {
        console.error("Update error:", error.response?.data || error.message);
        setErrorMessage(error.response?.data?.error || "Update failed");
      }
    },
    [loading, fetchData, year, month]
  );

  const groupedData = useMemo(
    () =>
      data.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
      }, {}),
    [data]
  );

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Suivi par mois</h1>

      <div className='mb-6 flex gap-4 justify-center items-center'>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className='p-2 border rounded'>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("fr-FR", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className='p-2 border rounded'>
          {Array.from(
            { length: 5 },
            (_, i) => new Date().getFullYear() - i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {errorMessage && (
        <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>
          {errorMessage}
        </div>
      )}

      {loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-lg flex items-center gap-2'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500'></div>
            Chargement...
          </div>
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className='text-center py-8 text-gray-500'>
          Aucune donnée disponible pour ce mois
        </div>
      )}

      {/* Desktop View */}
      <div className='hidden md:block'>
        {Object.entries(groupedData).map(([category, items]) => (
          <div key={category} className='mb-8'>
            <h2 className='text-xl font-bold mb-4'>
              {category === "longueduree" ? "Longue durée" : "Courte durée"}
            </h2>
            <div className='overflow-x-auto'>
              <table className='min-w-full border-collapse'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='p-3 border text-left'>Voiture</th>
                    <th className='p-3 border text-left'>Matricule</th>
                    {daysInMonth.map((day) => (
                      <th
                        key={day}
                        className='p-2 border text-center text-sm w-8'>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map(({ car, matricule, statuses }) => (
                    <tr
                      key={`${car._id}-${matricule}`}
                      className='hover:bg-gray-50'>
                      <td className='p-3 border font-medium'>{car.title}</td>
                      <td className='p-3 border font-mono'>{matricule}</td>
                      {statuses.map((status, index) => (
                        <td
                          key={index}
                          className={getCellClasses(status, loading)}
                          onClick={() =>
                            handleCellClick(
                              car._id,
                              matricule,
                              index + 1,
                              status
                            )
                          }>
                          {status === "unavailable" && (
                            <span className='text-xs text-gray-700'>✕</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className='space-y-4 md:hidden'>
        {Object.entries(groupedData).map(([category, items]) => (
          <div key={category}>
            <h2 className='text-xl font-bold mb-2'>
              {category === "longueduree" ? "Longue durée" : "Courte durée"}
            </h2>
            {items.map(({ car, matricule, statuses }) => (
              <div key={car._id} className='border rounded shadow p-4 bg-white'>
                <h3 className='font-bold mb-2'>{matricule}</h3>
                <div className='grid grid-cols-7 text-center gap-1'>
                  {daysInMonth.map((day) => {
                    const status = statuses[day - 1];
                    return (
                      <div
                        key={day}
                        className={getCellClasses(status, loading)}
                        onClick={() =>
                          handleCellClick(car._id, matricule, day, status)
                        }>
                        {day}
                        {status === "unavailable" && (
                          <span className='text-white font-bold'>✕</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rents;
