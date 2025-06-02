import React, { useState, useRef, useEffect } from 'react';
import pathData from './data/path.json';
import russianInstitutionsData from './data/russian_institutions.json';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import 'd3-transition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLandmarkFlag, 
  faSchoolFlag,   
  faBuildingFlag, 
  faSchool,       
  faBriefcase,    
  faMasksTheater, 
} from '@fortawesome/free-solid-svg-icons';


const TurkeyMap = () => {
  const [provincePaths, setProvincePaths] = useState([]);  
  const [russianCenters, setRussianCenters] = useState([]);
  const [hoverCity, setHoverCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [zoomedCity, setZoomedCity] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(1);  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');
  const [suggestions, setSuggestions] = useState([]);
  const [allCategories, setAllCategories] = useState(['Hepsi']);
  const [plakaToCity, setPlakaToCity] = useState({});
  const [cityToPlaka, setCityToPlaka] = useState({});  
  const [filteredInstitutions, setFilteredInstitutions] = useState({});
  
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const zoomBehaviorRef = useRef(null);
  const searchInputRef = useRef(null);

  const getFallbackIcon = (type) => {
    switch(type) {
      case 'Rusevi':
        return faLandmarkFlag;
      case 'Büyükelçilik':
        return faLandmarkFlag;
      case 'Konsolosluk':
        return faBuildingFlag;
      case 'Ticaret':
      case 'Enerji':
        return faBriefcase;
      case 'Kültür':
        return faMasksTheater;
      case 'Diğer':
        return faSchoolFlag;
      case 'Üniversite':
        return faSchool;
      default:
        return faSchool;
    }
  };

  const normalizeCode = (code) => {
    if (!code) return '';
    
    if (code.startsWith('TR-')) {
      return code.substring(3);
    } else if (code.startsWith('TR')) {
      return code.substring(2);
    }
    
    return code;
  };

  useEffect(() => {
    setProvincePaths(pathData);
    
    const plakaMapping = {};
    const cityMapping = {};
    
    pathData.forEach(province => {
      if (province.plaka && province.ilismi) {
        const normalizedPlaka = normalizeCode(province.plaka);
        
        plakaMapping[normalizedPlaka] = province.ilismi;
        plakaMapping[`TR${normalizedPlaka}`] = province.ilismi;
        plakaMapping[`TR-${normalizedPlaka}`] = province.ilismi;
        
        cityMapping[province.ilismi] = normalizedPlaka;
      }
    });
    
    setPlakaToCity(plakaMapping);
    setCityToPlaka(cityMapping);
    
    const categories = new Set(['Hepsi']);
    Object.keys(russianInstitutionsData).forEach(cityCodeKey => {
      if (russianInstitutionsData[cityCodeKey] && Array.isArray(russianInstitutionsData[cityCodeKey])) {
        russianInstitutionsData[cityCodeKey].forEach(institution => {
          if (institution.type) {
            categories.add(institution.type);
          }
        });
      }
    });
    
    setAllCategories(Array.from(categories));
  }, []);

  useEffect(() => {
    if (Object.keys(plakaToCity).length > 0) {
      filterByCategory('Hepsi');
    }
  }, [plakaToCity]);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    
    const institutionsByPlaka = {};
    
    Object.keys(russianInstitutionsData).forEach(plakaKey => {
      const normalizedPlakaFromData = normalizeCode(plakaKey); 
      const cityName = plakaToCity[plakaKey] || plakaToCity[normalizedPlakaFromData] || plakaToCity[`TR-${normalizedPlakaFromData}`] || plakaToCity[`TR${normalizedPlakaFromData}`];
      
      if (!cityName) {
        return;
      }
      
      const institutions = russianInstitutionsData[plakaKey];
      
      if (!institutions || !Array.isArray(institutions)) {
        return;
      }
      
      const filteredList = category === 'Hepsi' 
        ? institutions 
        : institutions.filter(inst => inst.type === category);
      
      if (filteredList.length > 0) {
        const mapPlakaCode = cityToPlaka[cityName] || normalizedPlakaFromData;
        institutionsByPlaka[mapPlakaCode] = filteredList; 
      }
    });
    
    setFilteredInstitutions(institutionsByPlaka);
  };

  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    
    const svg = select(svgRef.current);
    const g = select(gRef.current);

    const zoomHandler = zoom()
      .scaleExtent([0.8, 5]) 
      .translateExtent([[0, 0], [800, 350]]) 
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
        setCurrentZoomLevel(event.transform.k);
      })
      .filter(event => {
        if (event.type && event.type.startsWith('touch') && event.touches && event.touches.length > 1) {
          return true; // Allow pinch-zoom
        }
        if (!event.type) return true; // Allow programmatic zoom
        return !event.type.includes('wheel') && 
               !event.type.includes('mouse') && // blocks mousedown/mousemove for panning
               !event.type.includes('dblclick');
      });

    svg.call(zoomHandler);
    zoomBehaviorRef.current = zoomHandler;
    
    svg.style("cursor", "grab"); 
    
    svg.transition()
      .duration(750)
      .call(zoomHandler.transform, zoomIdentity);
      
    return () => {
      svg.on('.zoom', null);
    };
  }, []);

  const handleCityClick = (cityID) => {
    if (zoomedCity && zoomedCity !== cityID) {
      return;
    }
    
    if (zoomedCity === cityID) {
      resetMap();
    } else {
      setSelectedCity(cityID);
      setZoomedCity(cityID);
      setShowSideMenu(true); 
      
      const cityPath = document.getElementById(cityID);
      if (cityPath && zoomBehaviorRef.current) {
        const bbox = cityPath.getBBox();
        const svg = select(svgRef.current);
        
        const svgWidth = 800; 
        const svgHeight = 350;
        
        const targetScale = 2; 
        
        const targetX = svgWidth / 2 - (bbox.x + bbox.width / 2) * targetScale;
        const targetY = svgHeight / 2 - (bbox.y + bbox.height / 2) * targetScale;
        
        const targetTransform = zoomIdentity.translate(targetX, targetY).scale(targetScale);
        
        svg.transition()
          .duration(1000) 
          .call(zoomBehaviorRef.current.transform, targetTransform)
          .on('end', () => {
            setCurrentZoomLevel(targetScale);
          });
      }
    }
  };

  const resetMap = () => {
    setZoomedCity(null);
    setSelectedCity(null); 
    setSelectedInstitution(null);
    setShowSideMenu(false);
    setHoverCity(null);

    if (zoomBehaviorRef.current) {
      const svg = select(svgRef.current);
      svg.transition()
        .duration(750)
        .call(zoomBehaviorRef.current.transform, zoomIdentity)
        .on('end', () => {
          setCurrentZoomLevel(1); 
        });
    }
  };

  const pathStyles = (cityID) => {
    const isSelected = selectedCity === cityID;
    const isHovered = hoverCity === cityID;
    const isZoomedAndNotSelected = zoomedCity && zoomedCity !== cityID; 
    
    return {
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      transform: isHovered && !zoomedCity ? 'scale(1.008)' : 'scale(1)', 
      fill: isSelected ? '#0032A0' 
            : isHovered && !zoomedCity ? '#14b8a6' // Original hover color (Red)
            : '#a0aec0', 
      stroke: '#4a5568', 
      strokeWidth: 0.5,
      opacity: isZoomedAndNotSelected ? 0.3 : 1, 
    };
  };

  const getMarkerColor = (type) => {
    switch(type) {
      case 'Rusevi': return '#DA291C'; 
      case 'Büyükelçilik': return '#DA291C'; 
      case 'Konsolosluk': return '#DA291C'; 
      case 'Ticaret': return '#0032A0'; 
      case 'Enerji': return '#0032A0'; 
      case 'Kültür': return '#0032A0'; 
      case 'Üniversite': return '#5C9E31'; 
      case 'Diğer': return '#525252'; 
      default: return '#525252'; 
    }
  };

  const getMarkerSize = () => {
    return currentZoomLevel > 2 ? "8px" : "6px";
  };

  const getCenterCount = (cityID) => {
    if (!cityID || !filteredInstitutions[cityID]) {
      return 0;
    }
    return filteredInstitutions[cityID].length;
  };

  const hasRussianCenters = (cityID) => {
    return getCenterCount(cityID) > 0;
  };

  const getInstitutionsList = () => {
    if (!zoomedCity) return [];
    return filteredInstitutions[zoomedCity] || [];
  };

  const handleInstitutionClick = (e, institution) => {
    if (e) e.stopPropagation(); 

    setSelectedInstitution(institution);
    setShowSideMenu(true); 
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term.trim()) {
      setSuggestions([]);
      return;
    }
    
    const searchTermLower = term.toLowerCase();
    
    const allInstitutions = [];
    Object.keys(russianInstitutionsData).forEach(plakaKey => {
      const normalizedPlakaFromData = normalizeCode(plakaKey);
      const cityName = plakaToCity[plakaKey] || plakaToCity[normalizedPlakaFromData];
      
      if (!cityName) return;
      
      const mapPlakaCode = cityToPlaka[cityName] || normalizedPlakaFromData;

      if (russianInstitutionsData[plakaKey] && Array.isArray(russianInstitutionsData[plakaKey])) {
        russianInstitutionsData[plakaKey].forEach(institution => {
          allInstitutions.push({
            ...institution,
            cityName,
            plaka: mapPlakaCode 
          });
        });
      }
    });
    
    const matches = allInstitutions.filter(institution => {
      if (selectedCategory !== 'Hepsi' && institution.type !== selectedCategory) {
        return false;
      }
      
      return (
        institution.name?.toLowerCase().includes(searchTermLower) ||
        (institution.description && institution.description.toLowerCase().includes(searchTermLower)) ||
        (institution.cityName && institution.cityName.toLowerCase().includes(searchTermLower)) ||
        (institution.address && institution.address.toLowerCase().includes(searchTermLower))
      );
    });
    
    setSuggestions(matches.slice(0, 5)); 
  };

  const handleMapClick = (e) => {
    if (zoomedCity) {
      const isInsideG = e.target.closest('g#map-interactive-area') === gRef.current; 
      
      if (isInsideG && showSideMenu && selectedInstitution) {
        if (e.target.tagName === 'path' || e.target.tagName === 'circle' || e.target.tagName === 'text') {
            return; 
        }
        setSelectedInstitution(null); 
      }
      return; 
    }
    setSelectedInstitution(null);
  };

  const handleCloseSideMenu = (e) => {
    e.stopPropagation();
    resetMap(); 
  };

  const handleSuggestionClick = (institution) => {
    setSearchTerm('');
    setSuggestions([]);

    const selectInstitutionAfterZoom = () => {
        setTimeout(() => {
            const instInList = (filteredInstitutions[institution.plaka] || []).find(i => i.name === institution.name && i.address === institution.address);
            setSelectedInstitution(instInList || institution);
        }, 1000); 
    };

    if (zoomedCity && zoomedCity !== institution.plaka) {
        resetMap();
        setTimeout(() => {
            handleCityClick(institution.plaka);
            selectInstitutionAfterZoom();
        }, 750); 
    } else if (!zoomedCity) {
        handleCityClick(institution.plaka);
        selectInstitutionAfterZoom();
    } else { 
        const instInList = (filteredInstitutions[institution.plaka] || []).find(i => i.name === institution.name && i.address === institution.address);
        setSelectedInstitution(instInList || institution);
    }
  };


  const isDataEmpty = !provincePaths || provincePaths.length === 0 || 
                      !provincePaths[0]?.d || provincePaths[0]?.d === "";

  useEffect(() => {
    if (svgRef.current && gRef.current) {
      const gElement = gRef.current;
      const cityPathClickHandler = (e) => {
        const pathElement = e.target.closest('.city-path');
        if (pathElement && gElement.contains(pathElement)) {
          if (!e.defaultPrevented) {
             handleCityClick(pathElement.id);
          }
        }
      };

      gElement.addEventListener('click', cityPathClickHandler);
      
      return () => {
        gElement.removeEventListener('click', cityPathClickHandler);
      };
    }
  }, [zoomedCity, provincePaths, handleCityClick]); 

  useEffect(() => {
    const gElement = gRef.current;

    if (gElement) {
        const numberElementClickHandler = (e) => {
            const targetCircle = e.target.closest('circle[data-city-id]');
            const targetText = e.target.closest('text[data-city-id-text]');
            let cityId = null;

            if (targetCircle) {
                cityId = targetCircle.getAttribute('data-city-id');
            } else if (targetText) {
                cityId = targetText.getAttribute('data-city-id-text');
            }

            if (cityId) {
                e.stopPropagation();
                handleCityClick(cityId);
            }
        };

        gElement.addEventListener('click', numberElementClickHandler);

        return () => {
            gElement.removeEventListener('click', numberElementClickHandler);
        };
    }
  }, [zoomedCity, provincePaths, filteredInstitutions, handleCityClick]);


  return (
    <div className='turkey-map-app-container container'>
      <h2 className="text-center mb-4 mt-5">Türkiye'deki Rus Kurumları Haritası</h2>

      <div className="search-filter-container mb-4">
        <div className="category-filter">
          <label htmlFor="category-select" className="mb-1 d-block">
            Kategori Seç:
          </label>
          <select 
            id="category-select"
            className="form-select"
            value={selectedCategory}
            onChange={(e) => filterByCategory(e.target.value)}
          >
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="search-box">
          <label htmlFor="search-input" className="mb-1 d-block">
            Kurum Ara:
          </label>
          <input
            ref={searchInputRef}
            id="search-input"
            type="text"
            className="form-control"
            placeholder="Kurum adı, şehir veya adres ara..."
            value={searchTerm}
            onChange={handleSearch}
          />
          
          {suggestions.length > 0 && (
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div
                  key={`suggestion-${index}`}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div 
                    className="suggestion-marker-color"
                    style={{ backgroundColor: getMarkerColor(suggestion.type)}} 
                  />
                  <div>
                    <div className="suggestion-name">{suggestion.name}</div>
                    <div className="suggestion-details">
                      {suggestion.cityName} - {suggestion.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {zoomedCity && (
        <button 
          className="btn btn-sm mb-3 reset-map-button"
          onClick={resetMap}
        >
          <span style={{ marginRight: "5px" }}>&#8592;</span> Türkiye Haritasına Dön
        </button>
      )}

      {isDataEmpty && (
        <div className="alert alert-warning">
          <strong>Uyarı:</strong> path.json dosyası ya yüklenemedi ya da boş veri içeriyor. 
          Lütfen dosyanın doğru formatta olduğunu kontrol edin.
        </div>
      )}
      
      <div className='main-layout-wrapper'>
        {showSideMenu && zoomedCity && (
          <div className='side-menu'>
            <button 
              className="btn btn-sm side-menu-close-button" 
              onClick={handleCloseSideMenu}
            >
              <span>&times;</span>
            </button>
            
            {selectedInstitution ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="side-menu-title-selected">Kurum Bilgileri</h4>
                </div>
                
                <div className="text-center mb-4">
                  {selectedInstitution.image && selectedInstitution.image !== "" ? (
                    <div className="institution-image-wrapper">
                      <img
                        src={selectedInstitution.image}
                        alt={selectedInstitution.name}
                        className="institution-image"
                        onError={(e) => {
                          e.target.style.display = 'none'; 
                          const fallbackDiv = e.target.closest('div').nextElementSibling; 
                          if (fallbackDiv) {
                              fallbackDiv.style.display = 'flex'; 
                          }
                          e.target.closest('div').style.border = 'none'; 
                          e.target.closest('div').style.display = 'none'; 
                        }}
                      />
                    </div>
                  ) : null}
                  
                  <div
                    className="institution-fallback-icon-wrapper"
                    style={{
                      backgroundColor: getMarkerColor(selectedInstitution.type),
                      display: (!selectedInstitution.image || selectedInstitution.image === "") ? 'flex' : 'none',
                    }}
                  >
                    <FontAwesomeIcon icon={getFallbackIcon(selectedInstitution.type)} size="2x" />
                  </div>
                  <h5 className="institution-name-selected">{selectedInstitution.name}</h5>
                  <div 
                    className="institution-type-badge-selected"
                    style={{ backgroundColor: getMarkerColor(selectedInstitution.type)}}
                  >
                    {selectedInstitution.type}
                  </div>
                </div>
                
                <div className="info-section mb-3">
                  <h6 className="info-section-title">Kurum Bilgileri</h6>
                  <p className="mb-1">
                    <strong>Şehir:</strong> {selectedInstitution.cityName || plakaToCity[zoomedCity] || ''}
                  </p>
                  <p className="mb-3">
                    <strong>Adres:</strong> {selectedInstitution.address}
                  </p>

                  {selectedInstitution.description && (
                    <div className="mb-3">
                      <h6 className="info-section-title">Açıklama</h6>
                      <p className="institution-description">{selectedInstitution.description}</p>
                    </div>
                  )}
                  
                  {selectedInstitution.website && selectedInstitution.website !== "_" && (
                    <div className="mb-3 text-center">
                      <a 
                        href={selectedInstitution.website.startsWith('http') ? selectedInstitution.website : `https://${selectedInstitution.website}`} 
                        className="btn btn-sm mt-2 institution-website-button" 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-solid fa-globe me-2"></i>
                        Websitesini Ziyaret Et
                      </a>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <button 
                      className="btn btn-sm mt-4 back-to-list-button" 
                      onClick={() => setSelectedInstitution(null)}
                    >
                      &larr; Kurum Listesine Dön
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="side-menu-title-list">
                    {plakaToCity[zoomedCity] || 'Şehir'} Kurumları
                  </h4>
                  <span className="badge institution-count-badge">
                    {getInstitutionsList().length} tane kurum mevcut
                  </span>
                </div>

                <div className="institution-filter mb-3">
                  <label htmlFor="institution-type-filter" className="mb-1 d-block">
                    Kurum Tipine Göre Filtrele:
                  </label>
                  <select 
                    id="institution-type-filter"
                    className="form-select form-select-sm"
                    value={selectedCategory}
                    onChange={(e) => filterByCategory(e.target.value)}
                  >
                    {allCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="institutions-list">
                  {getInstitutionsList().map((institution, index) => (
                    <div 
                      key={`institution-${index}`}
                      className="institution-item"
                      onClick={() => handleInstitutionClick(null, {
                        ...institution,
                        cityName: plakaToCity[zoomedCity]
                      })}
                    >
                      <div 
                        className="institution-item-marker"
                        style={{ backgroundColor: getMarkerColor(institution.type)}}
                      >
                        {index + 1}
                      </div>
                      <div className="institution-item-info">
                        <div className="institution-item-name">{institution.name}</div>
                        <div className="institution-item-type">
                          {institution.type}
                        </div>
                      </div>
                      <div>
                        <i className="fas fa-chevron-right institution-item-chevron"></i>
                      </div>
                    </div>
                  ))}
                  
                  {getInstitutionsList().length === 0 && (
                    <div className="no-institutions-found">
                      <div className="no-institutions-icon">
                        &#x1F50D;
                      </div>
                      <p className="no-institutions-text-primary">Bu filtreyle kurum bulunamadı</p>
                      <p className="no-institutions-text-secondary">Farklı bir kurum tipi seçiniz</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        <div 
          className='map-container'
          style={{width: showSideMenu && zoomedCity ? '70%' : '100%'}}
          onClick={handleMapClick}
        >
          <div className="title-box">
            <h3 className="title-box-heading">
              Türkiye'deki Rus Kurumları
            </h3>
            <p className="title-box-subheading">
              {zoomedCity ? plakaToCity[zoomedCity] : 'Görüntülemek için şehirlere tıklayın'}
            </p>
          </div>

          <div className="map-legend">
            <h3 className="legend-title">Kurum Tipleri</h3>
            
            <div className="legend-item">
              <span className="legend-color city-legend"></span>
              <span className="legend-label">Şehir (Kurum Sayısı)</span>
            </div>
            
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#DA291C'}}></span>
              <span className="legend-label">Konsolosluk/Büyükelçilik/Rusevi</span>
            </div>
            
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#0032A0'}}></span>
              <span className="legend-label">Kültür/Ticaret Kurumları</span>
            </div>
            
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#5C9E31'}}></span>
              <span className="legend-label">Üniversite/Eğitim</span>
            </div>
          </div>

          <svg ref={svgRef} viewBox="0 0 800 350" className="turkey-svg mt-4">
            <rect x="0" y="0" width="800" height="350" fill="transparent" className="zoom-capture-rect" />
            <g ref={gRef} id="map-interactive-area">
              <rect x="0" y="0" width="800" height="350" className="map-background" fill="#ffffff" />
              
              {provincePaths.map((province, index) => {
                if (!province.d || province.d === "") return null;
                
                const cityCode = normalizeCode(province.plaka);
                const centerCount = getCenterCount(cityCode);
                const cityHasRussianCenters = hasRussianCenters(cityCode);
                
                return (
                  <g key={cityCode || `province-${index}`} className="city-group">
                    <path
                      id={cityCode}
                      title={province.ilismi}
                      className="city-path"
                      d={province.d}
                      style={pathStyles(cityCode)}
                      onMouseEnter={() => setHoverCity(cityCode)}
                      onMouseLeave={() => setHoverCity(null)}
                    />
                    
                    {cityHasRussianCenters && !zoomedCity && (
                      (() => {
                        const cityElement = document.getElementById(cityCode);
                        if (!cityElement) return null;
                        
                        let cx = 300, cy = 150;
                        
                        try {
                          const bbox = cityElement.getBBox();
                          cx = bbox.x + bbox.width / 2;
                          cy = bbox.y + bbox.height / 2;
                        } catch (e) {
                          // console.error(`Error getting bbox for ${cityCode}:`, e);
                        }
                        
                        let circleOffsetX = 0;
                        let circleOffsetY = 0;
                        let textOffsetX = 0;
                        let textOffsetY = 4; 
                        
                        // City-specific offsets from the user's provided code
                        if (cityCode === "35") { // Izmir
                          circleOffsetX = 3;
                          circleOffsetY = 20; 
                          textOffsetX = 3; 
                          textOffsetY = 20 + 3; 
                        } else if (cityCode === "06") { // Ankara
                          circleOffsetX = 5; circleOffsetY = -5; 
                          textOffsetX = 5; textOffsetY = -1; 
                        } else if (cityCode === "38") { // Kayseri
                            circleOffsetX = -5; circleOffsetY = -8;
                            textOffsetX = -5; textOffsetY = -4;
                        } else if (cityCode === "42") { // Konya
                            circleOffsetX = -17; circleOffsetY = -4; 
                            textOffsetX = -17; textOffsetY = -1;
                        } else if (cityCode === "04") { // Agri
                            circleOffsetX = -15; circleOffsetY = -10;
                            textOffsetX = -15; textOffsetY = -6;
                        } else if (cityCode === "07") { // Antalya
                            circleOffsetY = -15; 
                            textOffsetY = -11;
                        } else if (cityCode === "17") { // Canakkale
                            circleOffsetX = 8; circleOffsetY = 4; 
                            textOffsetX = 8; textOffsetY = 8;
                        } else if (cityCode === "55") { // Samsun
                            circleOffsetX = -4; circleOffsetY = 4; 
                            textOffsetX = -4; textOffsetY = 7;
                        } else if (cityCode === "36") { // Kars
                            circleOffsetX = 6; circleOffsetY = 4; 
                            textOffsetX = 6; textOffsetY = 7;
                        } else if (cityCode === "22") { // Edirne
                            circleOffsetX = 4; circleOffsetY = 2; 
                            textOffsetX = 4; textOffsetY = 6;
                        }
                        
                        return (
                          <g className="city-marker-group" data-city-id-group={cityCode} style={{cursor: 'pointer'}}>
                            <circle
                              cx={cx + circleOffsetX}
                              cy={cy + circleOffsetY}
                              r="10"
                              className="city-center-count-circle"
                              data-city-id={cityCode} 
                            />
                            <text
                              x={cx + textOffsetX}
                              y={cy + textOffsetY}
                              className="city-center-count-text"
                              data-city-id-text={cityCode}
                            >
                              {centerCount}
                            </text>
                          </g>
                        );
                      })()
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
          
          <div className="zoom-instructions">
            Yakınlaşmak için iki parmağınızla uzaklaştırın.
          </div>

          {!showSideMenu && zoomedCity && (
            <div className="info-title">
              <div className="info-title-cityname">
                {plakaToCity[zoomedCity]}
              </div>
              <p className="info-title-instruction">Bilgi için kurum noktalarına tıklayınız</p>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .turkey-map-app-container {
          font-family: 'Inter', sans-serif;
        }
        .search-filter-container {
          display: flex;
          flex-direction: row;
          gap: 15px;
          background-color: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        .category-filter {
          flex: 0 0 200px;
        }
        .category-filter label, .search-box label {
          font-size: 14px;
          color: #555;
          margin-bottom: 0.25rem;
        }
        .category-filter select, .search-box input {
          width: 100%;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #ddd;
          background-color: #f8f9fa;
          font-size: 14px;
        }
        .search-box {
          flex: 1 1 auto;
          position: relative;
        }
        .suggestions-list {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: white;
          border-radius: 0 0 6px 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 1000;
          max-height: 250px;
          overflow-y: auto;
          border: 1px solid #ddd;
          border-top: none;
        }
        .suggestion-item {
          padding: 10px 12px;
          cursor: pointer;
          border-bottom: 1px solid #eee;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
        }
        .suggestion-item:hover {
          background-color: #f8f9fa;
        }
        .suggestion-item:last-child {
          border-bottom: none;
        }
        .suggestion-marker-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .suggestion-name {
          font-weight: 500;
          font-size: 14px;
        }
        .suggestion-details {
          font-size: 12px;
          color: #666;
        }

        .reset-map-button {
          background-color: #0032A0;
          color: white;
          font-weight: 500;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: background-color 0.3s ease;
        }
        .reset-map-button:hover {
          background-color: #002780;
        }

        .main-layout-wrapper {
          display: flex;
          position: relative;
        }
        
        .side-menu {
          width: 30%;
          min-width: 280px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          padding: 20px;
          margin-right: 15px;
          height: 600px; 
          overflow-y: auto;
          transition: width 0.3s ease, margin-right 0.3s ease, opacity 0.3s ease, padding 0.3s ease, min-width 0.3s ease;
          position: relative;
          animation: slideIn 0.3s ease-out;
        }
        .side-menu-close-button {
          font-size: 14px;
          padding: 0;
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 10;
          background-color: #DA291C;
          color: white;
          border: none;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
          width: 28px;
          height: 28px;
          line-height: 28px;
        }
        .side-menu-close-button:hover {
          background-color: #c42419;
          color: #fff;
        }
        .side-menu-title-selected {
          color: #DA291C;
          margin-bottom: 0;
          font-size: 1.25rem;
        }
        .institution-image-wrapper {
          width: 60px;
          height: 60px;
          margin: 0 auto 10px;
          overflow: hidden;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .institution-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .institution-fallback-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 auto 10px;
          display: flex; 
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .institution-name-selected {
          color: #333;
          font-size: 1.1rem;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .institution-type-badge-selected {
          color: #FFFFFF;
          display: inline-block;
          padding: 3px 10px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: bold;
        }
        .info-section {
          margin-top: 1rem;
        }
        .info-section-title {
          color: #0032A0;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 5px;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }
        .institution-description {
          font-size: 14px;
          line-height: 1.5;
        }
        .institution-website-button {
          background-color: #0032A0;
          color: #FFFFFF;
          border-color: transparent;
          padding: 8px 15px;
          border-radius: 5px;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          text-decoration: none;
          font-size: 0.8rem;
          transition: background-color 0.2s ease;
        }
        .institution-website-button:hover {
          background-color: #002780;
        }
        .back-to-list-button {
          background-color: #f0f0f0;
          color: #333;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          font-weight: 500;
          font-size: 13px;
          transition: background-color 0.2s ease;
          margin-top: 15px;
        }
        .back-to-list-button:hover {
          background-color: #e0e0e0;
        }
        .side-menu-title-list {
          color: #0032A0;
          margin-bottom: 0;
          font-size: 1.2rem;
        }
        .institution-count-badge {
          background-color: #0032A0;
          color: white;
          font-size: 14px;
          padding: 5px 10px;
          border-radius: 10px;
          margin-right: 1.4rem; 
        }
        .institution-filter {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 8px;
        }
        .institution-filter label {
          font-size: 13px;
          font-weight: 500;
          color: #555;
          margin-bottom: 0.25rem;
        }
        .institution-filter select {
          width: 100%;
          padding: 6px 8px;
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 13px;
        }
        .institutions-list {
          margin-top: 1rem;
        }
        .institution-item {
          padding: 10px 12px;
          margin: 6px 0;
          background-color: white;
          border: 1px solid #eee;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }
        .institution-item:hover {
          background-color: #f8f9fa;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .institution-item-marker {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 10px;
          flex-shrink: 0;
        }
        .institution-item-info {
          flex: 1;
          min-width: 0; 
        }
        .institution-item-name {
          font-weight: 500;
          color: #333;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .institution-item-type {
          font-size: 11px;
          color: #666;
          margin-top: 2px;
        }
        .institution-item-chevron {
          color: #ccc;
          font-size: 10px;
          margin-left: 8px;
        }
        .no-institutions-found {
          padding: 20px;
          text-align: center;
          color: #666;
          background-color: #f8f9fa;
          border-radius: 8px;
          margin: 20px 0;
        }
        .no-institutions-icon {
          font-size: 40px;
          color: #ccc;
          margin-bottom: 10px;
        }
        .no-institutions-text-primary {
          margin: 0;
          font-weight: 500;
        }
        .no-institutions-text-secondary {
          font-size: 13px;
          margin: 5px 0 0;
        }

        .map-container {
          transition: width 0.3s ease;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 20px;
          margin-bottom: 30px;
          position: relative;
          overflow: hidden;
          height: 600px;
        }
        .title-box {
          position: absolute;
          top: 20px;
          left: 20px;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 100;
          min-width: 180px;
        }
        .title-box-heading {
          font-weight: 600;
          font-size: 1rem;
          color: #333;
          margin-bottom: 2px;
        }
        .title-box-subheading {
          font-size: 0.75rem;
          color: #666;
          margin: 0;
        }
        .map-legend {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 100;
          min-width: 180px;
          font-size: 0.8rem;
        }
        .legend-title {
          font-weight: 600;
          color: #444;
          margin-bottom: 10px;
          padding-bottom: 4px;
          border-bottom: 1px solid #eee;
          font-size: 0.9rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          margin: 6px 0;
        }
        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
          border: 1px solid rgba(0,0,0,0.1);
          flex-shrink: 0;
        }
        .legend-color.city-legend {
          background-color: #14b8a6;
        }
        .legend-label {
          font-size: 0.7rem;
          color: #555;
        }
        .turkey-svg {
          width: 100%;
          height: 100%;
          display: block;
          cursor: grab; 
        }
         .turkey-svg:active {
            cursor: grabbing;
        }
        .map-background {
          pointer-events: all; 
        }
        .city-path {
          transition: fill 0.15s ease-in-out, stroke-width 0.15s ease-in-out, transform 0.2s ease-out;
          cursor: pointer;
        }
        /* .city-path:hover is handled by pathStyles function */

        .city-center-count-circle {
            fill: #14b8a6;
            fill-opacity: 0.8;
            stroke: white;
            stroke-width: 2;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .city-center-count-circle:hover {
            fill-opacity: 1;
            r: 11;
        }
        .city-center-count-text {
            text-anchor: middle;
            fill: white;
            font-size: 10px;
            font-weight: bold;
            pointer-events: none; 
        }
        .zoom-instructions {
          position: absolute;
          bottom: 60px; 
          right: 12px;
          background-color: rgba(0, 0, 0, 0.6);
          color: white;
          font-size: 0.7rem;
          padding: 3px 8px;
          border-radius: 4px;
          pointer-events: none;
          z-index: 90;
          display: none; 
        }
        .info-title {
          position: absolute;
          top: 100px;
          left: 20px;
          background-color: rgba(255, 255, 255, 0.95);
          padding: 8px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          border-left: 4px solid #14b8a6;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 12px;
          color: #555;
          z-index: 50;
        }
        .info-title-cityname {
          margin: 0 0 3px;
          color: #14b8a6;
          font-size: 14px;
          font-weight: bold;
        }
        .info-title-instruction {
          font-size: 11px;
          margin: 2px 0;
        }
        
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @media (pointer: coarse) {
          .zoom-instructions {
            display: block !important;
          }
        }

        @media (min-width: 768px) {
          .side-menu {
            width: ${showSideMenu && zoomedCity ? '30%' : '0px'};
            margin-right: ${showSideMenu && zoomedCity ? '15px' : '0px'};
            padding: ${showSideMenu && zoomedCity ? '20px' : '0px'};
            opacity: ${showSideMenu && zoomedCity ? '1' : '0'};
            overflow: ${showSideMenu && zoomedCity ? 'auto' : 'hidden'};
            min-width: ${showSideMenu && zoomedCity ? '280px' : '0px'};
          }
        }

        @media (max-width: 767.98px) {
          .turkey-map-app-container.container {
            padding-left: 10px;
            padding-right: 10px;
          }
          .search-filter-container {
            flex-direction: column;
            gap: 10px;
            padding: 10px;
          }
          .category-filter {
            flex: 1 1 100%;
          }
          .category-filter label, .search-box label {
            font-size: 13px;
          }
          .category-filter select, .search-box input {
            font-size: 13px;
            padding: 7px 9px;
          }
          .reset-map-button {
            padding: 7px 14px;
            font-size: 0.85rem;
            width: 100%;
            margin-bottom: 10px;
          }
          .main-layout-wrapper {
            flex-direction: column;
          }
          .side-menu {
            width: 100% !important; 
            margin-right: 0 !important;
            margin-bottom: 15px;
            height: auto;
            max-height: 45vh; 
            min-width: unset !important;
            padding: 15px !important;
            opacity: 1 !important;
            overflow-y: auto !important;
          }
          .side-menu-title-selected, .side-menu-title-list {
            font-size: 1.1rem;
          }
          .institution-count-badge {
            font-size: 12px;
            padding: 4px 8px;
            margin-right: 0; /* Adjusted for smaller screens */
          }
          .institution-item-name { font-size: 13px; }
          .institution-item-type { font-size: 10px; }

          .map-container {
            width: 100% !important; 
            height: 50vh; 
            min-height: 350px; 
            padding: 10px;
          }
          .title-box {
            top: 10px;
            left: 10px;
            padding: 8px;
            min-width: auto; 
            max-width: calc(100% - 20px); 
          }
          .title-box-heading { font-size: 0.85rem; }
          .title-box-subheading { font-size: 0.65rem; }
          .map-legend {
            bottom: 10px;
            right: 10px;
            padding: 8px;
            min-width: auto; 
            max-width: calc(100% - 20px); 
            font-size: 0.7rem;
          }
          .legend-title { font-size: 0.75rem; margin-bottom: 6px; }
          .legend-color { width: 10px; height: 10px; margin-right: 6px;}
          .legend-label { font-size: 0.6rem; }
          .zoom-instructions {
            bottom: 10px; 
            right: 10px;
            font-size: 0.6rem;
            padding: 2px 6px;
          }
           .info-title {
            top: 10px; 
            left: 10px;
            padding: 6px;
            max-width: calc(100% - 20px);
          }
          .info-title-cityname { font-size: 12px; }
          .info-title-instruction { font-size: 10px; }
        }
         @media (max-width: 480px) {
            .side-menu {
              max-height: 50vh; 
            }
            .map-container {
                min-height: 300px; 
            }
            .title-box-heading { font-size: 0.75rem; }
            .title-box-subheading { font-size: 0.6rem; }
            .legend-title { font-size: 0.7rem; }
            .legend-label { font-size: 0.55rem; }
            .zoom-instructions {
                bottom: 5px;
                right: 5px;
            }
             .map-legend {
                max-width: 130px; 
             }
             .legend-item {
                 margin: 4px 0;
             }
             .institution-website-button {
                 font-size: 0.75rem;
                 padding: 6px 12px;
             }
             .back-to-list-button {
                 font-size: 12px;
                 padding: 7px 14px;
             }
         }
      `}</style>
    </div>
  );
};

export default TurkeyMap;