import { CiSearch } from "react-icons/ci";
const TopSearch = () => {
    return (
        <>
            <div className="w-full p-4 my-4 ">
                <div className=" flex items-center shadow-md p-2 gap-2 rounded-xl">
                    <CiSearch />
                    <input type="text" name="" id="" placeholder="Search"  className="outline-none px-3"/>
                </div>
                <div className="">
                    <h1>sort</h1>
                </div>
            </div>

        </>
    )
}

export default TopSearch
