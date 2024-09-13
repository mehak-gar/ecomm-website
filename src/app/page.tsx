'use client';



import Products from "@/components/Products";
import Navbar from "../components/Navbar/Navbar";

import { AppDispatch } from "@/store";


export default function Home() {

  return (
<>
<Navbar/>

<Products/>
</>
  );
}
