import React, { useCallback, useEffect, useState } from 'react';
import ReactMapGL, { FullscreenControl, Marker, Popup } from 'react-map-gl'
import LightMarker from "./LightMarker";
import axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the Mapbox CSS

type Viewport = {
    width: string;
    height: string;
    latitude: number;
    longitude: number;
    zoom: number;
  };
  

const MapboxMap = () => {


    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://api.sumselprov.info/api/v1/project");
            console.log(response.data.data)
            setProjects(response.data.data.Projects || []);
        } catch (err: any) {
            setError(err?.message || "Error fetching projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        console.log("handleViewportChange")
    }, []);

    const [viewport, setViewport] = useState<Viewport>({
        width: '100%',
        height: '700px',
        latitude: -2.990934,
        longitude: 104.756554,
        zoom: 12,
      });
    
      // Prevent infinite loop by only updating viewport when necessary
      const handleViewportChange = useCallback(
        (nextViewport) => {
          setViewport((prevViewport) => {
            if (prevViewport.latitude !== nextViewport.latitude || prevViewport.longitude !== nextViewport.longitude || prevViewport.zoom !== nextViewport.zoom) {
              return nextViewport;
            }
            return prevViewport;
          });
        },
        []
      );

    return (
        <div style={{ width: '100%', }}>
            <ReactMapGL
                mapboxApiAccessToken={'pk.eyJ1Ijoic2FuZ3Nha2F3aXJhIiwiYSI6ImNqdXBhajZmeTBudXg0NG50YjdhcDF2amUifQ.NmC56k1T54xEKGmlrFOxRA'}
                {...viewport}
                width={"100%"}
                onViewportChange={handleViewportChange}
                mapStyle="mapbox://styles/mapbox/navigation-night-v1"  // You can change th
            >
                {projects.map(data => {

                    return (
                        // <Marker longitude={parseFloat(data.longitude)} latitude={parseFloat(data.latitude)} color="red" />
                        <Marker
                            latitude={parseFloat(data.latitude)}
                            longitude={parseFloat(data.longitude)}
                            draggable={false}
                        // onDragEnd={handleMarkerDragEnd}
                        >
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                        </Marker>
                    )
                })}
            </ReactMapGL>
        </div>
    );
};

export default MapboxMap;