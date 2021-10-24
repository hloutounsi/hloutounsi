
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
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
    const [dataMaxCountInStock, setDataMaxCountInStock] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listEmails());
        getProducts();
      }, [dispatch, listEmails]);

      const getProducts = async () => {
        return await Axios.get('/api/products/dashboard')
        .then(response => {
            const filteredData = response.data.map(p => [p.name, p.countInStock])
            setDataMaxCountInStock(filteredData)
        })
    }
      const data = [
        ['Australia', 0],
        ['coffret bébé', 17],
        ['Deblat', 19],
        ['Sablé', 26],
        ['Grawech', 27],
        ['Makroudh', 46]
    ];

    const options2 = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Les produits le plus disponible'
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
            text: 'Nombre de produit disponible'
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
        data: dataMaxCountInStock,
    }]
    };

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

    const options3 = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares in January, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }, {
                name: 'Firefox',
                y: 10.85
            }, {
                name: 'Edge',
                y: 4.67
            }, {
                name: 'Safari',
                y: 4.18
            }, {
                name: 'Other',
                y: 7.05
            }]
        }]
    };
      
    const classes = useStyles();
    return (
    <div className={classes.root}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options2}
            />
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options3}
            />
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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
        </Grid>
    </div>
    );
}