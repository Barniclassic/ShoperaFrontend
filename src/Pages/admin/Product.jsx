import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Product.css";
import { Publish } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/apiRedux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Product() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, _id: productId, img: downloadURL, categories: cat };
          console.log(product);
          updateProduct(productId, product, dispatch);
        });
      }
    );
  };
  

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/addproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" name="title"  placeholder={product.title} onChange={handleChange}/>
                  <label>Product Descreption</label>
                  <input type="text" name="desc" placeholder={product.desc} onChange={handleChange}/>
                  <label>Product Price</label>
                  <input type="text"name="price" placeholder={product.price} onChange={handleChange}/>
                  <label>Categories</label>
                  <input type="text" placeholder={product.categories} onChange={handleCat} />
                  <label>Size</label>
                  <select name="size" id={product.size} onChange={handleChange}>
                      <option value="XL">XL</option>
                      <option value="L">L</option>
                      <option value="M">M</option>
                      <option value="S">S</option>
                      <option value="XS">XS</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                  </select>
                  <label>Color</label>
                  <select name="color" id={product._id} onChange={handleChange}>
                      <option value="black">black</option>
                      <option value="gray">gray</option>
                      <option value="blue">blue</option>
                      <option value="red">red</option>
                      <option value="white">white</option>
                  </select>
                  <label>In Stock</label>
                  <select name="inStock" id={product._id} onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label><Publish/></label>
                      <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
                  </div>
                  <button className="productButton" onClick={handleClick}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}