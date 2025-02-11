import useClipboard from "react-use-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineMoreHoriz } from "react-icons/md";

const Card = ({ card, onClick }) => {
    const [isCopied, setCopied] = useClipboard(card?.text);
    console.log('card', card)

    return (
        <div

        >

            <div className="bg-white rounded-lg shadow-md p-2 w-[300px] h-[400px] flex flex-col justify-between  border-red-800 border-2">

                {/* <div className="">
                    <audio controls className="w-full rounded-lg">
                        <source src={card.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div> */}

                <div className="">
                    <audio controls className="w-full rounded-lg bg-transparent">
                        <source src={card.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>

                <div className=" h-[270px] overflow-y-auto border-green-700 border-2 rounded-lg">
                    <p className="text-gray-700 text-sm leading-relaxed p-1">{card.text}</p>

                </div>

                <div className="flex justify-end items-center gap-1 bottom-0">
                    <p className="text-sm">
                        <strong>Time:</strong> {new Date(card.createdAt).toLocaleString()}
                    </p>

                    <button onClick={setCopied} className=" bg-blue-500 hover:bg-blue-700  flex items-center text-white  rounded">
                        <AiOutlineCopy /> {isCopied ? "Yes! 👍" : "Nope! 👎"}
                    </button>
                    <FaPlus />
                    <MdOutlineMoreHoriz onClick={() => onClick(card)}
                        style={{
                            cursor: 'pointer'
                        }}
                    />

                </div>

            </div>
        </div>
    );
};

export default Card;
