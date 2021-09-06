import './App.css';
import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from "./components/Navbar"
import ShoppingList from './components/ShoppingList';
import SortingRadio from './components/SortingRadio';
import BrandsFilter from './components/BrandsFilter';
import TagsFilter from './components/TagsFilter';
import ProductsContainer from './components/ProductsContainer';
import { createStore } from "redux"
import reducer from "./reducer"
import { Provider } from "react-redux"
import { Fetch } from "./components/Fetch"




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  shoppingList: {
    float: "right",
    marginRight: "220px",
    "@media screen and (max-width: 1500px)": {
      display: "none"
    },
  },
  container: {
    zIndex: "-1",
    position: "absolute",
    top: "75px",
    width: "90%",
    marginLeft: "50px",
    marginTop: "40px",
    "@media screen and (min-width: 1280px)": {
      marginLeft: "100px",
      width: "100%",
    },
    "@media screen and (max-width: 1280px)": {
      marginLeft: "60px",
    },
    "@media screen and (max-width: 960px)": {
      marginLeft: "50px",
    },
    "@media screen and (max-width: 800px)": {
      marginLeft: "40px",
    },
    "@media screen and (max-width: 630px)": {
      marginLeft: "35px",
    },
    "@media screen and (max-width: 480px)": {
      marginLeft: "28px",
    },
    "@media screen and (max-width: 350px)": {
      marginLeft: "22.5px",
    },
  },
}));

function App() {
  const classes = useStyles();
  const { allProducts, mugProducts, shirtProducts, companies, companyCount, tags, counts } = Fetch();

  let newTags = tags.map((tag) => {
    return { tagName: tag, isChecked: false }
  })
  const initialStore = {
    total: 0,
    allProducts: allProducts,
    products: allProducts,
    mugProducts: mugProducts,
    shirtProducts: shirtProducts,
    productsInList: [],
    companies: companies,
    companyCount: companyCount,
    tags: newTags,
    tagCount: counts,
  }

  const store = createStore(reducer, initialStore)

  return (
    <Provider store={store}>
      <Navbar />
      <div className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={2}>
            <Grid container>
              <Grid item xs={12} sm={6} md={4} lg={12}><SortingRadio /></Grid>
              <Grid item xs={12} sm={6} md={4} lg={12}><BrandsFilter /></Grid>
              <Grid item xs={12} sm={6} md={4} lg={12}><TagsFilter /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <ProductsContainer/>
          </Grid>
          <Grid item xs={12} lg={4} >
            <div className={classes.shoppingList}>
              <ShoppingList />
            </div>
          </Grid>
        </Grid>
      </div>
    </Provider>
  );
}

export default App;
