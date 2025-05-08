/* eslint-disable react/prop-types */

const Card = ({ name, type, imageUrl }) => {
    const titleCased = type
        ? type
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : '';

    return (
        <div className="text-deepblack bg-white p-6 shadow-md rounded-lg">
            <div className="flex gap-[1rem]">
                {imageUrl && <img src={imageUrl} alt={`${name} poster`} className="w-[10rem] h-[15rem] object-cover rounded" />}
                <div>
                    <h3 className="text-xl font-semibold">{name}</h3>
                    {type && <p className="text-[0.8rem] py-[0.25rem]">{titleCased === "Show" ? "TV " : ""}{titleCased}</p>}
                </div>
            </div>
        </div>
    );
};

export default Card;
