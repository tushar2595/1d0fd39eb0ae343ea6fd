import { Button, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { API_KEY } from '../Constants/key';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            randomasteriodId: null,
            isloading: false
        }
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    handleSubmit = () => {
        if (this.state.text.length > 0) {
            const ASTERIOD_ID = this.state.text;
            axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${ASTERIOD_ID}?api_key=${API_KEY}`).then((response) => {
                console.log(response);
                const asteriod_data = {
                    name: response.data.title,
                    url: response.data.url,
                    service_version: response.data.service_version,
                    hdurl: response.data.hdurl,
                    explation: response.data.explanation,
                    mediaType: response.data.media_type,
                    Date: response.data.date

                }
                this.props.history.push({
                    pathname: "/details",
                    asteriod_data: asteriod_data
                })
            })
                .catch((error) => {
                    console.log("error");
                    if (error.response.status === 404) {
                        window.alert("Id is not found")
                    }
                    else {
                        window.alert("Something went wrong.")
                    }
                })
        }
    }
    handleRandom = () => {
        this.setState({
            isloading: true
        })
        axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`)
            .then((response) => {
                console.log(
                    response.data.near_earth_objects[19],
                    response.data.near_earth_objects.length * Math.random());
                const random_no = parseInt(response.data.near_earth_objects.length * Math.random());
                const randomasteriodId = response.data.near_earth_objects[random_no].id;
                axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${randomasteriodId}?api_key=${API_KEY}`).then((response) => {
                    const asteriod_data = {
                        name: response.data.name,
                        url: response.data.nasa_jpl_url,
                        is_hazardios: response.data.is_potentially_hazardous_asteriod
                    };
                    this.props.history.push({
                        pathname: "/details",
                        asteriod_data: asteriod_data
                    })
                })
            })
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Typography>Asteriod Information Center</Typography>
                <div style={{ marging: "10px" }}>
                    <TextField label={"Enter Asteriod Id"} helperText="Input Integers only" type="number" onChange={this.handleChange} />
                </div>
                <br />
                <div style={{ marginRight: "5px", marginBottom: "20px" }}>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                </div>
                <Button variant="contained" color="primary" onClick={this.handleRandom}>Random Asteriod</Button>
                {
                    this.state.isloading ? "...Generating" : ""
                }
            </div >
        )
    }
}
export default Landing;