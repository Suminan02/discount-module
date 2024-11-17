import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = location.state || {};
  const groupedItems = items ? groupItems(items) : [];
  const totalValue = groupedItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [customerPoints, setCustomerPoints] = useState(1000);

  const discountCampaigns = [
    { id: 1, name: "10% Off", type: "Percentage", value: 10, category: "Coupon" },
    { id: 2, name: "฿50 Off", type: "Fixed", value: 50, category: "Coupon" },
    { id: 3, name: "20% Clothing Discount", type: "CategoryPercentage", value: 20, category: "On Top", applicableCategory: "Clothing" },
    { id: 4, name: "Spend Points for Discount", type: "Points", maxPercentage: 20, category: "On Top" },
    { id: 5, name: "Special Campaign: Spend ฿100, Get ฿10", type: "StepDiscount", stepAmount: 100, discountPerStep: 10, category: "Seasonal" },
  ];

  const calculateCartTotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const applyDiscount = (total, discount, groupedItems) => {
    if (discount.type === "Percentage") {
      return total - (total * discount.value) / 100;
    } else if (discount.type === "Fixed") {
      return total - discount.value;
    } else if (discount.type === "CategoryPercentage") {
      const categoryTotal = groupedItems
        .filter(item => item.category === discount.applicableCategory)
        .reduce((sum, item) => sum + item.totalPrice, 0);
      return total - (categoryTotal * discount.value) / 100;
    } else if (discount.type === "Points") {
      const maxDiscount = (total * discount.maxPercentage) / 100;
      const pointsDiscount = Math.min(customerPoints, maxDiscount);
      return total - pointsDiscount;
    } else if (discount.type === "StepDiscount") {
      const steps = Math.floor(total / discount.stepAmount);
      return total - steps * discount.discountPerStep;
    }
    return total;
  };

  const calculateFinalPrice = (cart, selectedDiscounts) => {
    let total = calculateCartTotal(cart);

    // Group discounts by category
    const discountGroups = selectedDiscounts.reduce((acc, discount) => {
      acc[discount.category] = discount;
      return acc;
    }, {});

    // Apply discounts in order of priority: Coupon > On Top > Seasonal
    ["Coupon", "On Top", "Seasonal"].forEach((category) => {
      const discount = discountGroups[category];
      if (discount) {
        total = applyDiscount(total, discount, cart);
      }
    });

    return Math.max(0, total);
  };

  const toggleDiscount = (discount) => {
    setSelectedDiscounts((prev) => {
      if (prev.find((d) => d.id === discount.id)) {
        return prev.filter((d) => d.id !== discount.id);
      } else {
        return [
          ...prev.filter((d) => d.category !== discount.category),
          discount,
        ];
      }
    });
  };

  const renderDiscountCard = (discount) => {
    switch (discount.type) {
      case "Percentage":
      case "Fixed":
        return (
          <>
            <p>Type: {discount.type}</p>
            <p>
              Value: {discount.type === "Percentage" ? `${discount.value}%` : `฿${discount.value}`}
            </p>
            <p>
              Category: {discount.category}
            </p>
          </>
        );
      case "Points":
        return (
          <>
            <p>Type: Points</p>
            <p>Max Discount: {discount.maxPercentage}%</p>
            <p className="text-sm text-gray-500">You have {customerPoints} points.</p>
            <p>Category: {discount.category}</p>
          </>
        );
      case "StepDiscount":
        return (
          <>
            <p>Type: Step Discount</p>
            <p>
              Spend ฿{discount.stepAmount} to get ฿{discount.discountPerStep} off per step.
            </p>
            <p>Category: {discount.category}</p>
          </>
        );
      case "CategoryPercentage":
        return (
          <>
            <p>Type: Category Percentage</p>
            <p>
              Value: {discount.value}% off for {discount.applicableCategory}.
            </p>
            <p>Category: {discount.category}</p>
          </>
        );
      default:
        return <p>Type: {discount.type}</p>;
    }
  };

  const finalPrice = calculateFinalPrice(groupedItems, selectedDiscounts);

  return (
    <div className="container mx-auto">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Checkout Page</h2>
            <Button variant="ghost" onClick={() => navigate("/", { state: { items } })} className="flex items-center gap-2">
              <ArrowLeft />
              Back To Shopping
            </Button>
          </div>
        </div>
      </header>
      <div className="py-5">
        <h3 className="text-2xl font-bold mb-4">{`Summary`}</h3>
        {groupedItems.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>฿{item.price.toFixed(2)}</TableCell>
                  <TableCell>฿{item.totalPrice.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-right font-bold">
                  Total Value:
                </TableCell>
                <TableCell>฿{totalValue.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="text-right font-bold">
                  Final Price (after discounts):
                </TableCell>
                <TableCell>฿{finalPrice.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>

              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
      <Separator />
      <div className="py-5">
        <h3 className="text-2xl font-bold mb-4">Apply Discounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {discountCampaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <CardTitle>{campaign.name}</CardTitle>
              </CardHeader>
              <CardContent>{renderDiscountCard(campaign)}</CardContent>
              <CardFooter>
                <Button
                  variant={selectedDiscounts.find((d) => d.id === campaign.id) ? "default" : "outline"}
                  onClick={() => toggleDiscount(campaign)}
                >
                  {selectedDiscounts.find((d) => d.id === campaign.id) ? "Selected" : "Select"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const groupItems = (items) => {
  const grouped = items.reduce((acc, item) => {
    const existing = acc.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
      existing.totalPrice += existing.price;
    } else {
      acc.push({ ...item, quantity: 1, totalPrice: item.price });
    }
    return acc;
  }, []);
  return grouped;
};

export default CheckoutPage;
