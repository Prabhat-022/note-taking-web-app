import TopSearch from './Main_Layout/TopSearch'
import NoteCart from './Main_Layout/NoteCart'
import BottomSearch from './Main_Layout/BottomSearch'
import Index from './Left_Layout/Index'
import { useSelector } from 'react-redux'
import Card from './Card'
import Modal from './Modal'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Example data for the cards
const initialCards = [
    {
        id: 1,
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        text: 'This is the first card.',
        time: '10:00 AM',
    },
    {
        id: 2,
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        text: 'This is the second card.',
        time: '11:00 AM',
    },
    // Add more cards as needed
];

const Home = () => {


    
    const user = JSON.parse(localStorage.getItem("user"))
    const [cards] = useState(initialCards);
    // const [cards, setCards] = useState(initialCards);

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleCloseModal = () => {
        setSelectedCard(null);
    };

    const getAllNotes = async () => {

        try {
            const res = await axios.post('/api/v1/note/get-all-notes', { user:user._id });
            console.log('Note fetched res:', res.data)
            // setCards(res.data)
        } catch (error) {
            console.log(`Error fetching notes: ${error}`)
        }
    }
    getAllNotes()



    return (
        <>


            <div className="flex ">
                <div className="w-1/4">
                    <Index />
                </div>
                <div className="w-full">
                    <TopSearch />
                    <div className="h-[calc(100vh-300px)] ">

                        <div style={{ padding: '20px', width: '30%' }}>
                            <h1>Card List</h1>
                            {cards.map((card) => (
                                <Card key={card.id} card={card} onClick={handleCardClick} />
                            ))}

                            {/* Render the modal if a card is selected */}
                            {selectedCard && <Modal card={selectedCard} onClose={handleCloseModal} />}
                        </div>
                    </div>
                    <BottomSearch />
                </div>
            </div>
        </>
    )
}

export default Home
