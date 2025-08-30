import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import styles from "./DiagnostikaType.module.css";

const DiagnostikaType = () => {
  const searchParams = useSearchParams();
  const diagnostikaName = searchParams?.get("name");
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  useEffect(() => {
    if (diagnostikaName) {
      router.replace(`/diagnostika/${encodeURIComponent(diagnostikaName)}`);
    } else {
      router.replace("/Diagnostika");
    }
  }, [diagnostikaName, router]);

  return (
    <div style={{ padding: "20px", maxWidth: "1052px", margin: "0 auto" }}>
      <div className={styles["search-section"]}>
        <div className={styles["input-container"]}>
          <Input
            label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
            width="100%"
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
          />
          <Button
            name="Qidirish"
            variant="primary"
            padding="0 38px 0 38px"
            onClick={() => handleSearch(searchValue)}
          />
        </div>
      </div>

      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default DiagnostikaType;
