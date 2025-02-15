import React, { useEffect } from 'react';
import {useState} from 'react';
import {storage} from "../../firebase";
import {ref, uploadBytes, listAll, getDownloadURL, refFromURL} from "firebase/storage";
import {v4} from "uuid";
import file from "../../images/filePic.png";
import folder from "../../images/folder_direct.png";
import Shing from "../../database/NujabesSpin.mp3";
import Record from "../../database/Nujabes shing02 - luv( sic) parts 1-2 LIVE 자막.mp4";
//lostClashMusicInterview.jpg
import grip from "../../images/NujabesAlbum.png";
import './ConcertNujabes.css';

const Concert = () => {
     const [imageUpload, setImageUpload] = useState(null);
     const [imageList, setImageList] = useState([]);
     const imageListRef = ref(storage, 'concertNujabes/');
     const uploadImage = () => {
          if (imageUpload == null) return;
          const imageRef = ref(storage, ('concertNujabes/' + imageUpload.name))
          uploadBytes(imageRef, imageUpload).then((snapshot) => {
               alert("File Uploaded");
               getDownloadURL(snapshot.ref).then((url) => {
                    setImageList((prev) => [...prev, url])
               })
          });
     };

     useEffect(() => {
          listAll(imageListRef).then((response) => {
               response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                         setImageList((prev) => [...prev, url]);
                    })
               })
          })
     }, []);

     const scrollToTop = () => {
          window.scrollTo(0, 0)
      }
     return (
          <div className="Interview">
                           <div class="navbar"></div>
               <div class="name_title">
                    <div class = "name_title_text">Nujabes</div>
               </div>

               <img class="grip" src={grip}></img>

               <img class="folder_int" src={folder}></img>
               <div class = "int_text">Concert Footage</div>
               <div class="bio">Japanese: 瀬葉 淳, Hepburn: Seba Jun, February 7, 1974 – February 26, 2010), better known by his stage name Nujabes (ヌジャベス, Nujabesu), was a Japanese record producer, audio engineer, DJ, composer and arranger best known for his atmospheric instrumental mixes sampling from hip hop, soul, and jazz, as well as incorporating elements of trip hop, breakbeat, downtempo, and ambient music.Seba released two studio albums during his lifetime: Metaphorical Music (2003) and Modal Soul (2005).

</div>

               <div class = "name_display_title">
                    <div class = "name_display5">Download</div>
                    <div class = "name_display1">Name (view)</div>
                    <div class = "name_display2">Size</div>
                    <div class = "name_display">Type</div>
               </div>
               <div class = "file_row">
                    
                         <a href={Record} download>
                         <img class="filePicture" src={file}></img>
                         </a>
                    <div class = "filePicture_text1">
                         <a href= {Record} target="_blank">Nujabes_shing02 - luv( sic) parts 1-2 LIVE 자막</a> 
                    </div>
                    <div class = "filePicture_text4">33.4MB</div>
                    <div class = "filePicture_text3">MP4</div>
               </div>

               <div class = "marginal"></div>


               <div class = "file_row">

                    <a href={Shing} download>
                         <img class="filePicture" src={file}></img>
                    </a>
                    <div class = "filePicture_text1">
                         <a href = {Shing} target="_blank">Nujabes Record Spin Concert Japan 2010s</a>
                    </div>
                    <div class = "filePicture_text4">1.1 MB</div>
                    <div class = "filePicture_text3">MP3</div>
               </div>

               <input class="upload_box" type="file" onChange={(event) => {setImageUpload(event.target.files[0]);}}/>
               <button class = "submission" onClick={uploadImage}>Upload</button>
               <div class = "marginal_plus"></div>
               <div class = "instruction">If you want to add to this database, feel free to browse your local files and upload onto our
database to contribute to the archive.</div>
               <div class = "instruction2">You will get a pop up saying it is uploaded once it completes
processing and it will add onto the stack of information on screen at the bottom.</div>

               <div class = "name_display_title1">
                    <div class = "name_display5">Download</div>
                    <div class = "name_display1">Name(view)</div>
               </div>

               {imageList.map((url) => {
                    let link = new String(url);
                    const filename = link.split('/').pop().split('?')[0];
                    const decodedString = decodeURIComponent(filename);
                    const filename1 = decodedString.split('/').pop();
                    return (
                         <div class = "file_row">
                              
                              <a href={url} download>
                                   <img class="filePicture" src={file}></img>
                                   <div class = "marginal"></div>

                              </a>
                              <div class = "filePicture_text1">
                                   <a class = "filePicture_text1_plus" href = {url} target= "blank">{(filename1)}</a>
                                   <div class = "marginal"></div>

                              </div>
                         </div>
                    );
                    //<img src={url}/>;
               })}
               <div class="navbar"></div>
          </div>
     );
};

export default Concert;