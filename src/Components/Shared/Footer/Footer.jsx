import { FaFacebookF, FaInstagram, FaMapLocationDot, FaPhoneVolume, FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import Container from "../Container/Container";
import { IoMdTime } from "react-icons/io";

const Footer = () => {
    return (
        <div>
        {
<footer className="bg-gray-800 text-white  pt-24 mt-24 FutureDelete">
    <Container>
  <div className="container mx-auto ">
   <div className="flex flex-wrap justify-between">
     <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
       <h2 className="text-2xl font-bold mb-3">CORPORATE</h2>
       <ul className="list-none">
         <li className="mb-2">
           <a href="#home" className="hover:text-gray-300">
             Home
           </a>
         </li>
         <li className="mb-2">
           <a href="#about" className="hover:text-gray-300">
             About WorthingFx
           </a>
         </li>
         <li className="mb-2">
           <a href="#how-it-works" className="hover:text-gray-300">
             How It Works
           </a>
         </li>
         <li className="mb-2">
           <a href="#send-money" className="hover:text-gray-300">
             Send Money To
           </a>
         </li>
       </ul>
     </div>
     <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
       <h2 className="text-2xl font-bold mb-3">LEGAL INFORMATION</h2>
       <ul className="list-none">
         <li className="mb-2">
           <a href="#cookie-policy" className="hover:text-gray-300">
             Cookie Policy
           </a>
         </li>
         <li className="mb-2">
           <a href="#fraud-awareness" className="hover:text-gray-300">
             Fraud Awareness
           </a>
         </li>
         <li className="mb-2">
           <a href="#agent-locations" className="hover:text-gray-300">
             Agent Locations
           </a>
         </li>
         <li className="mb-2">
           <a href="#complaint-procedure" className="hover:text-gray-300">
             Complaint Procedure
           </a>
         </li>
       </ul>
     </div>
     <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
       <h2 className="text-2xl font-bold mb-3">SUPPORT</h2>
       <ul className="list-none">
         <li className="mb-2">
           <a href="#help" className="hover:text-gray-300">
             Help
           </a>
         </li>
         <li className="mb-2">
           <a href="#support" className="hover:text-gray-300">
             Support
           </a>
         </li>
         <li className="mb-2">
           <a href="#privacy-policy" className="hover:text-gray-300">
             Privacy Policy
           </a>
         </li>
         <li className="mb-2">
           <a href="#terms-conditions" className="hover:text-gray-300">
             Terms & Conditions
           </a>
         </li>
       </ul>
     </div>
     <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 flex flex-col gap-2">
       <h2 className="text-2xl font-bold mb-3">GET IN TOUCH</h2>
       <p className="flex gap-x-4 items-center"><FaMapLocationDot/> 35 CHAPEL RD WORTHING BN11 1EG </p>
       <p className="flex gap-x-4 items-center" > <FaPhoneVolume />01903 202702</p>
       <p className="flex gap-x-4 items-center" > <IoIosMail />support@worthingfx.co.uk</p>
       <p className="flex gap-x-4 items-start" > <IoMdTime />Opening hours <br /> Monday to Saturday : 9AM to 5Pm <br />
       Sunday : 10Am to 2Pm </p>
     </div>
   </div>
 </div >
 {/* copyright Section */}
 <h2 className="text-white text-[15px] mt-16  mb-3 ">Worthing Fx IS A TRADING NAME OF WORTHING FX SERVICES LTD,REGISTERED IN ENGLAND AND WALES UNDER NUMBER 10874304,REGISTERED ADDRESS: 35 CHAPEL ROAD , WORTHING, BN11 1EG.</h2>
 <div className="border-t-2">
 <div className=" px-20 py-4 flex justify-between ">
   <p>Copyright © 2024 Worthing FX All rights reserved.</p>
   <div>
       <ul className="flex gap-x-4 text-xl items-center">
        <li>
        <a rel="noreferrer" href="https://www.facebook.com/worthingfx" target='_blank' ><FaFacebookF/></a>
        </li>
           
           <li><FaInstagram/></li>
           <li><FaXTwitter/></li>
           

       </ul>
   </div>
   
   </div>
 </div>      
    </Container>
 
</footer>
}

   </div>
    );
};

export default Footer;