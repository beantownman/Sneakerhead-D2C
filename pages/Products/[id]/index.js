import React from 'react';
import Navbar from '../../../components/Molecules/NavBar';
import Footer from '../../../components/Molecules/Footer';
import ContactUs from '../../../components/Molecules/ContactUs';
import ContactMode from '../../../components/Molecules/ContactMode';
import ProductDetails from '../../../components/Molecules/ProductDetails/index.js';
import YouMayLike from '../../../components/Molecules/YouMayLike/index.js';
import Grid from '../../../components/Atoms/Grid/index.js';
import { createClient as createClientD } from "contentful";

import {
    defaultEndpointProducts,
    defaultEndpointCart,
    authEndpoint,
    generateHexString 

  } from "../../Property";
  import { clientid, clientsecret, searchClient } from "../../Cred.js";
import { useRouter } from 'next/router';
import useSWR from 'swr';
  

export async function getServerSideProps({ query }) {
    const auth_res = await fetch(authEndpoint, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientid + ":" + clientsecret).toString("base64"),
      },
    });
  
    let res_auth = await auth_res.json();
  
    const clientToken = res_auth.access_token;
    let valVal = generateHexString(14);
  let title = "sadasfdasd" + valVal;

  const client = createClientD({
    space: "27dvrilv9g9m",
    accessToken: "7eR1gkrfTTlkiHY0BP-gqdqB3RBm_z6E6EB1xYljiQo",
  });
 
  

    const resProduct = await fetch(defaultEndpointProducts, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + clientToken,
        },
      });
    
      const productList = await resProduct.json();

    return {
      props: {
        
        productList
      },
    };
  }

const Product = ({productList}) => {
  const router = useRouter()
  const {id} = router.query
  
  console.log("id",id)

  const { data } = useSWR(
    `/api/getProductDetails?id=${id}`
  );
  
  data && console.log("swr bss",data)
    return ( <>
    
    
    <Navbar/>
{   data && <ProductDetails value={data}/>}
    <Grid marginTop="2rem" marginBottom="2rem">
    <YouMayLike data={productList}/>
    </Grid>
    <ContactUs/>
    
    <ContactMode/>
    <Footer/>
    </> );
}
 
export default Product;