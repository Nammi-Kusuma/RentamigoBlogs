import React, { useState } from 'react';
import { Search, Filter, MapPin, Bed, Bath, Home, DollarSign, Star } from 'lucide-react';

// Mock rental data
const mockRentals = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Stylish 1-bedroom apartment in the heart of downtown with amazing city views and modern amenities.',
    location: 'San Francisco, CA',
    price: 2800,
    bedrooms: 1,
    bathrooms: 1,
    size: 750,
    amenities: ['Gym', 'Pool', 'Parking', 'Dishwasher', 'Air Conditioning'],
    rating: 4.8,
    reviews: 24,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '2',
    title: 'Cozy Studio Near Park',
    description: 'Bright and cozy studio apartment located near the park. Perfect for singles or couples looking for a peaceful retreat.',
    location: 'Brooklyn, NY',
    price: 1950,
    bedrooms: 0,
    bathrooms: 1,
    size: 500,
    amenities: ['Laundry', 'Dishwasher', 'Air Conditioning', 'Pets Allowed'],
    rating: 4.5,
    reviews: 18,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '3',
    title: 'Spacious Family Home',
    description: 'Beautiful 3-bedroom house with a large backyard, perfect for families. Located in a quiet neighborhood with great schools nearby.',
    location: 'Austin, TX',
    price: 3200,
    bedrooms: 3,
    bathrooms: 2.5,
    size: 1800,
    amenities: ['Backyard', 'Garage', 'Fireplace', 'Washer/Dryer', 'Central Heating'],
    rating: 4.9,
    reviews: 32,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '4',
    title: 'Luxury Waterfront Condo',
    description: 'Stunning 2-bedroom condo with panoramic water views. High-end finishes, floor-to-ceiling windows, and resort-style amenities.',
    location: 'Miami, FL',
    price: 4500,
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    amenities: ['Pool', 'Gym', 'Doorman', 'Balcony', 'Valet Parking', 'Spa'],
    rating: 4.7,
    reviews: 41,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '5',
    title: 'Charming Victorian Home',
    description: 'Historic Victorian home with original details and modern updates. Features 4 bedrooms, a renovated kitchen, and a lovely garden.',
    location: 'Boston, MA',
    price: 3800,
    bedrooms: 4,
    bathrooms: 2,
    size: 2200,
    amenities: ['Garden', 'Fireplace', 'Hardwood Floors', 'Washer/Dryer', 'Basement'],
    rating: 4.6,
    reviews: 29,
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '6',
    title: 'Urban Loft Apartment',
    description: 'Industrial-style loft with high ceilings, exposed brick, and large windows. Open floor plan with modern kitchen and updated bathroom.',
    location: 'Chicago, IL',
    price: 2400,
    bedrooms: 1,
    bathrooms: 1,
    size: 950,
    amenities: ['Elevator', 'Rooftop Deck', 'In-unit Laundry', 'Bike Storage', 'Dishwasher'],
    rating: 4.4,
    reviews: 22,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

const RentalsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter rentals based on search and filters
  const filteredRentals = mockRentals.filter(rental => {
    // Search query filter
    const matchesSearch = 
      rental.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Price range filter
    const matchesPrice = rental.price >= priceRange[0] && rental.price <= priceRange[1];
    
    // Bedrooms filter
    const matchesBedrooms = bedrooms === null || rental.bedrooms === bedrooms;
    
    return matchesSearch && matchesPrice && matchesBedrooms;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality is handled by the filter above
    console.log('Searching for:', searchQuery);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

  const handleBedroomFilter = (beds: number | null) => {
    setBedrooms(beds);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search and Filter Section */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                placeholder="Search by location, property type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Search
            </button>
          </form>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="flex items-center space-x-2">
                    <div className="relative rounded-md shadow-sm flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                        placeholder="Min"
                      />
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="relative rounded-md shadow-sm flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        min={priceRange[0]}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Bedrooms Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Bedrooms</h3>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleBedroomFilter(null)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        bedrooms === null
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Any
                    </button>
                    {[0, 1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleBedroomFilter(num)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          bedrooms === num
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {num === 0 ? 'Studio' : num === 4 ? '4+' : num}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Reset Filters */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setPriceRange([0, 5000]);
                      setBedrooms(null);
                    }}
                    className="text-sm text-gray-600 hover:text-black underline"
                  >
                    Reset all filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Rentals Listing */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {filteredRentals.length} {filteredRentals.length === 1 ? 'Rental' : 'Rentals'} Available
            </h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Rentals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRentals.map((rental) => (
              <div key={rental.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={rental.imageUrl} 
                    alt={rental.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium">
                    ${rental.price}/mo
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{rental.location}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 line-clamp-1">{rental.title}</h3>
                  
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{rental.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{rental.bedrooms === 0 ? 'Studio' : `${rental.bedrooms} ${rental.bedrooms === 1 ? 'Bed' : 'Beds'}`}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{rental.bathrooms} {rental.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <Home className="h-4 w-4 mr-1" />
                      <span>{rental.size} sq ft</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{rental.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({rental.reviews} reviews)</span>
                    </div>
                    
                    <button className="text-sm font-medium text-black hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredRentals.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No rentals found</h3>
              <p className="text-gray-500">Try adjusting your search filters or try a different location.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RentalsPage;