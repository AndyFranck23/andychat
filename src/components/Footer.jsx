export function Footer({ data }) {
    return (
        <footer className="mt-20">
            <div className=" grid grid-cols-1 md:grid-cols-4 gap-4  bg-footer p-5 text-[15px] sm:text-[18px] ">
                <div className="...">
                    <h1 className="text-white pb-[30px] font-bold">TRUCS & ASTUCES DE VOYAGE</h1>

                    <ul className=" list-[circle] pl-5 text-gray-200 space-y-2 ">
                        {data.map((item, index) => (
                            <li key={index} className="">
                                <a href={item.lien} className="hover:text-gray-400">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="...">
                    <h1 className="text-white font-bold">DESTINATIONS</h1>
                    <ul className=" list-[circle] pl-5 text-gray-200 space-y-2 ">
                        {data.map((item, index) => (
                            <li key={index} className="">
                                <a href={item.lien} className="hover:text-gray-400">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="...">
                    <h1 className="text-white font-bold">TOP BONS PLANS</h1>
                    <ul className=" list-[circle] pl-5 text-gray-200 space-y-2  ">
                        {data.map((item, index) => (
                            <li key={index} className="">
                                <a href={item.lien} className="hover:text-gray-400">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="...">
                    <h1 className="text-white font-bold">CATEGORIES DE VOYAGE</h1>
                    <ul className=" list-[circle] pl-5 text-gray-200 space-y-2 ">
                        {data.map((item, index) => (
                            <li key={index} className="">
                                <a href={item.lien} className="hover:text-gray-400">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex justify-center items-center text-center p-5 sm:p-10 text-xs sm:text-lg">
                <p>Bons plans de séjour tout compris, voyage all inclusive et de week-end et vacances tout inclus à tarifs pas chers et en promotion | Mentions légales</p>
            </div>
        </footer>
    )
}
