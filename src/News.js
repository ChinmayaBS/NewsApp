import React,{Component} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';


class News extends Component{

    static defaultProps={
        country:"in",
        pageSize:"5",
        category:"general"
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

    constructor(){
        super();
        this.state={
            articles:[],
            page:1,
            loading:false
        }
    }
    async componentDidMount(){
        this.props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2faacb85ad8444e99a17b89ec8488eb7&page=1&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let data=await fetch(url);
        this.props.setProgress(30);
        let receivedData=await data.json();
        this.props.setProgress(70);
        this.setState({
            articles:receivedData.articles,
            totalResults:receivedData.totalResults,
            loading:false
        })
        this.props.setProgress(100);
    }

    previousClick=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2faacb85ad8444e99a17b89ec8488eb7&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let data=await fetch(url);
        let receivedData=await data.json();
        this.setState({
            page:this.state.page-1,
            articles:receivedData.articles,
            loading:false
        })
    }
    nextClick=async()=>{
        if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2faacb85ad8444e99a17b89ec8488eb7&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let data=await fetch(url);
        let receivedData=await data.json();
        this.setState({
            page:this.state.page+1,
            articles:receivedData.articles,
            loading:false
        })
    }
    }

    render(){
        return(
            <div className="container mt-3">
                <h2 className="text-center" style={{marginTop:"70px"}}>NewsApp-Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return(
                            <div className="col-lg-4"  key={element.url}>
                                <Newsitem title={element.title?element.title:""} 
                                description={element.description?element.description:""} 
                                imgUrl={element.urlToImage}
                                newsUrl={element.url} author={element.author} date={element.publishedAt}
                                source={element.source.name}/>
                            </div>
                        )
                    })}
                </div>
                <div className="container d-flex justify-content-between m-3">
                    <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.previousClick}>Previous</button>
                    <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.nextClick}>Next</button>
                </div>
            </div>
        )
    }
}
export default News;