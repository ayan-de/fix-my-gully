import Image from "next/image";

type CardProps = {
  imageUrl: string;
  description: string;
  likes: number;
  comments: number;
};

const Cards = ({ imageUrl, description, likes, comments }: CardProps) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={imageUrl}
        alt="Card Image"
        width={400} // ✅ Add width
        height={200} // ✅ Add height
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <p className="text-gray-700 text-sm mb-4">{description}</p>

        <div className="flex justify-between text-gray-600 text-sm">
          <span>❤️ {likes}</span>
          <span>💬 {comments}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
