import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    brandsBox: {
        width: "270px",
        height: "270px",
        background: "white",
        paddingLeft: "20px",
        paddingTop: "10px",
        "@media screen and (max-width: 960px)": {
            width: "90%"
        },
    },
    searchBar: {
        width: "235px",
        height: "30px",
        marginBottom: "20px",
        border: "1px solid #E0E0E0",
        paddingLeft: "12px",
        marginTop: "20px",
        '&:focus': {
            outline: "none"
        },
        "@media screen and (max-width: 960px)": {
            width: "90%"
        },

    },
    insideBox: {
        width: "240px",
        height: "160px",
        paddingLeft: "8px",
        overflowY: "scroll",
        "@media screen and (max-width: 960px)": {
            width: "90%"
        },
    },
    marginTop: {
        marginTop: "12.8px"
    }
}));


const BrandsFilter = () => {

    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <>
            <h5>Brands</h5>
            <div className={classes.brandsBox}>

                <div>
                    <input type="text" placeholder="Search brands" onChange={(e) => console.log(e.target.value)} className={classes.searchBar} />
                </div>
                <div className={classes.insideBox}>
                    <FormGroup>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} color="default" onChange={handleChange} name="checkedA" />}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.marginTop}>Brand 1</div>
                            </Grid>
                        </Grid>

                    </FormGroup>
                </div>
            </div>
        </>
    );
}


export default BrandsFilter;