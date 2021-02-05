
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listEmails } from '../actions/emailActions';
import LoadingBox from '../components/LoadingBox';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    },
    paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    },
}));

export default function DashboardScreen() {
    const emailList = useSelector((state) => state.emailList);
    const { emails, loading } = emailList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listEmails());
      }, [dispatch, listEmails]);
    const classes = useStyles();
    return (
    <div className={classes.root}>
        <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
            {loading ? (
            <LoadingBox></LoadingBox>
            ) : (
                <ul>
                    {emails.map(e => <li>e</li>)}
                </ul>
            )}
            </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        </Grid>
    </div>
    );
}
