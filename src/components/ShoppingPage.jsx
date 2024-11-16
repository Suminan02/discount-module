import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Items from "./Items";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";


const ShoppingPage = ()=>{

  const [items,setItems]=useState([]);

  const itemData=[
    { 
      id : "1",
      title : "T-Shirt",
      price : 350,
    },
    { 
      id : "2",
      title : "Hat",
      price : 250,
    },
    { 
      id : "3",
      title : "Hoodie",
      price : 700,
    },
    { 
      id : "4",
      title : "Watch",
      price : 850,
    },
    { 
      id : "5",
      title : "Bag",
      price : 640,
    },
    { 
      id : "6",
      title : "Bell",
      price : 230,
    }
  ]

  const FormatPrice = (price) => {
    // Format the amount as a dollar amount
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

    return formatted;
  };

  const handleClick=(item)=>{
    setItems(item);
    //console.log(items);
    console.log(item);
  }

  return (
    <div className="container mx-auto">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Shopping Page</h2>
            <div className="flex items-center space-x-2">
              <Button><ShoppingCart /></Button>
              <Button>Check Out</Button>
            </div>
          </div>
        </div>
        </header>
        <div className="py-5">
        <div className="space-y-2">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {itemData.map((id) => (
            <Card key={id.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {id.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {FormatPrice(id.price)}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={(id)=>handleClick(id)}>Add To Cart</Button>
              </CardFooter>
            </Card>
          ))}
          ;
        </div>
      </div>
        </div>
    </div>
  )
};


export default ShoppingPage;
