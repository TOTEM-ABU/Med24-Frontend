import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import styles from "./RecomendedKliniki.module.css";
import { Service } from "@/types/Service.types";

const RecomendedKliniki = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/services`
      );

      console.log("Axios response:", response.data);
      return response.data?.data;
    },
  });

  console.log(data);

  return (
    <div className={styles.recomendedKliniki}>
      <h3>Tavsiya etilgan klinikalar</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading services</p>}
      {data?.map((item: Service) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default RecomendedKliniki;
