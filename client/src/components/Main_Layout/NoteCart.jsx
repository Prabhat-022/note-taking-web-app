
const NoteCart = ({ note }) => {

    return (
        <>


            <div className="w-[300px] h-[400px] bg-white rounded-xl shadow-md">
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-lg font-bold">Time</h1>
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1>record</h1>
                    </span>
                </div>
                <hr className="border-gray-300" />
                <div className="p-4">
                    <h1 className="text-xl font-bold">title</h1>
                    <p className="text-gray-600">text</p>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-center items-center p-4">

                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center p-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        copy
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        more....
                    </button>
                </div>
            </div>
        </>
    )
}

export default NoteCart
