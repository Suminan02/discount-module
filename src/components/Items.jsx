import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Items=()=>{
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
  return (
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
                <Button>Add To Cart</Button>
              </CardFooter>
            </Card>
          ))}
          ;
        </div>
      </div>
  )
};

export default Items;