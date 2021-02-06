
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listEmails } from '../actions/emailActions';
import LoadingBox from '../components/LoadingBox';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


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
      const data = [
        ['Australia', 0],
        ['coffret bébé', 17],
        ['Deblat', 19],
        ['Sablé', 26],
        ['Grawech', 27],
        ['Makroudh', 46]
    ];

    const options = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Meilleur vente'
          },
        series: {
            grouping: false,
            borderWidth: 0
        },
    legend: {
        enabled: false
    },
    xAxis: {
        type: 'category',
        max: 4,
        labels: {
            useHTML: true,
            animate: true,
            formatter: function () {
                return this.value;
            }
        }
    },
    yAxis: [{
        title: {
            text: 'Nombre de fois commondé'
        },
        showFirstLabel: false
    }],
    series: [{
        name: '2021',
        id: 'main',
        dataSorting: {
            enabled: true,
            matchByName: true
        },
        dataLabels: [{
            enabled: true,
            inside: true,
            style: {
                fontSize: '12px',
            }
        }],
        data,
    }]
    }
      
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
                    <h1>NewsLetter Emails</h1>
                    {emails.map(e => <li>{e.email}</li>)}
                </ul>
            )}
            </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            </Paper>
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