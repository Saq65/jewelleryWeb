import axios from "axios";

const RazorpayButton = () => {
  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/create-order", {
        amount: 500, 
      });

      const options = {
        key: "your_razorpay_key_id",
        amount: data.amount,
        currency: "INR",
        name: "Your Website",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Saqlain",
          email: "saqlain@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Failed:", error);
    }
  };

  return <button className="mt-5" onClick={handlePayment}>Pay with Razorpay</button>;
};

export default RazorpayButton;
