import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    color: "#BB1918",
    backgroundColor: "#F8EBC0",
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    border: "0.1rem #F8EBC0 solid",
    width: '15ch',
    padding: theme.spacing(1),
    // vertical padding + font size from searchIcon
    // paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  }));
export default function SearchBox(props) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className={classes.search}>
        <InputBase
          placeholder="Chercher…"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
        <button className={classes.searchIcon} type="submit">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}
