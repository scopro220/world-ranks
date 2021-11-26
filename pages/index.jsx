import Layout from "../components/Layout";
import styles from "@/styles/Home.module.css";
import SearchInput from "@/components/SearchInput";

export default function Home({ countries }) {
  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>

      <SearchInput />
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
