import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux"
import SingleTagItem from "./SingleComponents/SingleTagItem"
import loadingGIF from "../images/loading.gif"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    tagsBox: {
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
    },
    loadinggif: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
    }
}));

const TagsFilter = ({ tags, tagCount }) => {

    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [tagsToShow, setTagsToShow] = React.useState([])
    const [tCount, setTCount] = React.useState([])

    React.useEffect(() => {
        if (tags.length !== 0) {
            setLoading(false)
        }
        setTagsToShow(tags)
        setTCount(tagCount)
    }, [tags, tagCount])

    const filterTags = (e) => {
        e.preventDefault()
        let filteredTags = []
        let filteredTagCounts = []
        tags.map((tag, index) => {
            if(tag.tagName.toLowerCase().includes(e.target.value)){
                filteredTags.push(tag)
                filteredTagCounts.push(tagCount[index])
            }
        })
        setTagsToShow(filteredTags)
        setTCount(filteredTagCounts)
    }
    return (
        <>
            <h5>Tags</h5>
            <div className={classes.tagsBox}>
                <div>
                    <input type="text" onChange={filterTags} placeholder="Search tags" className={classes.searchBar} />
                </div>
                <div className={classes.insideBox}>
                    {loading && <div className={classes.loadinggif}><img src={loadingGIF} alt="loading" /></div>}
                    {!loading && <FormGroup>
                        {tagsToShow.map((tag, index) => {
                            return (
                                <SingleTagItem tags={tags} tagName={tag.tagName} tagNum={tCount[index]} />
                            );
                        })}

                    </FormGroup>}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return { tags: state.tags, tagCount: state.tagCount }
}

export default connect(mapStateToProps)(TagsFilter);