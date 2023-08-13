import { contract_abi } from "./contract_abi";
import Verification from "./verification";
// import { db } from "../firebase";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";


const config = {
    provider: "https://polygonzkevm-testnet.g.alchemy.com/v2/IgxFTeO7tSFrLIUZumEs3inEtmwcSZpD",
    contract_addr: "0xE29187C752E034aE49f051DBBb1585b8F844146e",
    address: "0xc4323611FdD306e4E4A922D1700aAeb8e824651C",
    pvt_key: "103613ca1dae42ec6dda89359d9f35a4ccaeb1537871b23282717f495125d953",
  };
  console.log(config)
  
 export const verifier = new Verification(config, contract_abi);
  
  // const [medicalData, setMedicalData] = useState([]);
  // const medicalDataCollectionRef = collection(db, "medicalrecords");

  // useEffect(() => {
  //   const getMedicalData = async () => {
  //     const data = await getDocs(medicalDataCollectionRef);
  //     const filteredData = data.docs
  //       .filter((doc) => doc.data().useremail === userEmail)
  //       .map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setMedicalData(filteredData);
  //   };
  //   getMedicalData();
  // }, [userEmail]);

  // console.log(medicalData);



  // Usage
  //const dataRow = [medicalData[0]?.patientemail, medicalData[0]?.doctoremail, medicalData[0]?.date, medicalData[0]?.diagnosis, medicalData[0]?.medication, medicalData[0]?.remarks]; 
  
  // verifier
  //   .uploadHash(dataRow, process.env.WALLET_ADDRESS)
  //   .then((txHash) => {
  //     console.log("Transaction Hash:", txHash);
  //   })
  //   .catch((error) => {
  //     console.log("thisis err", error);
  //   });
  
  // verifier
  //   .verifyHash(dataRow)
  //   .then((isVerified) => {
  //     console.log("Is Hash Verified:", isVerified);
  //   })
  //   .catch((error) => {
  //     console.log("thisis err", error);
  //   });