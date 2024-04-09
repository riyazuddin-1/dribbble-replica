const Navbar = ({ auth = "complete", avatar }) => {
    return ( 
        <div className="flex px-4">
            <img className="w-24 mx-2" src="../assets/dribble_icon_pink.png"/>
            <div className={`flex-1 hidden ${ auth == "complete" ? "md:flex" : ""}`}>
                <div className="flex gap-8 px-8 py-2 text-sm">
                    <a href="" className="my-auto">Inspiration</a>
                    <a href="" className="my-auto">Find Work</a>
                    <a href="" className="my-auto">Learn Design</a>
                    <a href="" className="my-auto">Go Pro</a>
                    <a href="" className="my-auto">Hire Designers</a>
                </div>
                <div className="ms-auto flex">
                    <div className="p-3">
                    <label htmlFor="input-group-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        </div>
                        <input
                        type="text"
                        id="input-group-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 ps-10 p-2"
                        placeholder="Search"
                        />
                    </div>
                    </div>
                    <div className="grid place-content-center bg-cover bg-center my-auto h-8 aspect-square rounded-full" style={{backgroundImage: "url("+ avatar +")"}}></div>
                    <button className="bg-pink-500 text-white m-2 p-2 rounded-md" disabled>Upload</button>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;