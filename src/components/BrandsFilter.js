import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import loadingGIF from "../images/loading.gif"
import SingleBrandItem from './SingleComponents/SingleBrandItem';
import {connect} from "react-redux"

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
        marginTop: "12.8px",
        fontSize: "90%"
    },
    loadinggif: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
    }
}));


const BrandsFilter = ({companies, companyCount}) => {

    const [loading, setLoading] = React.useState(true);
    const classes = useStyles();
    const [companiesToShow, setCompaniesToShow] = React.useState([])
    const [compCount, setCompCount] = React.useState([])

    React.useEffect(() => {
        if (companies.length !== 0) {
            setLoading(false)
        }
        setCompaniesToShow(companies)
        setCompCount(companyCount)
    }, [companies, companyCount])

    const filterBrands = (e) => {
        e.preventDefault()
        let filteredBrands = []
        let filteredCounts = []
        companies.map((company, index) => {
            if(company.slug.toLowerCase().includes((e.target.value).toLowerCase())){
                filteredBrands.push(company)
                filteredCounts.push(companyCount[index])
            }
        })
        setCompaniesToShow(filteredBrands)
        setCompCount(filteredCounts)
    }

    return (
        <>
            <h5>Brands</h5>
            <div className={classes.brandsBox}>
                <div>
                    <input type="text" placeholder="Search brands" onChange={filterBrands} className={classes.searchBar} />
                </div>
                <div className={classes.insideBox}>
                    {loading && <div className={classes.loadinggif}><img src={loadingGIF} alt="loading" /></div>}
                    {!loading && <FormGroup>
                        <Grid container>
                            {companiesToShow.map((company, index) => {
                                return (
                                    <SingleBrandItem companyName={company.slug} key={company.account} id={company.account} count={compCount[index]} />
                                );
                            })}
                        </Grid>
                    </FormGroup>}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {companies: state.companies, companyCount: state.companyCount}
}



export default connect(mapStateToProps)(BrandsFilter);