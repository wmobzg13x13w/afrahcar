import React, { useState, useEffect } from "react";
import axios from "axios";
import TransfertCard from "./TransfertCard";

const Transfert = () => {
  const [transferts, setTransferts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransferts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}transfert/getall`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransferts(response.data);
      } catch (error) {
        setError("Échec de la récupération des transferts");
      } finally {
        setLoading(false);
      }
    };

    fetchTransferts();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='w-16 h-16 border-t-4 border-darkBlue rounded-full animate-spin'></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-bold mb-6'>Transferts</h1>
      {transferts.length === 0 ? (
        <p className='text-center text-gray-700'>Aucun transfert trouvé.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4'>
          {transferts.map((transfert) => (
            <TransfertCard key={transfert._id.$oid} transfert={transfert} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Transfert;
