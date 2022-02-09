import Image from 'next/image';
import Link from 'next/link';

type Props = {
  id: string;
  name: string;
  price: number;
  thumbnailUrl: string;
};

export default function Product({ id, name, price, thumbnailUrl }: Props) {
  return (
    <div className="flex flex-col items-start mx-10 mt-10 cursor-pointer lg:dark:hover:text-gray-300 lg:hover:text-gray-600 animate-appearing">
      <Link href={`/products/${id}`}>
        <a>
          <div className="bg-white shadow-2xl dark:shadow-dark mb-3 rounded-2xl lg:hover:bg-gray-400 transform duration-200 lg:hover:scale-105">
            <Image src={thumbnailUrl} width={220} height={200} alt={name} layout="fixed" objectFit="cover" priority />
          </div>
          <div>
            <p>{name}</p>
            <p>{price} $</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
