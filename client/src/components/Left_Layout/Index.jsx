
import { GiStabbedNote } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

const Index = () => {
    return (
        <>
            <div className=" h-full flex flex-col justify-between p-4 m-4 shadow-md rounded-xl">
                <div className=" flex items-center">
                    <GiStabbedNote color="red"/>
                    <h1>AI Notes</h1>
                </div>
                <div className="">
                    <div className="flex items-center">
                        <IoHomeOutline />
                        <h1>Home</h1>
                    </div>

                    <div className="flex items-center">
                        <FaRegHeart />
                        <h1>Favourite</h1>
                    </div>
                </div>

                <div className=" flex ">
                    <div className=" bg-black text-white rounded-full w-8 h-8 flex justify-center items-center">
                        E
                    </div>
                    <h1>Emmanual Vincent</h1>
                </div>
            </div>

        </>
    )
}

export default Index
