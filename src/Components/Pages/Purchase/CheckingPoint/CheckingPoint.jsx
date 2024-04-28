import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { IoIosCheckbox } from 'react-icons/io';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseAxious from '../../../../Hook/UseAxious';
import generateRandomAlphabet from './../../../ExtraFuntion/GenerateUniqueId';
import OrderList from '../../../Dashboard/Pages/OrderDetails/OrderList/OrderList';

const CheckingPoint = ({ setAddressSelected, setNextForm, nextFrom, currentWay }) => {
    const AddressForm = useRef();
    let OrdersOrder = JSON.parse(localStorage.getItem('purchase'));
    const [address, setAddress] = useState('location');
    const Axious = UseAxious();
    const [Order, setlastOrder] = useState({});
    const [selected, setSelected] = useState(false);
    console.log(currentWay);
    const GetAddress = () => {
        if (address == 'location') {
            return toast('Select the checking point');
        }

        const OrderFormLocalStorage = JSON.parse(localStorage.getItem('purchase'));
        if (OrderFormLocalStorage?.length < 1) {
            return toast('Please add currency item');
        }
        setAddressSelected(address);
        setNextForm(2);
    };

    const getFinishedOrder = (e) => {
        e.preventDefault();
        try {
            const First_Name = e.target.FirstName.value;
            const Last_Name = e.target.LastName.value;
            const Email = e.target.to_email.value;
            const Confrim_Email = e.target.ConfromEmail.value;
            const Phone_Number = e.target.Number.value;
            if (Email !== Confrim_Email) {
                return toast('Emails doesnt match');
            }

            if (!selected) {
                return toast('Please select the rules');
            }

            const UserInformation = {
                Order_Id: generateRandomAlphabet(),
                Name: First_Name + ' ' + Last_Name,
                Email: Email,
                Phone_Number: Phone_Number,
                Address: address,
                Orders: JSON.parse(localStorage.getItem('purchase')),
                status: '',
                CurrencyName: '',
                FxAmount: ``,
                Rate: OrdersOrder[0].Rate,
                TotalMoney: ``,
                Status: 'Pending',
                title: '',
                SecondRow: '',
                FourthRow: '',
                time: new Date()
            };
            if (currentWay == 'Order') {
                UserInformation.title = 'Click & Collect';
                UserInformation.SecondRow = 'Amount';
                UserInformation.FourthRow = 'Fx Amount';
                UserInformation.FxAmount = `${OrdersOrder[0].currencyMy} ${OrdersOrder[0].currencyMycurrent}`;
                UserInformation.TotalMoney = `${OrdersOrder[0].currencyTake} ${OrdersOrder[0].currencyTakecurrent}`;
                UserInformation.CurrencyName = OrdersOrder[0].currencyMycurrent;
                UserInformation.status = 'buy';
                UserInformation.secondTitle = `Collecting your order :`;
                UserInformation.secondMessege = `When collecting your order, you will need to provide proof of ID in the form of photographic ID (passport or driving license). Please note that proof of address, such as a utility bill or a bank/credit card statement dated within the past 90 days, may also be needed in certain circumstances.`,
               UserInformation.firstMessege = `Your order ${UserInformation.Order_Id} is currently being processed, and we will notify you when it is ready for collection from our Branch - ${UserInformation.Address}.`;
               
            } else if (currentWay == 'Sell') {
                UserInformation.title = 'Click & Sell';
                UserInformation.SecondRow = 'Fx Amount';
                UserInformation.FourthRow = 'Amount';
                UserInformation.FxAmount = ` ${OrdersOrder[0].currencyMy} ${OrdersOrder[0].currencyMycurrent}`;
                UserInformation.TotalMoney = `${OrdersOrder[0].currencyTake} ${OrdersOrder[0].currencyTakecurrent}`;
                UserInformation.CurrencyName = OrdersOrder[0].currencyTakecurrent;
                UserInformation.status = 'sell';
                UserInformation.firstMessege = `Thank you for your order. Please bring this email or order number ${UserInformation.Order_Id} with you to your selected location to sell your foreign currency.`;
                UserInformation.note = 'Note: Click & Sell rates are subject to verification of all banknotes at the premises. We may decline to accept notes which are found to be counterfeited, out of date, torn or damaged or insignificant in value. We do not accept foreign coins. Our Click & Sell rate does not apply to large denomination notes such as Euro 500. Different rates will apply for those denominations. For full terms and conditions, visit our website.'
            }

            console.log(UserInformation.Orders.currencyMycurrent);
            const tempForm = document.createElement('form');
            tempForm.style.display = 'none';

            // Loop through the keys of the UserInformation object and create input fields
            for (const key in UserInformation) {
                const input = document.createElement('input');
                input.type = 'text';
                input.name = key;
                input.value = UserInformation[key];
                tempForm.appendChild(input);
            }

            Axious.post('/Order', UserInformation).then((res) => {
                emailjs.sendForm('service_lpt9pd1', 'template_2p4oryp', tempForm, '1JjxeYWCp4LVzupMd').then((res) => {
                    console.log(res);
                });
                setlastOrder(UserInformation);
                localStorage.clear('purchase');

                setNextForm(3);
            });
        } catch {
            setNextForm(1);
            return toast('Something went wrong');
        }
    };

    return (
        <div className="mt-28">
            {nextFrom == 1 ? (
                <>
                    <h2 className="md:text-2xl sm:text-xl text-xl text-[#4A53A4]">Select a Collection Point</h2>

                    <select
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                        className=" mt-5 border-gray-500 w-full border px-2 py-2 rounded-lg outline-gray-500"
                    >
                        <option value="location">Select locaiton</option>
                        
                        <option value="35 CHAPEL ROAD WORTHING BN11 1EG Tel: 01903 202702">35 CHAPEL ROAD WORTHING BN11 1EG Tel: 01903 202702</option>
                        <option value="123 QUEENS ROAD BRIGHTON BN1 3WB Tel:01273 030708"> 123 QUEENS ROAD BRIGHTON BN1 3WB Tel:01273 030708</option>
                    </select>

                    <div className=" mt-5 flex  justify-end">
                        <button onClick={GetAddress} className="flex bg-[#93C94E] px-5 py-3 hover:bg-[#678c36] hover:text-white gap-2">
                            Next <span> + </span>
                        </button>
                    </div>
                </>
            ) : (
                ''
            )}

            {nextFrom == 2 ? (
                <>
                    <h2 className="md:text-2xl sm:text-xl text-xl text-[#4A53A4]">Personal Details</h2>

                    <form ref={AddressForm} onSubmit={getFinishedOrder} className="flex flex-col">
                        <input
                            name="FirstName"
                            required
                            type="text"
                            placeholder="Enter First Name"
                            className=" border mt-4 md:max-w-[500px] sm:w-full px-3 py-2 text-lg border-gray-400 focus:outline-none  rounded-md"
                        />
                        <input
                            name="LastName"
                            required
                            type="text"
                            placeholder="Enter Last Name"
                            className=" border mt-4 md:max-w-[500px] sm:w-full px-3 py-2 text-lg border-gray-400 focus:outline-none  rounded-md"
                        />
                        <input
                            name="to_email"
                            required
                            type="email"
                            placeholder="Enter Email"
                            className=" border mt-4 md:max-w-[500px] sm:w-full px-3 py-2 text-lg border-gray-400 focus:outline-none  rounded-md"
                        />
                        <input
                            name="ConfromEmail"
                            required
                            type="email"
                            placeholder="Confirm Email"
                            className=" border mt-4 md:max-w-[500px] sm:w-full px-3 py-2 text-lg border-gray-400 focus:outline-none  rounded-md"
                        />
                        <input
                            name="Number"
                            required
                            type="tel"
                            placeholder="Enter Phone Number"
                            className=" border mt-4 md:max-w-[500px] sm:w-full px-3 py-2 text-lg border-gray-400 focus:outline-none  rounded-md"
                        />
                        <h2 className="gap-2 flex items-center  mt-4 text-lg">
                            {selected ? (
                                <IoIosCheckbox
                                    className="text-2xl"
                                    onClick={() => {
                                        setSelected(false);
                                    }}
                                ></IoIosCheckbox>
                            ) : (
                                <MdOutlineCheckBoxOutlineBlank
                                    onClick={() => {
                                        setSelected(true);
                                    }}
                                    className="text-2xl"
                                ></MdOutlineCheckBoxOutlineBlank>
                            )}
                            I accept all the{' '}
                            <Link className="text-blue-600 hover:underline" to={'/termsCoditition'}>
                                Terms and condition
                            </Link>
                        </h2>

                        <div className="flex  mt-3 md:max-w-[500px] sm:w-full justify-end">
                            <button type="submit" onClick={GetAddress} className="flex bg-[#93C94E] px-5 py-3 hover:bg-[#678c36] hover:text-white gap-2">
                                Next +
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                ''
            )}
            {nextFrom == 3 ? (
                <>
                    {/* <div className="bg-gray-100 py-10  px-6 ">
                        <h2 className="md:text-4xl text-3xl text-center font-medium flex justify-center items-center gap-3">
                            {' '}
                            <img className="w-10 md:block hidden" src="/Images/check-mark.png" alt="" />
                            Your Order Confirmation
                        </h2>
                        <div className="flex md:flex-row flex-col items-start">
                            <div className="mt-20 flex-1 gap-3 flex flex-col  ">
                                <h2 className="mb-4 sm:text-2xl text-xl flex items-center gap-2 font-semibold">
                                    Personal Information <img className="w-6" src="/Images/contract.png" alt="" />
                                </h2>
                                <h2 className="sm:text-xl  ">
                                    {' '}
                                    <span className="font-medium">Name</span>: {Order?.Name}
                                </h2>
                                <h2 className="sm:text-xl ">
                                    {' '}
                                    <span className="font-medium">Email</span>: {Order?.Email}
                                </h2>
                                <h2 className="sm:text-xl ">
                                    {' '}
                                    <span className="font-medium">Phone</span>: {Order?.Phone_Number}
                                </h2>
                            </div>
                            <div className="mt-20 flex-1 gap-3 flex flex-col  ">
                                <h2 className="mb-4 sm:text-2xl text-xl flex items-center gap-2 font-semibold">
                                    Order Information <img className="w-6" src="/Images/contract.png" alt="" />
                                </h2>

                                <h2 className="sm:text-xl">
                                    {' '}
                                    <span className="font-semibold">Order Id </span>: {Order?.Order_Id}
                                </h2>
                                <h2 className="sm:text-xl my-2">
                                    {' '}
                                    <span className="font-semibold">Checking Point </span>: {Order?.Address}
                                </h2>
                                {Order?.Orders?.map((item) => (
                                    <h2 className="sm:text-xl  ">
                                        You Give{' '}
                                        <span className="font-semibold">
                                            : {item?.currencyTake} {item?.currencyTakecurrent}{' '}
                                        </span>{' '}
                                        >> You get{' '}
                                        <span className="font-semibold">
                                            : {item?.currencyMy} {item?.currencyMycurrent}
                                        </span>
                                        (Rate {item?.Rate} )
                                    </h2>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center mt-20">
                            <Link to="/">
                                <button className="btn bg-[#93C94E] px-5 py-3 hover:bg-[#678c36] hover:text-white">Got To Home</button>
                            </Link>
                        </div>
                    </div> */}
                            <div className='my-10 sm:px-10 px-3'>

{/* Currency Calculation */}
<div className="overflow-auto border border-gray-400">
<div className="px-4 py-2 border-b border-gray-400 bg-[#618a2c] text-white">
<h1 className="text-xl font-semibold">Order Number: {Order?.Order_Id}</h1>
</div>
<table className="min-w-full">
<thead>
<tr className="border-b  border-gray-400">
<th style={{backgroundColor:'#[#1a0d43]'}} className="px-4 py-2  text-left bg-[#1E4A9A] border-r border-gray-400  text-white">Currency</th>
<th className="px-4 py-2  text-left  border-r border-gray-400 bg-[#1E4A9A] text-white">From</th>
<th className="px-4 py-2  text-left  border-r border-gray-400 bg-[#1E4A9A] text-white">To</th>
<th className="px-4 py-2  text-left  bg-[#1E4A9A] text-white">Rate</th>
</tr>
</thead>
<tbody>
{Order?.Orders?.map((item, index) => (
<OrderList key={index} item={item}></OrderList>
))}
</tbody>
</table>
</div>

{/* User address */}
<div className="overflow-hidden border mt-10 border-gray-400">
<div className="px-4 py-2 border-b border-gray-400 overflow-auto bg-[#618a2c] text-white">
<h1 className="text-xl font-semibold">Booking Details</h1>
</div>
<div className="min-w-full">
<div className="flex border-b border-gray-400">
<div className="py-3 border-r border-gray-400 font-semibold md:w-[20%] w-[30%] text-center bg-[#1E4A9A] text-white">
Full Name
</div>
<div className="border-gray-400 bg-gray-200 py-3 px-4 w-[80%] text-start">
{Order?.Name}
</div>
</div>
<div className="flex border-b border-gray-400">
<div className="py-3 border-r border-gray-400 font-semibold md:w-[20%] w-[30%] text-center bg-[#1E4A9A] text-white">
Email
</div>
<div className="border-gray-400 bg-gray-200 py-3 px-4 w-[80%] text-start">
{Order?.Email}
</div>
</div>
<div className="flex border-b border-gray-400">
<div className="py-3 border-r border-gray-400 font-semibold md:w-[20%] w-[30%] text-center bg-[#1E4A9A] text-white">
Contact
</div>
<div className="border-gray-400 bg-gray-200 py-3 px-4 w-[80%] text-start">
{Order?.Phone_Number}
</div>
</div>
<div className="flex">
<div className="py-3 border-r border-gray-400 font-semibold md:w-[20%] w-[30%] text-center bg-[#1E4A9A] text-white">
Pickup Location
</div>
<div className="border-gray-400 bg-gray-200 py-3 px-4 w-[80%] text-start">

{Order?.Address}
</div>
</div>
</div>
</div>


<div className="mt-10 flex flex-col gap-5 bg-[#1E4A9A] p-5 text-white">
<h2 className="sm:text-lg text-base font-semibold">Important Notification</h2>
<p className="text-sm">Please read carefully before you leave for the collection.</p>
<p className="text-sm">Collect your Instore Branch collection order on the same day in between office hours. Kindly read the Terms and Conditions for payments and necessary supporting documents.</p>
<p className="text-sm">All orders are accepted subject to stock and denominations availability at your selected branch. A member of our team will be in touch promptly only if the currency booked is not available and advise you of an alternate collection time. Please print the order confirmation receipt and present it at the selected branch counter, or you can quote the reference number with your ID for collection.</p>
<p className="text-sm">For Card Payment: Your ID must be in the form of either your valid passport or full UK or European photo driving licence, European ID, along with your payment bank card, which must match the name on the order.</p>
</div>

</div>
                </>
            ) : (
                ''
            )}
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default CheckingPoint;
