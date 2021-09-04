import React from "react"
import axios from 'axios';


export const Fetch = () => {
    const [allProducts, setAllProducts] = React.useState([])
    const [mugProducts, setMugProducts] = React.useState([])
    const [shirtProducts, setShirtProducts] = React.useState([])
    const [companies, setCompanies] = React.useState([])
    const [companyCount, setCompanyCount] = React.useState([])
    const [tags, setTags] = React.useState([])
    const [counts, setCounts] = React.useState([])

    const compare = (a, b) => {
        const aName = a.slug
        const bName = b.slug
        let comparison = 0;
        if (aName > bName) {
            comparison = 1
        }
        else if (aName < bName) {
            comparison = -1
        }
        return comparison
    }

    React.useEffect(() => {
        axios.get("https://getirserver.herokuapp.com/api/companies").then((response) => {
            setCompanies(response.data.sort(compare))
            setCompanyCount(new Array(response.data.length).fill(0))
        })
        axios.get("https://getirserver.herokuapp.com/api/products").then((response) => setAllProducts(response.data))
    }, []);

    React.useEffect(() => {
        allProducts.map((product) => product.amount = 0)
    }, [allProducts])

    React.useEffect(() => {
        companies.map((company) => company.isFiltered = false)
    }, [companies])

    React.useEffect(() => {
        var mugs = [];
        var shirts = [];
        allProducts.map((product) => {
            if (product.itemType === "mug") {
                mugs.push(product)
            }
            else {
                shirts.push(product)
            }
            setMugProducts(mugs);
            setShirtProducts(shirts)
        })

    }, [allProducts])

    React.useEffect(() => {
        let arr = new Array(companies.length).fill(0)
        for (let i = 0; i < allProducts.length; i++) {
            for (let j = 0; j < companies.length; j++) {
                if (allProducts[i].manufacturer === companies[j].slug) {
                    let item = arr[j];
                    item = item + 1;
                    arr[j] = item;
                }
            }
        }
        setCompanyCount(arr)
    }, [companies, allProducts])

    React.useEffect(() => {
        for (let i = 0; i < allProducts.length; i++) {
            for (let j = 0; j < allProducts[i].tags.length; j++) {
                let items = tags;
                items.push(allProducts[i].tags[j])
                setTags(items)
            }
        }
        let unique = tags.filter((c, index) => {
            return tags.indexOf(c) === index;
        });
        setTags(unique.sort())
    }, [companies, allProducts])

    React.useEffect(() => {
        let arr2 = new Array(tags.length).fill(0)
        for (let i = 0; i < tags.length; i++) {
            for (let j = 0; j < allProducts.length; j++) {
                for (let k = 0; k < allProducts[j].tags.length; k++) {
                    if (allProducts[j].tags[k] === tags[i]) {
                        let added = arr2[i];
                        added = added + 1;
                        arr2[i] = added;
                    }
                }
            }
        }
        setCounts(arr2)
    }, [companies, allProducts, tags])


    return { companies, allProducts, mugProducts, shirtProducts, companyCount, tags, counts }
}
