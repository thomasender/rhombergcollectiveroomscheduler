import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";

const DataContext = React.createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [reservationsList, setReservationsList] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = db.ref("Rooms");
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const reservations = [];
      for (let id in data) {
        reservations.push({ id, ...data[id] });
      }
      setReservationsList(reservations);
      setLoading(false);
    });
  }, []);

  const value = {
    reservationsList,
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
