import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, itemdecrement, RemoveToCart } from '../redux/cartslice/CartSlice';
import { BsPerson, BsTrash, BsTrash3Fill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { create_order } from '../redux/orderslice/oredersliceTest';

function Cartpage() {
    const { carts } = useSelector(state => state.allcart);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (carts.length === 0) {
            navigate("/");
        }
    }, [carts]);
    const handleIncrement = (item) => {
        dispatch(addToCart(item));
    };

    const handleDecrement = (item) => {
        dispatch(itemdecrement(item));
    };

    const handleRemove = (id) => {
        dispatch(RemoveToCart(id));
    };

    // const handlePayNow = async () => {
    //     if (carts.length === 0) {
    //         return alert("Your cart is empty!");
    //     }
    //     if (!user?.firstname) {
    //         return alert("Please add your address before proceeding to payment.");
    //     }

    //     try {
    //         const formData = {
    //             Username: user.name,
    //             userId: user._id,
    //             Usermobile: user.mobile,
    //             Useremail: user.email,
    //                category: "Jewelry"
    //         };

    //         const newOrder = await dispatch(create_order(formData)).unwrap();
    //         if (newOrder.success) {
    //             await dispatch(create_new_Order(newOrder));
    //             navigate("/success");
    //         }
    //     } catch (error) {
    //         console.error("Order creation failed:", error);
    //         alert("Failed to create order. Please try again.");
    //     }
    // };

    const handlePayNow = async () => {
        if (carts.length === 0) {
            return alert("Your cart is empty!");
        }
        if (!user?.Addresses) {
            return alert("Please add your address before proceeding to payment.");
        }

        const orderData = {
            userId: user._id,
            email: user.email,
            orderItems: carts.map((item) => ({
                productId: item._id,
                name: item.productName,
                quantity: item.qnty,
                price: item.price,
            })),
            totalPrice: carts.reduce((total, item) => total + item.qnty * item.price, 0),
            Address: user.Addresses[0].Address
        };

        try {
            const newOrder = await dispatch(create_order(orderData)).unwrap();
            alert("Order placed successfully!");
            navigate("/success");
        } catch (error) {
            console.error("Order creation failed:", error);
            alert("Failed to create order. Please try again.");
        }
    };

    console.log("user",carts.filter(itm => itm._id === user?._id));
    return (
        <div className='container-fluid'>

            <div style={{ marginTop: '40px' }} className="row w-100 justify-content-center mx-auto">
                <div className="col-lg-3">
                    <div className='container'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <BsPerson size="52" />
                        </div>
                        <table className='table table-hover'>
                            <tbody>
                                <tr>
                                    <th>
                                        Items in Cart <span>:</span>
                                        <span className="text-danger">{carts.length}</span>
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Total Price <span>:</span>{" "}
                                        <span className="text-danger">
                                            ₹{carts.reduce((total, item) => total + item.qnty * item.price, 0)}
                                        </span>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            {user ? (
                                <button className='paybtn' onClick={handlePayNow}>Pay Now</button>
                            ) : (
                                <button className='paybtn' onClick={() => navigate('/profile')}>Login to Pay</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div id='section2'>
                        {carts.length > 0 ? (
                            <div style={{ gap: '3vh', rowGap: '9vh' }} className='d-flex align-items-center justify-content-center flex-wrap'>
                                {carts
                                    // .filter(itm => itm.id === user?._id) // This ensures only the logged-in user's cart items are shown
                                    .map((itm) => (
                                            <div key={itm._id} id='cartcard' className="card p-1">
                                                <div>
                                                    <img
                                                        src={itm.images && itm.images.length > 0 ? itm.images[0] : "placeholder.jpg"}
                                                        style={{ objectFit: 'cover', height: '120px', width: '180px' }}
                                                        alt=""
                                                        className="img-fluid mx-auto"
                                                    />
                                                </div>
                                                <div>
                                                    <p id='cartproductname'>{itm.productName}</p>
                                                    <div>
                                                        <p className="pricecart text-center">₹{itm.price}</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    {itm.qnty > 0 ? (
                                                        <div id='btnofcart'>
                                                            <span
                                                                style={{ width: '32%', cursor: 'pointer', fontSize: '22px' }}
                                                                onClick={() => handleDecrement(itm)}
                                                                className='d-flex justify-content-center text-light'
                                                            >-</span>
                                                            <span style={{ width: '32%', cursor: 'pointer' }} className='d-flex justify-content-center text-light'>{itm.qnty}</span>
                                                            <span
                                                                style={{ width: '32%', cursor: 'pointer' }}
                                                                onClick={() => handleIncrement(itm)}
                                                                className='d-flex justify-content-center text-light'
                                                            >+</span>
                                                        </div>
                                                    ) : (
                                                        <div style={{ gap: '10px' }} className='d-flex justify-content-center align-items-center w-75'>
                                                            <span onClick={() => handleRemove(itm._id)}>
                                                                <BsTrash className='text-danger' size="23" />
                                                            </span>
                                                            <span
                                                                style={{ width: '35%', borderRadius: '7px' }}
                                                                onClick={() => handleIncrement(itm)}
                                                                className='bg-dark d-flex justify-content-center text-light'
                                                            >+</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        ) : (
                            <div className='d-flex justify-content-center align-items-center'>
                                <div>
                                    <h1 style={{ fontSize: '120px' }} className='text-center'>
                                        <BsTrash3Fill className='text-danger' />
                                    </h1>
                                    <p className='text-center' style={{ fontWeight: 'bold' }}>Your cart is empty...</p>
                                    <p className='text-center' style={{ cursor: 'pointer', fontFamily: 'monospace' }} onClick={() => navigate('/')}>Back to Home</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cartpage;
