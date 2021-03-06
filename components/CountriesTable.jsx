import Link from "next/link";
import Image from "next/image";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";
import styles from "@/styles/CountriesTable.module.css";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    if (value === "name") {
      return [...countries].sort((a, b) =>
        a[value].common > b[value].common ? 1 : -1
      );
    }
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    if (value === "name") {
      return [...countries].sort((a, b) =>
        a[value].common > b[value].common ? -1 : 1
      );
    }
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

export default function CountriesTable({ countries }) {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>

        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>

          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>

          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>

          {value === "area" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map((country) => (
        <Link
          href={`/country/${country.cca3}`}
          key={country.name.common}
          passHref
        >
          <div className={styles.row}>
            <div className={styles.flag}>
              <Image
                src={country.flags.png}
                alt={country.name.common}
                width={320}
                height={213}
              />
            </div>
            <div className={styles.name}>{country.name.common}</div>

            <div className={styles.population}>
              {country.population.toLocaleString("en-US")}
            </div>

            <div className={styles.area}>
              {country.area.toLocaleString("en-US") || 0}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
