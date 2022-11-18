import { FaBookmark } from "react-icons/fa";
import { HomeIcon } from "./HomeIcon";

function PropertyCard({ property, handleBookmarkClick, isSavedProperty }) {
  return (
    <div className='border-2 bg-gray-50'>
      <div className='relative grid'>
        <div className='grid place-items-center bg-slate-300 aspect-video row-span-full col-span-full'>
          <HomeIcon className='w-2/12 fill-slate-50' />
        </div>
        {property?.photos?.[0] && (
          <img
            className='row-span-full col-span-full'
            src={`https://mr0.homeflow.co.uk/${property.photos[0]}`}
            alt={property?.display_address || ""}
          />
        )}

        <button
          className='absolute top-0 right-2'
          title='Click to bookmark this property'
          onClick={handleBookmarkClick}
        >
          <FaBookmark
            className={isSavedProperty ? "text-red-400" : "text-yellow-400"}
            size='40'
          />
        </button>

        <p className='absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50'>
          {property.price}
        </p>
      </div>

      <div className='px-3 py-2'>
        <p>{property.display_address}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
