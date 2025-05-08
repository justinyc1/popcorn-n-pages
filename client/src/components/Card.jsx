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
        <div className="text-deepblack bg-white p-6 pb-24 shadow-md rounded-lg">
            {imageUrl && <img src={imageUrl} alt={`${name} poster`} className="w-full h-48 object-cover rounded mb-4" />}
            <h3 className="text-xl font-semibold">{name}</h3>
            {type && <p>{titleCased === "Show" ? "TV " : ""}{titleCased}</p>}
        </div>
    );
};

export default Card;
