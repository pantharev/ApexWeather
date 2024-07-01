import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      color: 'black',
    },
  };

export default function SubscriptionModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        Modal.setAppElement('#modals');
        fetch("/api/cron-subscription").then((res) => res.json()).then((data) => {
          console.log("Data", data);
        });
      }, [])
    
      function openModal() {
        setIsOpen(true);
      }

    const handleEmailChange = (e: any) => {
        // send a post request to /api/subscription
        setEmail(e.target.value);
    }

    const handleSubscriptionSubmit = (e: any) => {
        e.preventDefault();
        fetch("/api/subscription", {
            method: "POST",
            body: JSON.stringify({ email: email }),
        }).then((res) => res.json()).then((data) => {
            console.log("Data", data);
        });
    }
    
      function closeModal() {
        setIsOpen(false);
      }

    return (
        <>
            <button onClick={openModal} className="bg-lightBlue hover:bg-blue-300 rounded-md p-5 text-royalBlue">Subscribe</button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
        >
            <div className="flex flex-col">
            <div className="flex justify-end"><button onClick={closeModal} className="bg-slate-500 p-1">x</button></div>
            <div>
                <form className="flex flex-col justify-center items-center space-y-2">
                    <h2>Subscribe to the daily newsletter:</h2>
                    <div className="flex space-x-2">
                        <label className="font-bold text-black">Email:</label>
                        <input type="email" className="border-black border-2" onChange={handleEmailChange}></input>
                    </div>
                    <button className="bg-lightBlue hover:bg-blue-300 rounded-md p-4 text-royalBlue mx-auto" onClick={handleSubscriptionSubmit}>Subscribe</button>
                </form>
            </div>
            </div>
        </Modal>
      </>
    )
}