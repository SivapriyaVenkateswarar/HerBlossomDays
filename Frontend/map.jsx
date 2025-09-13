import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icon components
const Flower2 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5c0 .5 0 3.5-2 5l-2.5-1.5L9.5 17c-2-1.5-2-4.5-2-5a4.5 4.5 0 1 1 4.5-4.5z"/>
    <path d="M8.5 12.5a4.5 4.5 0 1 0 7 0"/>
    <path d="M12 7.5V9"/>
  </svg>
);

const MapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const Phone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const Clock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const Star = ({ filled = false }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const Stethoscope = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4v10a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4V4"/>
    <path d="M8 4V2a2 2 0 0 1 4 0v2"/>
    <circle cx="18" cy="10" r="2"/>
    <path d="M20 10c0 1.5-1 3-3 3h-1a4 4 0 0 1-4-4"/>
  </svg>
);

const Store = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/>
    <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/>
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const Search = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

const Filter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
  </svg>
);

const NearbyPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("doctors");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [userLocation, setUserLocation] = useState("Coimbatore, Tamil Nadu");

  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      speciality: "Gynecologist",
      hospital: "Apollo Hospital",
      distance: "1.2 km",
      rating: 4.8,
      experience: "12 years",
      phone: "+91 98765 43210",
      address: "123 Race Course Road, Coimbatore",
      hours: "9:00 AM - 6:00 PM",
      available: true,
      consultation: "₹800"
    },
    {
      id: 2,
      name: "Dr. Lakshmi Menon",
      speciality: "Women's Health Specialist",
      hospital: "PSG Hospitals",
      distance: "2.1 km",
      rating: 4.6,
      experience: "8 years",
      phone: "+91 98765 43211",
      address: "456 Avinashi Road, Coimbatore",
      hours: "10:00 AM - 7:00 PM",
      available: true,
      consultation: "₹600"
    },
    {
      id: 3,
      name: "Dr. Meera Rajesh",
      speciality: "Gynecologist",
      hospital: "KMCH Hospital",
      distance: "3.5 km",
      rating: 4.9,
      experience: "15 years",
      phone: "+91 98765 43212",
      address: "789 Trichy Road, Coimbatore",
      hours: "8:00 AM - 5:00 PM",
      available: false,
      consultation: "₹1000"
    },
    {
      id: 4,
      name: "Dr. Anjali Krishna",
      speciality: "Reproductive Health",
      hospital: "Ganga Hospital",
      distance: "4.2 km",
      rating: 4.7,
      experience: "10 years",
      phone: "+91 98765 43213",
      address: "321 Mettupalayam Road, Coimbatore",
      hours: "9:30 AM - 6:30 PM",
      available: true,
      consultation: "₹750"
    }
  ];

  // Mock data for stores
  const stores = [
    {
      id: 1,
      name: "MedPlus Pharmacy",
      type: "Pharmacy Chain",
      distance: "0.8 km",
      rating: 4.5,
      phone: "+91 98765 54321",
      address: "Cross Cut Road, Coimbatore",
      hours: "8:00 AM - 10:00 PM",
      products: ["Sanitary Pads", "Tampons", "Menstrual Cups"],
      priceRange: "₹50 - ₹300"
    },
    {
      id: 2,
      name: "Apollo Pharmacy",
      type: "Medical Store",
      distance: "1.1 km",
      rating: 4.6,
      phone: "+91 98765 54322",
      address: "DB Road, RS Puram, Coimbatore",
      hours: "24 Hours",
      products: ["All Brands Available", "Organic Options"],
      priceRange: "₹40 - ₹500"
    },
    {
      id: 3,
      name: "Women's Care Store",
      type: "Specialty Store",
      distance: "1.9 km",
      rating: 4.8,
      phone: "+91 98765 54323",
      address: "Gandhipuram, Coimbatore",
      hours: "9:00 AM - 9:00 PM",
      products: ["Eco-friendly Pads", "Menstrual Cups", "Period Underwear"],
      priceRange: "₹80 - ₹800"
    },
    {
      id: 4,
      name: "Health & Hygiene Mart",
      type: "General Store",
      distance: "2.3 km",
      rating: 4.3,
      phone: "+91 98765 54324",
      address: "Peelamedu, Coimbatore",
      hours: "7:00 AM - 11:00 PM",
      products: ["Budget Options", "Premium Brands"],
      priceRange: "₹30 - ₹400"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} filled={true} />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" filled={false} />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} filled={false} />);
    }
    
    return stars;
  };

  const DoctorCard = ({ doctor }) => (
    <div style={{
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      borderRadius: "1rem",
      padding: "1.5rem",
      marginBottom: "1rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer"
    }}
    className="card-hover"
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "1rem"
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}>
              <Stethoscope />
            </div>
            <div>
              <h3 style={{
                color: "#be185d",
                fontWeight: "600",
                fontSize: "1.1rem",
                margin: 0
              }}>{doctor.name}</h3>
              <p style={{
                color: "#e11d48",
                fontSize: "0.9rem",
                margin: 0,
                opacity: 0.8
              }}>{doctor.speciality} • {doctor.experience}</p>
            </div>
          </div>
          
          <p style={{
            color: "#be185d",
            fontSize: "0.9rem",
            fontWeight: "500",
            margin: "0.5rem 0"
          }}>{doctor.hospital}</p>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem"
          }}>
            <MapPin />
            <span style={{ color: "#e11d48", fontSize: "0.9rem" }}>
              {doctor.distance} • {doctor.address}
            </span>
          </div>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              color: "#f59e0b"
            }}>
              {renderStars(doctor.rating)}
              <span style={{ color: "#be185d", fontSize: "0.9rem", marginLeft: "0.5rem" }}>
                {doctor.rating}
              </span>
            </div>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem"
            }}>
              <Clock />
              <span style={{ color: "#e11d48", fontSize: "0.9rem" }}>
                {doctor.hours}
              </span>
            </div>
          </div>
        </div>
        
        <div style={{
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }}>
          <div style={{
            background: doctor.available ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "white",
            padding: "0.3rem 0.8rem",
            borderRadius: "15px",
            fontSize: "0.8rem",
            fontWeight: "500"
          }}>
            {doctor.available ? "Available" : "Busy"}
          </div>
          
          <div style={{
            color: "#be185d",
            fontSize: "1rem",
            fontWeight: "600"
          }}>
            {doctor.consultation}
          </div>
        </div>
      </div>
      
      <div style={{
        display: "flex",
        gap: "0.5rem",
        marginTop: "1rem"
      }}>
        <button style={{
          flex: 1,
          background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
          color: "white",
          border: "none",
          padding: "0.7rem",
          borderRadius: "0.5rem",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem"
        }}
        className="button-hover"
        >
          <Phone />
          Call Now
        </button>
        
        <button style={{
          flex: 1,
          background: "rgba(255, 255, 255, 0.8)",
          color: "#be185d",
          border: "2px solid #f9a8d4",
          padding: "0.7rem",
          borderRadius: "0.5rem",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
        className="button-hover"
        >
          View Profile
        </button>
      </div>
    </div>
  );

  const StoreCard = ({ store }) => (
    <div style={{
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      borderRadius: "1rem",
      padding: "1.5rem",
      marginBottom: "1rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer"
    }}
    className="card-hover"
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "1rem"
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #fbb6ce, #f9a8d4)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}>
              <Store />
            </div>
            <div>
              <h3 style={{
                color: "#be185d",
                fontWeight: "600",
                fontSize: "1.1rem",
                margin: 0
              }}>{store.name}</h3>
              <p style={{
                color: "#e11d48",
                fontSize: "0.9rem",
                margin: 0,
                opacity: 0.8
              }}>{store.type}</p>
            </div>
          </div>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem"
          }}>
            <MapPin />
            <span style={{ color: "#e11d48", fontSize: "0.9rem" }}>
              {store.distance} • {store.address}
            </span>
          </div>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              color: "#f59e0b"
            }}>
              {renderStars(store.rating)}
              <span style={{ color: "#be185d", fontSize: "0.9rem", marginLeft: "0.5rem" }}>
                {store.rating}
              </span>
            </div>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem"
            }}>
              <Clock />
              <span style={{ color: "#e11d48", fontSize: "0.9rem" }}>
                {store.hours}
              </span>
            </div>
          </div>
          
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "0.5rem"
          }}>
            {store.products.map((product, index) => (
              <span key={index} style={{
                background: "rgba(249, 168, 212, 0.2)",
                color: "#be185d",
                padding: "0.2rem 0.6rem",
                borderRadius: "12px",
                fontSize: "0.8rem"
              }}>
                {product}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{
          textAlign: "right"
        }}>
          <div style={{
            color: "#be185d",
            fontSize: "1rem",
            fontWeight: "600"
          }}>
            {store.priceRange}
          </div>
        </div>
      </div>
      
      <div style={{
        display: "flex",
        gap: "0.5rem",
        marginTop: "1rem"
      }}>
        <button style={{
          flex: 1,
          background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
          color: "white",
          border: "none",
          padding: "0.7rem",
          borderRadius: "0.5rem",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem"
        }}
        className="button-hover"
        >
          <Phone />
          Call Store
        </button>
        
        <button style={{
          flex: 1,
          background: "rgba(255, 255, 255, 0.8)",
          color: "#be185d",
          border: "2px solid #f9a8d4",
          padding: "0.7rem",
          borderRadius: "0.5rem",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
        className="button-hover"
        >
          Get Directions
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0,
      background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fed7aa 100%)",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #fecaca",
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "1rem 0"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer"
          }} onClick={() => navigate("/")}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}>
              <Flower2 />
            </div>
            <span style={{
              color: "#be185d",
              fontSize: "0.875rem",
              fontWeight: "600"
            }}>HerBlossomDays</span>
          </div>
          
          <button 
            style={{
              background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
              color: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "25px",
              fontSize: "0.875rem",
              fontWeight: "500",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onClick={() => navigate("/CardsPage")}
            className="back-button"
          >
            ← Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem"
      }}>
        {/* Page Title */}
        <div style={{
          textAlign: "center",
          marginBottom: "2rem"
        }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "300",
            color: "#881337",
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #e11d48, #ec4899, #be185d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Find Nearby Support
          </h1>
          <p style={{
            color: "#be185d",
            fontSize: "1.1rem",
            opacity: 0.8
          }}>
            📍 Showing results near {userLocation}
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: "1rem",
          padding: "0.5rem",
          marginBottom: "2rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        }}>
          <button
            style={{
              flex: 1,
              padding: "0.8rem",
              border: "none",
              borderRadius: "0.7rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s ease",
              background: activeTab === "doctors" 
                ? "linear-gradient(135deg, #f9a8d4, #fbb6ce)" 
                : "transparent",
              color: activeTab === "doctors" ? "white" : "#be185d"
            }}
            onClick={() => setActiveTab("doctors")}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}>
              <Stethoscope />
              Doctors ({doctors.length})
            </div>
          </button>
          
          <button
            style={{
              flex: 1,
              padding: "0.8rem",
              border: "none",
              borderRadius: "0.7rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s ease",
              background: activeTab === "stores" 
                ? "linear-gradient(135deg, #f9a8d4, #fbb6ce)" 
                : "transparent",
              color: activeTab === "stores" ? "white" : "#be185d"
            }}
            onClick={() => setActiveTab("stores")}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}>
              <Store />
              Stores ({stores.length})
            </div>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap"
        }}>
          <div style={{
            flex: 1,
            minWidth: "300px",
            position: "relative"
          }}>
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 3rem",
                border: "none",
                borderRadius: "0.75rem",
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                fontSize: "1rem",
                color: "#be185d",
                outline: "none",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
              }}
            />
            <div style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#be185d",
              opacity: 0.6
            }}>
              <Search />
            </div>
          </div>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={{
              padding: "0.8rem 1rem",
              border: "none",
              borderRadius: "0.75rem",
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              fontSize: "1rem",
              color: "#be185d",
              cursor: "pointer",
              outline: "none",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              minWidth: "150px"
            }}
          >
            <option value="all">All Results</option>
            <option value="nearest">Nearest First</option>
            <option value="rating">Highest Rated</option>
            <option value="available">Available Now</option>
          </select>
        </div>

        {/* Results */}
        <div>
          {activeTab === "doctors" && doctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
          
          {activeTab === "stores" && stores.map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </main>

      {/* Styles */}
      <style>{`
        .card-hover:hover {
          background: rgba(255, 255, 255, 0.9) !important;
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        }

        .button-hover:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
        }

        .back-button:hover {
          background: linear-gradient(135deg, #e11d48, #ec4899) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
    </div>
  );
};

export default NearbyPage;
