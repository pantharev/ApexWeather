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

export default function WeatherModal({ title, description, image, weather, weatherDay } : { title: string, description: string, image: string, weather: string, weatherDay?: any }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        Modal.setAppElement('#modals');
        console.log("weatherDay", weatherDay);
      }, [weatherDay])
    
      function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

    return (
        <>
            <button onClick={openModal} className="bg-lightBlue hover:bg-blue-300 rounded-md p-5 text-royalBlue">More info</button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
        >
            <div className="flex flex-col">
            <div className="flex justify-end"><button onClick={closeModal} className="bg-slate-500 p-1">x</button></div>
            <div>
                <h2>{title}</h2>
                <div>Avg {description}</div>
                <div>{weatherDay || "No data"}</div>
            </div>
            </div>
        </Modal>
      </>
    )
}