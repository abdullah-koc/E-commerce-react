import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import basket from "../images/Navbar/basket.png"
import logo from "../images/Navbar/logo.png"
import Button from '@material-ui/core/Button';
import ShoppingList from './ShoppingList';
import React from 'react';
import {connect} from "react-redux"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        height: "40px",
        zIndex: "1",
        "@media screen and (min-width: 1500px)": {
            display: "none"
        },
        "@media screen and (min-width: 960px)": {
            paddingRight: "120px"
        },
        "@media screen and (min-width: 600px)": {
            paddingRight: "120px"
        },
        "@media screen and (max-width: 600px)": {
            paddingRight: "40px"
        },
        
    },
    navBar: {
        background: "#1EA4CE",
        height: "75px",
        marginBottom: "40px",
    },
    shoppingBox: {
        background: "#147594",
        height: "75px",
        width: "129px",
        borderRadius: "0px",
        '&:hover': {
            backgroundColor: '#147594',
            boxShadow: 'none',
        },
        "@media screen and (max-width: 600px)": {
            marginRight: "-80px"
        },
    },
    toRight: {
        float: "right",
        marginRight: "120px"
    },
    centerShoppingBox: {
        display: "flex",
        justifyContent: "center",
        color: "white"
    },
    totalText: {
        fontSize: "90%",
        marginTop: "4px"
    },
    logoImage: {
        display: "flex",
        justifyContent: "center",
        "@media screen and (max-width: 600px)": {
            justifyContent: "left"
        },
        height: "40px",
        marginTop: "16px"
    },
    boxIcon: {
        maxHeight: "28px"
    }
}));

const Navbar = ({total}) => {
    const classes = useStyles();
    const [isListVisible, setIsListVisible] = React.useState(false);
    return (
        <>
            <AppBar className={classes.navBar} position="static">
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid className={classes.logoImage} item xs={8}>
                        <img src={logo} alt="logo" />
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.toRight}>
                            <Button className={classes.shoppingBox} onClick={() =>  setIsListVisible(!isListVisible)}>
                                <Grid container>
                                    <Grid className={clsx(classes.centerShoppingBox, classes.boxIcon)} item xs={4}><img src={basket} alt="basket" /></Grid>
                                    <Grid className={clsx(classes.centerShoppingBox, classes.totalText)} item xs={7}><div>₺ {total.toFixed(2) === "-0.00" ? "0.00" : total.toFixed(2)}</div></Grid>
                                    <Grid item xs={1}></Grid>
                                </Grid>
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </AppBar>
            <div className={classes.container}>{isListVisible && <ShoppingList/>}</div>
        </>
    );
}

const mapStateToProps = (state) => {
    return{ total: state.total}
}

export default connect(mapStateToProps)(Navbar);