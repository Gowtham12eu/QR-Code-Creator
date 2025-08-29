import { useState } from "react"

export const QRcode = () => {
    const [img,setImg]=useState("")
    const [loading,setloading]=useState(false)
    const [qrdata,setdata]=useState("Bruce")
    const [qrSize,setqrsize]=useState("150");
   async function generateqr()
    {
        setloading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data={https%3A%2F%2F${qrdata}.in%2F}`;
            setImg(url)
        }catch(error){
            console.log("Error generating QRcode",error);
            setImg(url)
        }
        finally{
            setloading(false)
        }
    }
     function downloadbutton(){
        fetch(img).then((Response)=>Response.blob()).then((blob)=>
            {const link=document.createElement("a")
            link.href=URL.createObjectURL(blob)
            link.download="QRcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);  
        })
        .catch((error)=>{
            console.error("error in QRcode",error);
     });
    }
  return (
    <div className="app-container">
        <h1>QRcode Generator</h1>
        {loading&&<p>Pleasw Wait ...</p>}
        {img && <img className="qr-code-image" src={img} alt="image" />}
        <div>
            <label htmlFor="datainput" className="input-label">
                Data for QR code:
            </label>
            <input type="text" value={qrdata} id="dataInput" placeholder="Enter data for QRcode" onChange={(e)=>setdata(e.target.value)}/>
             <label htmlFor="sizeinput" className="input-label">
                Image Size (eg.,150):
            </label>
            <input type="text" value={qrSize}id="sizeInput" placeholder="Enter Image Size" onChange={(e)=>setqrsize(e.target.value)}/>
            <button className="generate-button" disabled={loading} onClick={generateqr}>Generate QR code</button>
            <button className="download-button" onClick={()=>downloadbutton()}>Download QR code</button>
        </div>
        <p className="Footer">Designed by Gowtham.K</p>
    </div>
  )
}
