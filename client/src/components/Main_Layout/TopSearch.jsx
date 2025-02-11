import { CiSearch } from "react-icons/ci";
import { GrSort } from "react-icons/gr";
const TopSearch = () => {
    return (
        <>
            <div className="w-full p-4 my-4 flex items-center">
                <div className=" flex items-center shadow-md p-2 gap-2 rounded-xl w-[90%]">
                    <CiSearch />
                    <input type="text" name="" id="" placeholder="Search" className="outline-none px-3" />
                </div>
                <div className="flex items-center  justify-center gap-2 border-2 p-1 rounded-xl bg-gray-400 mx-2 px-2 cursor-pointer">
                    <h1>
                        <GrSort />
                    </h1>
                    <h1 className="text-md ">Sort</h1>
                </div>
            </div>

        </>
    )
}

export default TopSearch
