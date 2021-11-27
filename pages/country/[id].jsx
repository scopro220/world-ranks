import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Country.module.css";

export default function Country({ country, borders, currencies }) {
  return (
    <Layout title={country.name.common}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <Image
              src={country.flags.png}
              alt={country.name.common}
              width={320}
              height={213}
            />

            <h1 className={styles.overview_name}>{country.name.common}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population.toLocaleString("en-US")}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>
                  {country.area.toLocaleString("en-US")}
                </div>
                <div className={styles.overview_label}>
                  Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "None"}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {currencies.map((currency) => currency[1].name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Official Name</div>
              <div className={styles.details_panel_value}>
                {country.name.official}
              </div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbouring Countries
              </div>

              <div className={styles.details_panel_borders_container}>
                {borders.map((border) => (
                  <div
                    key={border.name.common}
                    className={styles.details_panel_borders_country}
                  >
                    <Image
                      src={border.flags.png}
                      alt={border.name.common}
                      width={320}
                      height={213}
                    />

                    <Link
                      href={`/country/${border.cca3}`}
                      className={styles.details_panel_borders_name}
                    >
                      {border.name.common}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.cca3 },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const resCountries = await fetch(`https://restcountries.com/v3.1/all`);
  const resCountry = await fetch(
    `https://restcountries.com/v3.1/alpha/${params.id}`
  );
  const country = await resCountry.json();
  const countries = await resCountries.json();

  const currencies = country[0].currencies
    ? Object.entries(country[0].currencies)
    : [];

  const borders = country[0].borders ? country[0].borders : [];
  const borderCountries = countries.filter((country) => {
    return borders.includes(country.cca3);
  });

  return {
    props: {
      country: country[0],
      borders: borderCountries,
      currencies,
    },
  };
};
