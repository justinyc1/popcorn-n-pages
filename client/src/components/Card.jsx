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
                {imageUrl && <img src={imageUrl} alt={`${name}`} className="w-[43%] xs:w-[10rem] xs:h-[15rem] bg-gray-100 object-cover rounded" />}
                <div>
                    <h3 className="text-[clamp(0.75rem,0.75rem+1vw,1.25rem)] font-semibold">{name}</h3>
                    {type && <p className="text-[clamp(0.4rem,0.4rem+1vw,0.75rem)] py-[0.25rem]">{titleCased === "Show" ? "TV " : ""}{titleCased}</p>}
                </div>
            </div>
        </div>
    );
};

export default Card;
