import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "@/styles/Home.module.css";

export default function Home({ countries }) {
  console.log(countries);
  return <Layout>Main</Layout>;
}

export async function getStaticProps() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  return {
    props: { countries },
  };
}
