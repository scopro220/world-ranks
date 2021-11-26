import Layout from "../components/Layout";
import styles from "@/styles/Home.module.css";
import SearchInput from "@/components/SearchInput";
import CountriesTable from "@/components/CountriesTable";

export default function Home({ countries }) {
  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>

      <SearchInput placeholder="Filter by Name, Region or SubRegion" />

      <CountriesTable countries={countries} />
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
