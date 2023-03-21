import React, {useState} from "react";
import css from './Searchbar.module.css'
import {IoIosSearch} from 'react-icons/io'
import PropTypes from "prop-types";

const Searchbar = ({onSubmit}) => {

    const [query, setQuery] = useState('');

    const onInputChange = (e) => {
        setQuery(e.currentTarget.value.toLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(query.trim());
        setQuery('');
    }

        return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={handleSubmit}>
                <button type="submit" className={css.button} aria-label="Search">
                    <IoIosSearch style={{width: 25, height: 25}} />
                </button>
                <label className={css.label}>
                    <input
                    className={css.input}
                    type="text"
                    name="query"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={onInputChange}
                    />
                </label>
            </form>
        </header>
        )
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;