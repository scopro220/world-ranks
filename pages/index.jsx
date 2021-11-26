import { useState } from "react";
import Layout from "../components/Layout";
import styles from "@/styles/Home.module.css";
import SearchInput from "@/components/SearchInput";
import CountriesTable from "@/components/CountriesTable";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion?.toLowerCase().includes(keyword)
  );

  const handleInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>

      <SearchInput
        placeholder="Filter by Name, Region or SubRegion"
        onChange={handleInputChange}
      />

      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  return {
    props: { countries },
  };
}
