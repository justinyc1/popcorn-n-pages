/* eslint-disable react/prop-types */
// import { useState } from "react";

const Card = ({ name, type, imageUrl }) => {
    // const [image, setImage] = useState(imageUrl);
    // const backupImage = `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;

    const titleCased = type
        ? type
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : '';

    return (
        <div className="text-white bg-raisinblack p-6 shadow-md rounded-lg">
            <div className="flex gap-[1rem]">
                {imageUrl && <img src={imageUrl} alt={`${name}`} className="w-[10rem] h-[15rem] bg-gray-100 object-cover rounded" />}
                <div>
                    <h3 className="text-xl font-semibold">{name}</h3>
                    {type && <p className="text-[0.8rem] py-[0.25rem]">{titleCased === "Show" ? "TV " : ""}{titleCased}</p>}
                </div>
            </div>
        </div>
    );
};

export default Card;
