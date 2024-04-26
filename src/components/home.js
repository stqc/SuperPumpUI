import React from "react";
import TokenGrid from "./tokenGrid";
import { Factory, web3Handler } from "./connection";


export default function HomePage(){
    const [mainPageData,updateMainPageData] = React.useState([]);
    const [reveresData,updateReversedData] = React.useState([]);
    const [currentName,updateName] = React.useState("Popular token")


    React.useEffect(
        ()=>{
    
         getTopTokens();
    
        },[]
    
      )
    
      const getTopTokens=()=>{
    
        fetch('https://superpumpbackend.vercel.app/top_addresses_last_7_days')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(async data => {
          // Update state with the fetched data
          let newData=[]
          data.forEach(async element => {

          
            // console.log(price)
            newData.push(
              <TokenGrid key={element.address_} name={element.name} address={element.address} image={element.image} />
            )
          });
    
          let reverse = [].concat(newData);
          updateMainPageData(newData)
          updateReversedData(reverse.reverse())
        })
        .catch(error => {
          console.error('Error:', error);
        });
    
    
      }
    
    const getNewTokens= ()=>{
      fetch('https://superpumpbackend.vercel.app/new_tokens_last_7_days')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(async data => {
          // Update state with the fetched data
          let newData=[]
          data.forEach(element => {
            newData.push(
              <TokenGrid key={element.address_} name={element.name} address={element.address} image={element.image}/>
            )
          });
    
          let reverse = [].concat(newData);
          updateMainPageData(reverse.reverse())
          updateReversedData(newData)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    
    
    }

    return(
        <>
        <div>
          <div className="banner">
            <div className='banner-main' style={{height:"1000px", width:"500px", position:"absolute", marginTop:"10%", zIndex:"99", marginLeft:"100px"}}>
          <img height={"100%"} width={"100%"}
            className="banner-image"
            src="https://s3-alpha-sig.figma.com/img/7778/49f2/afae6301dafe27325bdfcbdf2ba6df0d?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V7FbBnUaj9QXG805QyWmWG0CI2Ki1ONL2Pn9ZmqHHzjuN4lu9s9SL6o9NVnWCXMGqtwhxku3SSAxxWfg6moXfk00UMQUgeoR7Y5-nanQdBVjH08HRFjX3a86MFY45Jj4kICnv58ZuVWLtieTg-JVUBTdodw6D4vCn6RHcdPr4FNGHX7oIODTBWax~GZ9Fvb7fxsVOlsiSPuvwOysqrO6xtKCzXsrI8d6aNFOjj9saRJiemuQWzlC8GioAWwJSx9DM~SdeQzP4QP5hWoakpUojMftwB22MbEiiT4hq7qGVq~s4o1-ax78f2djADKO5CEtgxVSfx6K1LHSoUf6Jq8rkg__"
            alt="Banner"
          />
          <p className="heading-main super">Super</p>
          <p className="heading-main pump">Pump</p>
          <p className="memebetter" >MEME<br></br><span style={{marginLeft:"50px"}}>BETTER</span></p>
          
          </div>
          <div className="banner-content">
          </div>
        </div>
      </div>
      <div className='sort'>
          <div>
            <h3>{currentName}</h3>
          </div>
          <div style={{display:"flex", gap:"20px"}}>
              <div className='sort-options'>
                <label>View By</label>
                <select className='sort-selector' onChange={(e)=>{
                  if(e.target.value=="New"){getNewTokens(); updateName("New tokens")}else{getTopTokens(); updateName("Popular tokens")}
                }}>
                  <option>
                    Most Popular
                  </option>
                  <option>
                    New
                  </option>
                </select>
              </div>
              <div className='sort-options'>
                <label>Sort By</label>
                <select className='sort-selector' onChange={(e)=>{
                    const dec = mainPageData;
                    const rev = reveresData;
                    if(e.target.value=="Increasing"){
                      updateMainPageData(rev);
                      updateReversedData(dec)
                    }
                    else{
                      updateMainPageData(rev);
                      updateReversedData(dec)
                    }
                }}>
                  <option>
                    Decreasing
                  </option>
                  <option>
                    Increasing
                  </option>
                </select>
              </div>
          </div>
      </div>
      <div className='token-grid'>
        {mainPageData}
    </div>
    </>
    )
}