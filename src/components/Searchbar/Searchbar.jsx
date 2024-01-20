import React, { useState } from "react";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";
const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      return;
    }

    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Button type="submit" label="Search" />

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          onChange={handleChangeQuery}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.PropTypes = {
  onSubmit: PropTypes.func,
};
