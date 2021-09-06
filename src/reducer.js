import {ADD_TO_CARD, INCREASE_AMOUNT, DECREASE_AMOUNT, LOW_TO_HIGH, HIGH_TO_LOW, NEW_TO_OLD
, OLD_TO_NEW, CHANGE_CHECKED_BRANDFILTER, CHANGE_CHECKED_TAGFILTER, CLEAR_SHOPPING_BOX, DELETE_FROM_LIST} from "./actions"

function sortItems(arr = [], prop = "", type = 1) {
    arr.sort(
        function (a, b) {
            if (a[prop] < b[prop])
                return -1 * type;
            else if (a[prop] > b[prop])
                return 1 * type;
            else
                return 0;
        }
    )
    return arr
}

function splitMugAndShirt(products = []) {
    var mugs = [];
    var shirts = [];
    products.map((product) => {
        if (product.itemType === "mug") {
            mugs.push(product)
        }
        else {
            shirts.push(product)
        }
    })
    return {mugs, shirts}
}

const reducer = (state, action) => {
    if (action.type === ADD_TO_CARD) {
        const tempPr = state.allProducts;
        const pr = tempPr.find((product) => product.added === action.payload.id)
        const temp = state.productsInList.filter((product) => (product.added === pr.added))
        const beforeAdd = state.productsInList;
        if (temp.length === 0) {
            beforeAdd.push(pr)
        }
        pr.amount++;

        return { ...state, total: state.total + pr.price, productsInList: beforeAdd }
    }
    else if (action.type === INCREASE_AMOUNT) {
        const tempPr = state.allProducts;
        const pr = tempPr.find((product) => product.added === action.payload.productID)
        pr.amount++;
        return { ...state, total: state.total + pr.price }
    }
    else if (action.type === DECREASE_AMOUNT) {
        const tempPr = state.allProducts;
        const pr = tempPr.find((product) => product.added === action.payload.productID)
        pr.amount--;
        let tempList = state.productsInList;
        if (pr.amount === 0) {
            tempList = tempList.filter((product) => product.added !== action.payload.productID)
        }
        return { ...state, total: state.total - pr.price, productsInList: tempList }
    }
    else if (action.type === LOW_TO_HIGH) {
        const sorted = sortItems(state.products, "price", 1)
        const {mugs, shirts} = splitMugAndShirt(sorted)
        return { ...state, products: sorted, mugProducts: mugs, shirtProducts: shirts }
    }
    else if (action.type === HIGH_TO_LOW) {
        const sorted = sortItems(state.products, "price", -1)
        const {mugs, shirts} = splitMugAndShirt(sorted)
        return { ...state, products: sorted, mugProducts: mugs, shirtProducts: shirts }
    }
    else if (action.type === NEW_TO_OLD) {
        const sorted = sortItems(state.products, "added", 1)
        const {mugs, shirts} = splitMugAndShirt(sorted)
        return { ...state, products: sorted, mugProducts: mugs, shirtProducts: shirts }
    }
    else if (action.type === OLD_TO_NEW) {
        const sorted = sortItems(state.products, "added", -1)
        const {mugs, shirts} = splitMugAndShirt(sorted)
        return { ...state, products: sorted, mugProducts: mugs, shirtProducts: shirts }
    }
    else if(action.type === CHANGE_CHECKED_BRANDFILTER){
        const companyID = action.payload.id
        const obj = state.companies.find((company)=> company.account === companyID)
        obj.isChecked = !obj.isChecked
        var newProducts = []
        let comps = state.companies
        let allprs = state.allProducts
        let temp = 0
        for(let i = 0; i < comps.length; i++){
            if(comps[i].isChecked){
                temp++
            }
            for(let j = 0; j < allprs.length; j++){
                if(comps[i].isChecked){
                    if(allprs[j].manufacturer === comps[i].slug){
                        newProducts.push(allprs[j])
                    }
                }  
            }
        }
        if(temp === 0){
            newProducts = state.allProducts
        }
        let res = []
        let tags = state.tags
        let tempCount = 0
        for(let i = 0; i < tags.length; i++){
            if(tags[i].isChecked){
                tempCount++
            }
            for(let j = 0; j < newProducts.length; j++){
                for(let k = 0; k < newProducts[j].tags.length; k++ ){
                    if(tags[i].isChecked){
                        if(newProducts[j].tags[k] === tags[i].tagName){
                            res.push(newProducts[j])
                        }
                    }
                }
            }
        }

        if(tempCount === 0){
            res = newProducts
        }
        const {mugs, shirts} = splitMugAndShirt(res)
        return {...state, products:res, mugProducts: mugs, shirtProducts: shirts}
    }
    else if(action.type === CHANGE_CHECKED_TAGFILTER){
        const tagName = action.payload.tagName
        const obj = state.tags.find((tag)=> tag.tagName === tagName)
        obj.isChecked = !obj.isChecked
        var newProducts2 = []
        let tags = state.tags
        let allprs = state.allProducts
        let temp = 0
        for(let i = 0; i < tags.length; i++){
            if(tags[i].isChecked){
                temp++
            }
            for(let j = 0; j < allprs.length; j++){
                for(let k = 0; k < allprs[j].tags.length; k++ ){
                    if(tags[i].isChecked){
                        if(allprs[j].tags[k] === tags[i].tagName){
                            newProducts2.push(allprs[j])
                        }
                    }
                }
            }
        }
        if(temp === 0){
            newProducts2 = state.allProducts
        }
        let res = []
        let comps = state.companies
        let tempCount = 0
        for(let i = 0; i < comps.length; i++){
            if(comps[i].isChecked){
                tempCount++
            }
            for(let j = 0; j < newProducts2.length; j++){
                if(comps[i].isChecked){
                    if(newProducts2[j].manufacturer === comps[i].slug){
                        res.push(newProducts2[j])
                    }
                }   
            }
        }
        if(tempCount === 0){
            res = newProducts2
        }
        const {mugs, shirts} = splitMugAndShirt(res)
        return {...state, products:res, mugProducts: mugs, shirtProducts: shirts}
    }
    else if(action.type === CLEAR_SHOPPING_BOX) {
        for(let i = 0; i < state.productsInList.length; i++){
            state.productsInList[i].amount = 0
        }
        return {...state, productsInList: [], total: 0}
    }
    else if(action.type === DELETE_FROM_LIST){
        const tempPr = state.allProducts;
        const pr = tempPr.find((product) => product.added === action.payload.productID)
        const amountTemp = pr.amount
        pr.amount = 0
        console.log(pr)
        let newList = state.productsInList
        newList = newList.filter((product) => product.added !== action.payload.productID)
        return {...state, productsInList: newList, total: state.total - (amountTemp * pr.price)}

    }
    return state;
}

export default reducer
