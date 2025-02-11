import useClipboard from "react-use-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineMoreHoriz } from "react-icons/md";

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

            <div className="bg-white rounded-lg shadow-md p-4 w-[300px] h-[400px] flex flex-col justify-between">
                <div className="">
                    <audio controls className="w-full">
                        <source src={card.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className=" h-[200px] overflow-y-auto">
                    <p className="text-gray-700 text-sm mt-2">{card.text}</p>

                </div>
                <div className="flex justify-end items-center gap-2 bottom-0">

                    <button onClick={setCopied} className=" bg-blue-500 hover:bg-blue-700  flex items-center text-white font-bold py-2 px-4 rounded">
                        <AiOutlineCopy /> {isCopied ? "Yes! 👍" : "Nope! 👎"}
                    </button>
                    <FaPlus />
                    <MdOutlineMoreHoriz />

                </div>



            </div>

        </div>
    );
};

export default Card;
