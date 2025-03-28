import { type FC } from 'react';
import { ExternalLink, CornerDownRight, Building2 } from 'lucide-react';
import { Database } from '../types/supabase';
import ShareButton from '../share/components/ShareButton';

type POI = Database['public']['Tables']['points_of_interest']['Row'];

interface POIPopupProps {
  poi: POI;
  iconUrl: string;
}

const POIPopup: FC<POIPopupProps> = ({ poi, iconUrl }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${poi.latitude},${poi.longitude}`;
  
  return (
    <div className="w-[220px] sm:w-[260px] overflow-visible">
      {poi.image_url && (
        <img
          src={poi.image_url}
          alt={poi.name}
          className="w-full h-50 object-contain"
        />
      )}
      <div className="p-2 sm:p-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <img 
              src={iconUrl}
              alt="Category Icon"
              className="w-5 h-5 object-contain"
            />
            <span className="text-xs font-medium text-blue-600">
              {poi.name}
            </span>
          </div>
          <ShareButton poi={poi} />
        </div>
        <h3 className="font-bold text-base sm:text-lg mb-1.5 text-gray-900">
          {poi.name}
        </h3>
        {poi.image_url && (
          <div className="flex items-center gap-1.5 mb-2">
            <Building2 size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-500">
              {poi.project}
            </span>
          </div>
        )}
        <p className="text-xs sm:text-sm text-gray-600 mb-3">
          {poi.description}
        </p>

        <div className="flex flex-col gap-2">
          {poi.url && (
            <a
              href={poi.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-blue-600 
                hover:text-blue-800 transition-colors bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100"
            >
              <ExternalLink size={14} />
              Sabe mais              
            </a>
          )}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-green-600 
              hover:text-green-800 transition-colors bg-green-50 px-3 py-2 rounded-lg hover:bg-green-100"
          >
            <CornerDownRight size={14} />
            Obter direções            
          </a>
          {poi.has_moeda_id && (
            <a
              href="https://exploreid.pt/moeda-id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs font-medium text-amber-600 
                hover:text-amber-800 transition-colors bg-amber-50 px-3 py-2 rounded-lg hover:bg-amber-100 
                ring-1 ring-amber-200"
            >
              <img src="/icons/ID.png" alt="Moeda ID" className="w-6 h-6" />
              Obter e utilizar a Moeda ID - 10% de desconto
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default POIPopup;