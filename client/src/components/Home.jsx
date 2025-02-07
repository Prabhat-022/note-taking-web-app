import TopSearch from './Main_Layout/TopSearch'
import BottomSearch from './Main_Layout/BottomSearch'
import Index from './Left_Layout/Index'
import Card from './Card'
import Modal from './Modal'
import { useState } from 'react'
import useGetAllTheData from '../hooks/useGetAllTheData'
import { useSelector } from 'react-redux'

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
    useGetAllTheData()
    const { note } = useSelector((state) => state.user)
    console.log('note:', note)
    // const [cards] = useState(note);
    // const [cards, setCards] = useState(initialCards);

    const [selectedCard, setSelectedCard] = useState(null);
    const handleCardClick = (card) => {
        setSelectedCard(card);

    };

    const handleCloseModal = () => {
        setSelectedCard(null);

    };


    return (
        <>


            <div className="flex h-screen ">
                <div className="w-1/5 h-full  border-gray-300">
                    <Index />
                </div>

                <div className="w-4/5 h-full flex flex-col m-2 justify-between">
                    <div className="h-12  border-gray-300">
                        <TopSearch />
                    </div>

                    <div className="">
                        <h1 className="p-4 m-2 text-2xl font-bold mt-4">Card List</h1>
                    </div>
                    <div className="overflow-y-auto flex m-2  ">
                        {note.map((card) => (
                            card.map((card, index) => (
                                <Card key={card.id} card={card} onClick={handleCardClick} />
                            )
                            )))
                        }

                        {selectedCard && <Modal card={selectedCard} onClose={handleCloseModal} />}
                    </div>

                    <div className="m-10">
                        <BottomSearch />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
