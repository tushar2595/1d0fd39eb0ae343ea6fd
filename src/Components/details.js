import { Button, Typography } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        textAlign: "center",
        marginTop: "20%"
    },
    head: {
        fontSize: "28px",
        opacity: "0.5",
        marginBottom: "30px"
    },
    attr: {
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "left"
    },
    val: {
        fontWeight: "18px",
        fontWeight: "bold",
        opacity: "0.5",
        marginLeft: "20px"
    }
})
export default function AsteriodDetails(props) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (props.location.asteriod_data) {
            setLoading(false);
        }
    })
    const classes = useStyles();
    const data = props.location.asteriod_data ? props.location.asteriod_data : {}
    return (
        <div classes={classes.root}>
            <Button onClick={() => props.history.push("/")}>Back</Button>
            <div className={classes.head}>
                Asteriod Information Center
            </div>
            <div style={{ marginTop: "100px" }}>
                <Typography className={classes.attr}>Name:</Typography>
                <Typography className={classes.val}>{data.name}</Typography>
                <Typography className={classes.attr}>nasa_jpl_url</Typography>
                <a herf={data.url}>
                    <Typography className={classes.val}>{data.url}</Typography>
                </a>
                <Typography className={classes.attr}>is_potentially_hazardous_asteriod</Typography>
                <Typography className={classes.val}>{data.is_hazardous ? "YES" : "NO"}</Typography>
            </div>
        </div>
    )
}
