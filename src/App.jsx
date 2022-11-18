import { useState, useEffect } from "react";
import Header from "./Header";
import PropertyCard from "./PropertyCard";

function App() {
  const [properties, setProperties] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // use this state to keep track of the user's saved/bookmarked properties
  const [savedProperties, setSavedProperties] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchPropertyData = async () => {
      const response = await fetch("/property-data.json");
      const json = await response.json();

      setProperties(json.result.properties.elements || []);
      setIsLoading(false);
    };

    fetchPropertyData();
  }, []);

  const handleSearchPhraseChange = (value) => setSearchPhrase(value);

  const handlePropertySave = (propertyId) =>
    setSavedProperties((prevSavedProperties) => [
      ...prevSavedProperties,
      propertyId,
    ]);

  const handlePropertyRemove = (propertyIdToRemove) => {
    setSavedProperties((prevSavedProperties) => {
      return prevSavedProperties.filter(
        (propertyId) => propertyId !== propertyIdToRemove
      );
    });
  };

  const filteredProperties = properties?.filter((property) =>
    property.short_description.includes(searchPhrase)
  );

  return (
    <div className='container mx-auto my-5'>
      <Header handleSearchChange={handleSearchPhraseChange} />

      {!isLoading && (
        <div className='grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredProperties?.map((property) => {
            const propertyId = property.property_id;
            const isSavedProperty =
              savedProperties.find(
                (savedPropertyId) => savedPropertyId === propertyId
              ) > -1;
            const handleBookmarkClick = isSavedProperty
              ? () => handlePropertyRemove(propertyId)
              : () => handlePropertySave(propertyId);

            return (
              <PropertyCard
                key={propertyId}
                property={property}
                isSavedProperty={isSavedProperty}
                handleBookmarkClick={handleBookmarkClick}
              />
            );
          })}
          {!properties?.length && !searchPhrase && (
            <h3 className='col-span-full'>No available properties</h3>
          )}
          {!filteredProperties?.length && searchPhrase && (
            <h3 className='col-span-full'>
              No properties with keyword: {searchPhrase} in description.
            </h3>
          )}
        </div>
      )}
      {isLoading && <h3>Loading...</h3>}
    </div>
  );
}

export default App;
