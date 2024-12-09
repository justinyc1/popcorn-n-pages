const Card = ({ name, type, imageUrl }) => {
    const titleCased = type
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg">
            {imageUrl && <img src={imageUrl} alt={`${name} poster`} className="w-full h-48 object-cover rounded mb-4" />}
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-gray-600">{titleCased}</p>
        </div>
    );
};

export default Card;
