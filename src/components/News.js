import React, {useEffect, useState} from 'react'
import Loading from './Loading'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News =(props)=>{
  const [articles, setarticles] = useState([])
  const [page, setpage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

const cap = (string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  const updateNews= async ()=>{
    props.setProgress(10)
    setLoading(true)
    props.setProgress(20)
     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
     let data = await fetch(url)
    props.setProgress(70)
     let parsedData = await data.json()
     setarticles(parsedData.articles)
     setTotalResults(parsedData.totalResults)
     setLoading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = cap(`${props.category} - NewsMonkey`)
    updateNews();
    //eslint-disable-next-line
  },[])
  
  // previous and next button onclick-function -- removing this for infinite scroll
//   const handlePrevious = async()=>{
//   setpage(page - 1)
//       updateNews()
//   }
//  const handleNext = async ()=>{
//   setpage(page + 1)
//      updateNews()
//  }
const fetchMoreData = async () => {
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
  setpage(page+1)
  let data = await fetch(url)
     let parsedData = await data.json()
     setarticles(articles.concat(parsedData.articles))
     setTotalResults(parsedData.totalResults)
};
    return (
      
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:'80px 0 40px 0'}}>NewsMonkey - Top Headlines - {cap(props.category)}</h1>
        {loading && <Loading/>}
        
        <InfiniteScroll
    dataLength={articles.length}
    next={fetchMoreData}
    hasMore={articles.length !== totalResults}
    loader={<Loading/>}
    >
        <div className="row m-auto">
          {/* write this way when you have previous and next button. this will show loading icon every time new page loads on clicking button */}
          {/* {!loading && articles.map((element)=>{ */}
          {articles.map((element,index)=>{
            return <div className="col-md-4 my-2" key={index}>
            <Newsitem title={element.title?element.title.slice(0,60):''} description={element.description?element.description.slice(0,80):''} imageUrl={element.urlToImage?element.urlToImage:'https://static.independent.co.uk/2022/11/28/22/SEI135515409.jpg?quality=75&width=1200&auto=webp'} newsUrl={element.url} author=  {element.author? 'Published by ' + element.author:''} date={element.publishedAt} source={element.source.name?element.source.name:''}/>
              </div>          
          })}
        </div>
        </InfiniteScroll>

        {/* previous and next button -- removing this for infinite scroll */}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type='button' className="btn btn-danger" onClick={handlePrevious}>&larr; Previous</button>
        <button disabled={page +1 > Math.ceil(totalResults/`${props.pageSize}`)} type='button' className="btn btn-danger" onClick={handleNext}>Next &rarr;</button>
        </div> */}
      
      </div>
    )
}
News.defaultProps = {
  country:'gb',
  pageSize:9,
  category:'science'
}
News.propsTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string

}
export default News