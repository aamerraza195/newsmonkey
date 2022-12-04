import React, { Component } from 'react'
import Loading from './Loading'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
export class News extends Component {
static defaultProps = {
  country:'gb',
  pageSize:9,
  category:'science'
}
static propsTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string

}
cap = (string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props){
    super(props)

    this.state = {
      articles: [],
      page:1,
      loading: false,
      totalResults:0
    
    }
    document.title = this.cap(`${this.props.category} - NewsMonkey`)
  }
  async componentDidMount(){
    console.log('first')
    this.updateNews()
    }
  updateNews= async ()=>{
    this.props.setProgress(10)
    this.setState({loading:true})
    this.props.setProgress(20)
     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
     let data = await fetch(url)
    this.props.setProgress(70)
     let parsedData = await data.json()
     this.setState({
       articles:parsedData.articles,
      totalResults:parsedData.totalResults,
       loading: false
      })
    this.props.setProgress(100)
  }
  // handlePrevious = async function(){}
  // previous and next button onclick-function -- removing this for infinite scroll
//    handlePrevious = async()=>{
//       await this.setState({
//        page:this.state.page - 1, 
//       })
//       this.updateNews()
//   }
//   handleNext = async ()=>{
//     this.setState({
//       page:this.state.page + 1
//      },()=>this.updateNews())
//  }
fetchMoreData = async () => {
     this.setState({
      page:++this.state.page,
    });
     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
     let data = await fetch(url)
     let parsedData = await data.json()
     this.setState({
       articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      })
};
  render() {
    return (
      
      <div className='container my-3'>
        <h1 className='text-center my-5'>NewsMonkey - Top Headlines - {this.cap(this.props.category)}-❤❤❤❤</h1>
        <h1 className='text-center my-5'>NewsMonkey - Top Headlines - {this.cap(this.props.category)}-❤❤❤❤</h1>
        {this.state.loading && <Loading/>}
        
        <InfiniteScroll
    dataLength={this.state.articles.length}
    next={this.fetchMoreData}
    hasMore={this.state.articles.length !== this.state.totalResults}
    loader={<Loading/>}
    >
        <div className="row m-auto">
          {/* write this way when you have previous and next button. this will show loading icon every time new page loads on clicking button */}
          {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
          {this.state.articles.map((element,index)=>{
            return <div className="col-md-4 my-2" key={index}>
            <Newsitem title={element.title?element.title.slice(0,60):''} description={element.description?element.description.slice(0,80):''} imageUrl={element.urlToImage?element.urlToImage:'https://static.independent.co.uk/2022/11/28/22/SEI135515409.jpg?quality=75&width=1200&auto=webp'} newsUrl={element.url} author=  {element.author? 'Published by ' + element.author:''} date={element.publishedAt} source={element.source.name?element.source.name:''}/>
              </div>          
          })}
        </div>
        </InfiniteScroll>

        {/* previous and next button -- removing this for infinite scroll */}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type='button' className="btn btn-danger" onClick={this.handlePrevious}>&larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/`${this.props.pageSize}`)} type='button' className="btn btn-danger" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      
      </div>
    )
  }
}
export default News