import axios from 'axios';
import React, {useState,useEffect} from 'react';
import './App.css';


function App() {
  
  const[data,setData]=useState();

  const [userState ,setUserState]=useState();

//starts from


// const InfiniteScroll = () => {
//   const [postList, setPostList] = useState({
//       list: [1,2,3,4]
//   }); 
//   // tracking on which page we currently are
//   const [page, setPage] = useState(1);
//   // add loader refrence 
//   const loader = useRef(null);

//   useEffect(() => {
//        var options = {
//           root: null,
//           rootMargin: "20px",
//           threshold: 1.0
//        };
//       // initialize IntersectionObserver
//       // and attaching to Load More div
//        const observer = new IntersectionObserver(handleObserver, options);
//        if (loader.current) {
//           observer.observe(loader.current)
//        }

//   }, []);


//   useEffect(() => {
//       // here we simulate adding new posts to List
//       const newList = postList.list.concat([1,1,1,1]);
//       setPostList({
//           list: newList
//       })
//   }, [page])

//   // here we handle what happens when user scrolls to Load More div
//  // in this case we just update page variable
//   const handleObserver = (entities) => {
//       const target = entities[0];
//       if (target.isIntersecting) {   
//           setPage((page) => page + 1)
//       }
//   }

// const List = () => {
//   const [listItems, setListItems] = useState(Array.from(Array(10).keys(), n => n + 1));
//   // const[taskName,settaskName]=useState(Array.from(Array(10).entries(), n => n + 1));
//   const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

//   function fetchMoreListItems() {
//     setTimeout(() => {
//       setListItems(prevState => ([...prevState, ...Array.from(Array(20).keys(), n => n + prevState.length + 1)]));
//       setIsFetching(false);
//     }, 2000);
//   }



//ended here
  
useEffect(()=>{
axios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=20')
.then(res=>{
  // console.log(res.data.data)
   setData(res.data.data)
  })
  .catch(err=>{
    console.log(err)
  })
},[])






function dataComboBox(e) {

  const selectedValue = e.target.value;
  const selecteName = data.filter((d) => d.name === selectedValue)[0];
  setUserState(selecteName);
  
}
 console.log("data",data)

// const [selectedValue,setSelectedvalue]=useState();
// console.log("selectedValue",selectedValue)
  return (
    
    <div>
      {/* <div className="head_data">
      {data?.map((s) =>(
            <h1  key={s.id } value ={s.id} c >{s.totalPassengers},{s.totalPages} 
             </h1>
 
          ))}
      </div> */}
       
    <select  className="dropdown" onChange={(e)=>{
      //  setSelectedvalue(data.filter((d) => d._id === selectedValue)["5fec5749c9a1dc27e9bca889"]);
     console.log("data",data);
      dataComboBox(e);
        }} >
      
          <option selected disabled="true"  >--select user name--</option>
          
          {data?.map((d) =>(
            <option  key={d.id } value ={d.id} className="opt"  >{d.name} 
            
             </option>
             
          ))}
        
   
   
        </select> 

  <table className="table_data">
    
    
  <tr>
    <th>{userState?.name}</th>
    
    <th>{userState?.trips}</th>
    
    <th>{userState?._id}</th>
    
    <th>{userState?.__v}</th>

    
    
    
    
    {/* {/* {userState?.map((d) =>(
            <th  key={d._id } value ={d.trips}  >{d.airline} 
            
             </th> */}
             
      {/* <th>{userState?.airline}</th> */}
    {/* <th> {<img src={userState?.img} height="100px" width="100px"></img>}</th> */}
  </tr>
  
  </table>
  {userState?.airline.map((a)=>
    <table className="airline_table" key={a.id}><p><h1>{a.name}</h1></p>
    <th>{a.country}</th>
   <th>{a.established}</th>
   <th> {a.head_quaters}</th>
    <th>"{a.slogan}"</th>
   <th> <img src={a.logo}></img></th>
   </table>
    
    )}
  </div>
  );
  }


export default App;
