import useClipboard from "react-use-clipboard";

const Card = ({ card, onClick }) => {
    const [isCopied, setCopied] = useClipboard(card?.text);

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

                <button onClick={setCopied} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Was it copied? {isCopied ? "Yes! 👍" : "Nope! 👎"}
                </button>
            </div>

        </div>
    );
};

export default Card;
