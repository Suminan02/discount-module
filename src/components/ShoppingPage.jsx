import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { useNavigate, useLocation } from "react-router-dom";

const ShoppingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { items: passedItems } = location.state || {};
  const [itemArray, setArrayItem] = useState(passedItems || []);

  useEffect(() => {
    console.log("Updated cart items:", itemArray);
  }, [itemArray]);

  const itemData = [
    {
      id: "1",
      title: "T-Shirt",
      price: 350,
      category: "Clothing",
    },
    {
      id: "2",
      title: "Hat",
      price: 250,
      category: "Accessories",
    },
    {
      id: "3",
      title: "Hoodie",
      price: 700,
      category: "Clothing",
    },
    {
      id: "4",
      title: "Watch",
      price: 850,
      category: "Accessories",
    },
    {
      id: "5",
      title: "Bag",
      price: 640,
      category: "Accessories",
    },
    {
      id: "6",
      title: "Bell",
      price: 230,
      category: "Miscellaneous",
    },
  ];


  const FormatPrice = (price) => {
    const formatted = new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price);

    return formatted;
  };

  const handleClick = (item) => {
    setArrayItem((prevItems) => [...prevItems, item]);
  };

  const handleCheckOut = () => {
    navigate("/checkout", { state: { items: itemArray } });
  }

  return (
    <div className="container mx-auto">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Shopping Page</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <ShoppingCart />
                <Badge>{itemArray.length}</Badge>
              </Button>
              <Button onClick={handleCheckOut} items={itemArray}>Check Out</Button>
            </div>
          </div>
        </div>
      </header>
      <div className="py-5">
        <div className="space-y-2">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {itemData.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{FormatPrice(item.price)}</div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleClick(item)}>Add To Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ShoppingPage;