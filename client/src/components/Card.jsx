
const Card = ({ card, onClick }) => {
    console.log('card:', card)
    return (
        <div
            onClick={() => onClick(card)}
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                cursor: 'pointer',
            }}

        >

            <div className="bg-white rounded-lg shadow-md p-4 w-[300px] h-[400px]">
                <audio controls className="w-full">
                    <source src={card.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

                <p className="text-gray-700 text-sm mt-2">{card.text}</p>
            </div>

        </div>
    );
};

export default Card;
