import React, { useEffect, useState, useRef  } from 'react';
import App from './App';
import axios  from 'axios';

const divStyle = {
    color: 'blue',
    height: '100px',
    textAlign: 'center',
    padding: '5px 10px',
    background: '#eee',
    marginTop: '15px'
};


const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
}

const InfiniteScroll = () => {
    const [postList, setPostList] = useState({
        list: [1,2,3,4]
    }); 

    const[data,setData]=useState();

  // const [userState ,setUserState]=useState();

  

    // tracking on which page we currently are
    const [page, setPage] = useState(1);

    useEffect(()=>{
      axios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=30')
      .then(res=>{
        //  console.log(res.data.data)
         setData(res.data.data)
        })
        .catch(err=>{
          console.log(err)
        })
      },[page])

    // add loader refrence 
    const loader = useRef(null);

    useEffect(() => {
         var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
         };
        // initialize IntersectionObserver
        // and attaching to Load More div
         const observer = new IntersectionObserver(handleObserver, options);
         if (loader.current) {
            observer.observe(loader.current)
         }

    }, []);

    // useEffect(() => {
    //       // here we simulate adding new posts to List
    //       // const newList = postList.list.concat(['name']);
    //       setData(data.data)
    //       console.log("sathishdata",data)
    //   }, [page])

    // useEffect(() => {
    //     // here we simulate adding new posts to List
    //      const newList = data.list.concat(['name']);
    //     setData(
    //         data.data
    //     )
    // }, [page])

    // here we handle what happens when user scrolls to Load More div
   // in this case we just update page variable
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {   
            setPage((page) => page + 1)
        }
    }


    return (<div className="container" style={containerStyle}>
        <div className="post-list">
            {
                // postList.list.map((post, index) => {
                //     return (<div key={index} className="post" style={divStyle}>
                //         <h2> {post } </h2>
                //     </div>)
                // })
                 data?.map((post, index) => {
                    return (<div key={index} className="post" style={divStyle}>
                        <h2> {post.name } </h2>
                    </div>)
                })
                
            }
            
            <div className="loading" ref={loader}>
                    <h2>Load More</h2>
           </div>
        </div>
    </div>)
}

export default InfiniteScroll;